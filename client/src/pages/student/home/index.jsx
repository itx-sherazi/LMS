

import { useContext, useEffect } from "react";
import { studentContext } from "@/context/student-context";
import { checkCoursePurchaseInfoService, fetchStudentViewCourseListService } from "@/services";

import { Book, User, Eye } from "lucide-react";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { FaFlask, FaLaptopCode, FaUserTie, FaLeaf, FaGem, FaUsers, FaSync, FaDesktop } from "react-icons/fa"; // Import icons
import HeroSection from "@/components/student-view/HeroSection";
function StudentHomePage() {
    const { studentViewCoursesList, setStudentViewCoursesList } = useContext(studentContext);
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()

    
    async function handleCourseNavigate(getCurrentCourseId) {
        const response = await checkCoursePurchaseInfoService(getCurrentCourseId, auth?.user?._id);
    
        if (response?.success) { // ✅ Fix the typo here
            if (response?.data) {
                // If the course is purchased, navigate to the course progress page
                navigate(`/course-progress/${getCurrentCourseId}`);
            } else {
                // If the course is not purchased, navigate to the course details page
                navigate(`/course/details/${getCurrentCourseId}`);
            }
        } else {
            console.error("Failed to check course purchase info:", response);
        }
    }
    async function fetchAllStudentViewCourse() {
        const response = await fetchStudentViewCourseListService();
        if (response?.success) {
            setStudentViewCoursesList(response?.data);
        } else {
            console.error("Failed to fetch courses:", response.error);
        }
    }
    useEffect(() => {
        fetchAllStudentViewCourse();
    }, []);

    const teachers = [
        {
            name: 'PRITI H.',
            image: 'https://media.istockphoto.com/id/1358852926/photo/math-teacher-in-the-classroom.jpg?s=612x612&w=0&k=20&c=urswdbx3Z0zt-X7_qMj6Uj5i_V1YXPpT282ISr2W_74=', // Replace with your image paths
        },
        {
            name: 'EDGER D.',
            image: 'https://watermark.lovepik.com/photo/20211125/large/lovepik-male-teachers-class-image-picture_501025205.jpg',
        },
        {
            name: 'JOSEPH C.',
            image: 'https://img.freepik.com/free-photo/front-view-man-classroom_23-2150444919.jpg',
        },
        {
            name: 'FRANCY J.',
            image: 'https://t3.ftcdn.net/jpg/02/65/18/30/360_F_265183061_NkulfPZgRxbNg3rvYSNGGwi0iD7qbmOp.jpg',
        },
    ];

    const cards = [
        {
            icon: Book,
            title: "Online Courses",
            text: "Our online courses are meant to take based on subjects, duration, and life stages. We have online courses with certification.",
            color: "text-orange-500 border-orange-500 bg-orange-500",
        },
        {
            icon: User,
            title: "Who We Are",
            text: "We are the creators of our future. We provide the best way for everyone to create their future themselves.",
            color: "text-orange-500 border-orange-500 bg-orange-500",
        },
        {
            icon: Eye,
            title: "Our Vision",
            text: "Our vision is very clear to fulfill the need for education and provide a way for everyone to be educated.",
            color: "text-orange-500 border-orange-500 bg-orange-500",
        },
    ];
    // async function handleCourseNavigate(getCurrentCourseId) {
    //     const response = await checkCoursePurchaseInfoService(getCurrentCourseId, auth?.user?._id);

    //     if (response?.success) { // ✅ Fix the typo here
    //         if (response?.data) {
    //             // If the course is purchased, navigate to the course progress page
    //             navigate(`/course-progress/${getCurrentCourseId}`);
    //         } else {
    //             // If the course is not purchased, navigate to the course details page
    //             navigate(`/course/details/${getCurrentCourseId}`);
    //         }
    //     } else {
    //         console.error("Failed to check course purchase info:", response);
    //     }
    // }

    function handelNavigateToCoursesPage(getCurrentId) {
        sessionStorage.removeItem('filters')
        const currentFilter = {
            category: [getCurrentId]
        }
        sessionStorage.setItem('filters', JSON.stringify(currentFilter))
        navigate(`/courses`)
    }

    useEffect(() => {
        fetchAllStudentViewCourse();
    }, []);
    const courses = [
        { name: "Biomolecular Engineering", icon: <FaFlask /> },
        { name: "Web Design", icon: <FaLaptopCode /> },
        { name: "School of Management", icon: <FaUserTie /> },
        { name: "Plant Biology", icon: <FaLeaf /> },
        { name: "Mineral Resources", icon: <FaGem /> },
        { name: "Political Science", icon: <FaUsers /> },
        { name: "Civil Engineering", icon: <FaSync /> },
        { name: "Computer Engineering", icon: <FaDesktop /> },
    ];

    return (
        <div className="min-h-screen bg-white">


<HeroSection />
            {/* Course Categories */}
            {/* <section className="py-8 px-4 lg:px-8 bg-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">Course Categories</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {courseCategories.map((categoryItem) => (
                        <Button className="justify-start" variant="outline" onClick={()=>handelNavigateToCoursesPage(categoryItem.id)}key={categoryItem.id}>
                            {categoryItem.label}
                        </Button>
                    ))}
                </div>
            </section> */}

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3">
                        <div
                            className={`w-16 h-16 mx-auto flex items-center justify-center rounded-xl border-2 ${card.color} border-opacity-50`}
                        >
                            <div className="w-14 h-14 bg-white  border-orange-500 clip-hexagon flex items-center justify-center">

                                <card.icon className={`w-10 h-10 text-orange-500`} />
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold text-center mt-4">{card.title}</h2>
                        <p className="text-gray-600 text-center mt-2">{card.text}</p>
                        <div className="flex justify-center mt-4">
                            <button className={`px-4 py-2 text-white rounded-xl ${card.color} bg-opacity-90 hover:bg-opacity-100`}>
                                Read More
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {/* Featured Courses */}
            <section className="py-12 px-4 lg:px-8 bg-white">
                <h2 className="text-4xl font-bold mb-12 text-center flex justify-center lg:text-left">Featured Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
                        studentViewCoursesList.map((courseItem) => (
                            <div
                                key={courseItem._id}
                                onClick={() => handleCourseNavigate(courseItem._id)}
                                className="border h-[400px] w-full rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white"
                            >
                                {/* Course Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={courseItem.image}
                                        alt={courseItem.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Orange Overlay for Hover Effect */}
                                    <div className="absolute inset-0 bg-orange-500 bg-opacity-0 transition-all duration-300 hover:bg-opacity-20"></div>

                                    {/* "New" Badge */}
                                    {courseItem.isNew && (
                                        <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
                                            New
                                        </div>
                                    )}

                                    {/* "View Course" Button (Appears on Hover) */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <button       onClick={() => handleCourseNavigate(courseItem?._id)} className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
                                            View Course
                                        </button>
                                    </div>
                                </div>

                                {/* Course Details */}
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-2 flex justify-center text-center text-gray-800">{courseItem.title}</h3>
                                    <p className="text-sm text-gray-600 mb-1 ">
                                        <strong>Created By:</strong> {courseItem.instructorName}
                                    </p>


                                    {/* Rating Badge */}
                                    <div className="flex items-center mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`${i < parseInt(courseItem.rating) ? "text-yellow-400" : "text-gray-300"
                                                    } text-sm`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                        <span className="text-sm text-gray-600 ml-2">({courseItem.rating})</span>
                                    </div>

                                    {/* Price */}
                                    <p className="text-lg font-bold text-orange-600">${courseItem.pricing}</p>
                                </div>

                                {/* Orange Border Bottom */}
                                <div className="border-t-4 border-orange-500"></div>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-center text-xl font-semibold w-full col-span-full">No Courses Found</h1>
                    )}
                </div>
            </section>







            <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        QUALIFIED TEACHERS
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        WE HAVE HIGHLY QUALIFIED TEACHERS
                    </p>
                </div>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {teachers.map((teacher, index) => (
                        <div key={index} className="group relative rounded-lg overflow-hidden">
                            <div className="relative w-full h-[400px]">
                                <img
                                    src={teacher.image}
                                    alt={teacher.name}
                                    className="w-full h-full object-cover object-center transition-all duration-300 group-hover:opacity-75"
                                />
                                <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 flex flex-col items-center  justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-lg font-medium text-white mb-4">
                                        {teacher.name}
                                    </h3>
                                    <div className="flex space-x-9 mt-[300px]">
                                        <a href="#" className="text-white text-2xl hover:text-gray-300">
                                            <i className="fab fa-facebook"></i>
                                        </a>
                                        <a href="#" className="text-white text-2xl hover:text-gray-300">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href="#" className="text-white text-2xl hover:text-gray-300">
                                            <i className="fab fa-google"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center p-6">
                <h2 className="text-3xl font-bold">OUR COURSES</h2>
                <p className="text-gray-600">CHOOSE YOUR DESIRED COURSE</p>
                <div className="w-16 border-b-4 border-gray-800 my-2"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-4"
                        >
                            <div className="relative w-24 h-24">
                                {/* Hexagon Shape */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <polygon
                                            points="50 0, 95 25, 95 75, 50 100, 5 75, 5 25"
                                            className="stroke-gray-600 hover:stroke-orange-500 fill-white stroke-2"
                                        />
                                    </svg>
                                </div>

                                {/* Icon Container (centered) */}
                                <div className="absolute top-1/2 left-1/2 transform text-4xl text-orange-500 -translate-x-1/2 -translate-y-1/2">
                                    {course.icon}
                                </div>
                            </div>
                            <p className="mt-2 text-lg font-medium">{course.name}</p>
                        </div>
                    ))}
                </div>
            </div>



        </div>
    );
}

export default StudentHomePage;