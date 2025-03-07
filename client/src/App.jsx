
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/auth';
import RouteGuard from './components/route-guard';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/auth-context';
import InstructorDashboardPage from './pages/instructor';
import StudentViewCommonLayout from './components/student-view/common-layout';
import StudentHomePage from './pages/student/home';
import NotFounPage from './pages/not-found';
import AddNewCoursePage from './pages/instructor/AddNewCourse';
import StudentViewCoursesPage from './pages/student/courses';
import StudentViewCourseDetailPage from './pages/student/course-details';
import StripePaymentReturnPage from './pages/student/home/payment-return';
import StudentCoursesPage from './pages/student/student-courses';
import StudentViewCourseProgressPage from './pages/student/course-progress';
import 'remixicon/fonts/remixicon.css'
import Footer from './components/Footer';
import StudentViewCommonHeader from './components/student-view/header';
function App() {
  const { auth } = useContext(AuthContext);

 

  return (
    <div>
      <StudentViewCommonHeader/>
       <Routes>
      <Route path="/auth" element={<RouteGuard element={<AuthPage />} authenticated={auth?.authenticate} user={auth?.user} />} />
      <Route path="/instructor" element={<RouteGuard element={<InstructorDashboardPage />} authenticated={auth?.authenticate} user={auth?.user} />} />
      <Route path="/instructor/creat-new-course" element={<RouteGuard element={<AddNewCoursePage/>} authenticated={auth?.authenticate} user={auth?.user} />} />
      <Route path="/instructor/edit-course/:courseId" element={<RouteGuard element={<AddNewCoursePage/>} authenticated={auth?.authenticate} user={auth?.user} />} />
      <Route path="/" element={<RouteGuard element={<StudentViewCommonLayout />} authenticated={auth?.authenticate} user={auth?.user} />} > </Route>
      <Route path="" element={<StudentHomePage />} />
      <Route path="home" element={<StudentHomePage />} />
      <Route path="courses" element={<StudentViewCoursesPage />} />
      <Route path="course/details/:id" element={<StudentViewCourseDetailPage />} />
      
       <Route path="course-progress/:id" element={<StudentViewCourseProgressPage />} />
       
      <Route path="student-courses" element={<StudentCoursesPage/>} />
       <Route path="stripe-payment-return" element={<StripePaymentReturnPage />} />

       

   
      <Route path="*" element={<NotFounPage/>} />
    </Routes>
    <Footer/>
    </div>
   
  );
}

export default App;
