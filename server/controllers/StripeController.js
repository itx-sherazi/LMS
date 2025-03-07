
import stripe from "../helper/Stripe.js";
import Order from "../models/Order.js";
import StudentCourses from "../models/StudentCourseModal.js";
import Course from "../models/CourseModel.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const {
            userId,
            userName,
            userEmail,
            orderStatus,
            paymentMethod,
            paymentStatus,
            orderDate,
            paymentId,
            payerId,
            instructorId,
            instructorName,
            courseImage,
            courseTitle,
            courseId,
            coursePricing,
        } = req.body;

        // Validate required fields
        if (!userId || !courseId || !coursePricing || coursePricing <= 0) {
            return res.status(400).json({ success: false, message: "Invalid or missing required fields" });
        }

        // Create a new order in the database
        const newlyOrder = new Order({
            userId,
            userName,
            userEmail,
            orderStatus,
            paymentMethod,
            paymentStatus,
            orderDate,
            paymentId,
            payerId,
            instructorId,
            instructorName,
            courseImage,
            courseTitle,
            courseId,
            coursePricing,
        });

        await newlyOrder.save();

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: courseTitle,
                            images: [courseImage],
                        },
                        unit_amount: Math.round(coursePricing * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URI}/stripe-payment-return?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URI}/cancel`,
            customer_email: userEmail,
            metadata: {
                userId,
                courseId,
                instructorId,
                instructorName,
                userName,
                orderId: newlyOrder._id.toString(),
            },
        });

        res.status(200).json({
            success: true,
            data: {
                url: session.url,
                orderId: newlyOrder._id.toString(),
            },
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const finalizeOrder = async (req, res) => {
    try {
        const { sessionId } = req.body;

        // Log the request body for debugging

        // Validate sessionId
        if (!sessionId) {
            return res.status(400).json({ success: false, message: "Session ID is required" });
        }

        // Retrieve Stripe session
        const session = await stripe.checkout.sessions.retrieve(sessionId); // ✅ Use sessionId
        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }

        // Log session metadata for debugging

        // Validate session metadata
        if (!session.metadata.userId || !session.metadata.courseId || !session.metadata.orderId) {
            return res.status(400).json({ success: false, message: "Invalid session metadata" });
        }

        // Find or create order
        let order = await Order.findById(session.metadata.orderId);
        if (!order) {
            order = new Order({
                userId: session.metadata.userId,
                userName: session.metadata.userName,
                userEmail: session.customer_email,
                orderStatus: "confirmed",
                paymentMethod: "card",
                paymentStatus: "paid",
                orderDate: new Date(),
                instructorId: session.metadata.instructorId,
                instructorName: session.metadata.instructorName,
                courseImage: session.metadata.courseImage,
                courseTitle: session.metadata.courseTitle,
                courseId: session.metadata.courseId,
                coursePricing: session.amount_total / 100, // Convert cents to USD
                paymentId: session.payment_intent,
            });

            await order.save();
        }

        // Log order data for debugging

        // Update Student Course Model
        let studentCourses = await StudentCourses.findOne({ userId: order.userId });
        if (!studentCourses) {
            studentCourses = new StudentCourses({
                userId: order.userId,
                courses: [],
            });
        }

        studentCourses.courses.push({
            courseId: order.courseId,
            title: order.courseTitle,
            instructorId: order.instructorId,
            instructorName: order.instructorName,
            dateOfPurchase: order.orderDate,
            courseImage: order.courseImage,
        });

        await studentCourses.save();

        // Log student courses for debugging

        // Update Course Schema to Add Student
        await Course.findByIdAndUpdate(order.courseId, {
            $addToSet: {
                students: {
                    studentId: order.userId,
                    studentName: order.userName,
                    studentEmail: order.userEmail,
                    paidAmount: order.coursePricing,
                },
            },
        });

        res.status(200).json({ success: true, message: "Order confirmed", data: order });
    } catch (err) {
        console.error("Finalize Order Error:", err);
        res.status(500).json({ success: false, message: "Error occurred!" });
    }
};