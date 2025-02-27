import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
  

function InstructorCourses() {
    const navigate = useNavigate();
    return ( 
        <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle className='text-lg font-bold'>
                    All Courses
                </CardTitle>
                <Button
                 onClick={() => navigate('/instructor/creat-new-course')}
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
    <TableRow>
      <TableCell className="font-medium">React Js full course</TableCell>
      <TableCell>100</TableCell>
      <TableCell>$3</TableCell>
      <TableCell className="text-right">
        <Button  variant="ghost" size="sm">
            <Edit className="h-6 w-6"/>
        </Button>
        <Button variant="ghost" size="sm" >
            <Delete className="h-6 w-6"/>
        </Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>


                </div>
            </CardContent>
        </Card>
        

    
);
}

export default InstructorCourses;