import { Outlet, useLocation } from "react-router-dom";
import StudentViewCommonHeader from "./header";
import StudentHomePage from "@/pages/student/home";

function StudentViewCommonLayout () {
  const location = useLocation()
    return (
        <div>
          {
            !location.pathname.includes('course-progress')?<StudentViewCommonHeader/>:null
          }
        <Outlet/>

        </div>
      );
}

export default StudentViewCommonLayout ;