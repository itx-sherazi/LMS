import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function StripePaymentReturnPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    if (sessionId) {
      async function capturePayment() {
        const orderId = sessionStorage.getItem("currentOrderId"); // ✅ Retrieve orderId from sessionStorage

        if (!orderId) {
          alert("Order ID not found. Please contact support.");
          return;
        }

        try {
          const response = await captureAndFinalizePaymentService(sessionId, orderId);


          if (response?.success) {
            sessionStorage.removeItem("currentOrderId"); // ✅ Clear the order ID from sessionStorage

      
              navigate("/student-courses");
             
          } else {
            alert("Payment was successful, but order processing failed.");
          }
        } catch (error) {
          alert("Something went wrong while finalizing your order.");
        }
      }

      capturePayment();
    }
  }, [sessionId, navigate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment... Please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default StripePaymentReturnPage;
