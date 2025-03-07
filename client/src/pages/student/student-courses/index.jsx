import { AuthContext } from "@/context/auth-context";
import { studentContext } from "@/context/student-context";
import { fetchStudentBoughtCoursesService } from "@/services";
import { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Watch } from "lucide-react";
import StudentViewCommonHeader from "@/components/student-view/header";
function StudentCoursesPage() {
const {auth}=useContext(AuthContext)

    const {studentBoughtCoursesList, setStudentBoughtCoursesList} =useContext(studentContext)
    const navigate = useNavigate();
    async function fetchStudentBoughtCourses() {
        const response = await fetchStudentBoughtCoursesService(auth?.user?._id)
        if (response?.success) {
            setStudentBoughtCoursesList(response?.data);
          }
    }
    
    useEffect(() => {
   fetchStudentBoughtCourses()
    }, [])
    return ( 
        <div className="p-4">
          <StudentViewCommonHeader/>
        <h1 className="text-3xl font-bold mb-8">My Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
            studentBoughtCoursesList.map((course,index) => (
              <Card key={course.id} className="flex flex-col">
                <CardContent className="p-4 flex-grow">
                  <img
                    src={course?.courseImage}
                    alt={course?.title}
                    className="h-52 w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="font-bold mb-1">{course?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {course?.instructorName}
                  </p>
                </CardContent>
                <CardFooter>
                <Link to={`/course-progress/${course?.courseId}`} className="w-full">
  <Button className="flex-1">
    <Watch className="mr-2 h-4 w-4" />
    Start Watching
  </Button>
</Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <h1 className="text-3xl font-bold">No Courses found</h1>
          )}
        </div>
      </div>
     );
}

export default StudentCoursesPage;