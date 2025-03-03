import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";

import { Delete, Edit } from "lucide-react";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
  

function InstructorCourses({listofCourses}) {
    const navigate = useNavigate();
    const { setCurrentEditedCourseId,setCourseLandingFormData, setCourseCurriculumFormData} = useContext(InstructorContext)
   
    return ( 
        <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle className='text-lg font-bold'>
                    All Courses
                </CardTitle>
                <Button
                 onClick={() => {
                  setCourseLandingFormData(courseLandingInitialFormData)
                   setCourseCurriculumFormData(courseCurriculumInitialFormData)
                   
                   setCurrentEditedCourseId(null)
                   navigate('/instructor/creat-new-course')
                 
                 }}
                 className ='p-6'>
                    Creat New Courses
                </Button>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Course</TableHead>
      <TableHead>Students</TableHead>
      <TableHead>Revenue</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      listofCourses && listofCourses.length > 0 ?
      listofCourses.map(course=>  
        <TableRow>
        <TableCell className="font-medium">{course?.title}</TableCell>
        <TableCell>{course?.students?.length}</TableCell>
        <TableCell>${course?.pricing}</TableCell>
        <TableCell className="text-right">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/instructor/edit-course/${course?._id}`)}>
    <Edit className="h-6 w-6"/>
</Button>

          <Button variant="ghost" size="sm" >
              <Delete className="h-6 w-6"/>
          </Button>
        </TableCell>
      </TableRow>

      ):null
    }

  </TableBody>
</Table>


                </div>
            </CardContent>
        </Card>
        

    
);
}

export default InstructorCourses;