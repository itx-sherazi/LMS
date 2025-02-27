
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

function App() {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    console.log("Auth Updated:", auth);
  }, [auth]);

  return (
    <Routes>
      <Route path="/auth" element={<RouteGuard element={<AuthPage />} authenticated={auth?.authenticate} user={auth?.user} />} />
      <Route path="/instructor" element={<RouteGuard element={<InstructorDashboardPage />} authenticated={auth?.authenticate} user={auth?.user} />} />
      <Route path="/instructor/creat-new-course" element={<RouteGuard element={<AddNewCoursePage/>} authenticated={auth?.authenticate} user={auth?.user} />} />
      <Route path="/" element={<RouteGuard element={<StudentViewCommonLayout />} authenticated={auth?.authenticate} user={auth?.user} />} />
      <Route path="/home" element={<StudentHomePage />} />
      <Route path="*" element={<NotFounPage/>} />
    </Routes>
  );
}

export default App;
