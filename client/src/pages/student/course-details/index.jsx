import { Button } from "@/components/ui/button";
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { studentContext } from "@/context/student-context";
import {  createPaymentService, fetchInstructorCourseDetailsService } from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,

  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { AuthContext } from "@/context/auth-context";
function StudentViewCourseDetailPage() {


    const {studentViewCourseDetails, setStudentViewCourseDetails,currentCourseDetailId,setCurrentCourseDetailId,loadingState, setLoadingState,} = useContext(studentContext)
const [showFreePreviewDialog,setShowFreePreviewDialog] = useState(false)

const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =useState(null);
const {auth} = useContext(AuthContext)

    const {id} = useParams()
    const location = useLocation()
    const [loading, setLoading] = useState(false);
         
    const handleCheckout = async () => {
      const paymentPayload = {
          userId: auth?.user?._id, // ✅ Ensure userId is included
          userName: auth?.user?.username,
          userEmail: auth?.user?.useremail,
          orderStatus: "pending",
          paymentMethod: "stripe",
          paymentStatus: "initiated",
          orderDate: new Date(),
          paymentId: "",
          payerId: "",
          instructorId: studentViewCourseDetails?.instructorId,
          instructorName: studentViewCourseDetails?.instructorName,
          courseImage: studentViewCourseDetails?.image,
          courseTitle: studentViewCourseDetails?.title,
          courseId: studentViewCourseDetails?._id,
          coursePricing: studentViewCourseDetails?.pricing,
      };
  
  
      try {
          const response = await createPaymentService(paymentPayload);
  
          if (response?.success && response?.data?.url) {
              // ✅ Save the order ID to sessionStorage
              sessionStorage.setItem("currentOrderId", response.data.orderId);  
  
              // ✅ Redirect user to Stripe Checkout page
              window.location.href = response.data.url;
          } else {
              console.error("Payment creation failed:", response);
          }
      } catch (error) {
          console.error("Error creating payment:", error);
      }
  };
  

    async function  fetchStudentViewCourseDetail(){
        const response = await  fetchInstructorCourseDetailsService(currentCourseDetailId)
        if(response?.success){
            setStudentViewCourseDetails(response?.data)
            setLoadingState(false)
        }else{
            setLoadingState(false) 
        }
    }
     function handleSetFreePreview (getCurrentVideoInfo){

        setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl )
     }
   
     useEffect(()=>{
        if(displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true)
     },[displayCurrentVideoFreePreview])

    useEffect(()=>{
        if(currentCourseDetailId !== null) fetchStudentViewCourseDetail()

    },[currentCourseDetailId])
    useEffect(()=>{
        if(!location.pathname.includes('course/details'))(
            setStudentViewCourseDetails(null),
            setCurrentCourseDetailId(null)
        )

        
    },[location.pathname])

    useEffect(()=>{
        if(id) setCurrentCourseDetailId(id) 

    },[id])
     if(loadingState) return <Skeleton/>
     const getIndexFreePreviewUrl = studentViewCourseDetails !== null 
     ? studentViewCourseDetails?.curriculum?.findIndex(item=>item.freePreview)
     : -1
    return ( 
<div className=" mx-auto p-4">
    <div className="bg-gray-900 text-white p-8 rounded-t-lg">
<h1 className="text-3xl font-bold mb-4">{studentViewCourseDetails?.title}</h1>
<p className="text-xl  mb-4">{studentViewCourseDetails?.subtitle}</p>
<div className="flex irems-center space-x-4 mt-2 text-sm">
    <span>Created by {studentViewCourseDetails?.instructorName} </span>
    <span>Created by {studentViewCourseDetails?.date.split("T")[0] } </span>
    <span className="flex items-center">
        <Globe className="w-4 h-4 mr-1"/>
        {studentViewCourseDetails?.primaryLanguage}
         </span>
         <span>
            {studentViewCourseDetails?.students.length}{" "}
            {studentViewCourseDetails?.students.length <=1 ? 'student':'students'}
         </span>
</div>
    </div>
<div className="flex flex-col md:flex-row gap-8 mt-8">
    <main className="flex-grow">
        <Card className="mb-8">
<CardHeader>
    <CardTitle>
        What You'll learn
    </CardTitle>
</CardHeader>
<CardContent>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {
            studentViewCourseDetails?.objectives.split(',').map((objective,index)=>
        <li key={index} className="flex items-start"><CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0"/>
        <span>{objective}</span>
        
        </li>
    
    )
        }
    </ul>
</CardContent>
        </Card>
        <Card className="mb-8">
<CardHeader>
    <CardTitle>
        Course Description
    </CardTitle>
</CardHeader>
<CardContent>
<p className="text-xl">{studentViewCourseDetails?.description}</p>

</CardContent>
        </Card>
        <Card className="mb-8">
        <CardHeader>
    <CardTitle>
        Course Curriculum 
    </CardTitle>
</CardHeader>
<CardContent>
{
    studentViewCourseDetails?.curriculum?.map((curriculumItem,index)=>
 <li className={`${curriculumItem?.freePreview ? 'cursor-pointer' : 'cursor-not-allowed'} flex items-center mb-4`}
 onClick={ curriculumItem?.freePreview ?()=>handleSetFreePreview(curriculumItem):null}
 >
    {
        curriculumItem?.freePreview ? <PlayCircle className="mr-2 h-4 w-4"/> :<Lock className="mr-2 h-4 w-4"/>
    }
    <span>{curriculumItem?.title}</span>
 </li>
    )
}
</CardContent>
        </Card>
    </main>
    <aside className="w-full md:w-[500px]">
        <Card classNames="sticky top-4">
            <CardContent className="p-6">
                <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                    <VideoPlayer
                    url={
                        getIndexFreePreviewUrl !== -1 
                       ? studentViewCourseDetails?.curriculum[getIndexFreePreviewUrl].videoUrl : ""
                    }
                    width="450px"
                    height="200px"
                    />

                </div>
                <div className="mb-4">
                    <span className="text-3xl font-bold ">${studentViewCourseDetails?.pricing}</span>
                </div>
                <Button onClick={handleCheckout} disabled={loading}>{loading ? "Processing..." : "Buy Now"}</Button>

            </CardContent>

        </Card>

    </aside>

</div>

<Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Course Preview</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg flex items-center justify-center">
            <VideoPlayer
              url={displayCurrentVideoFreePreview}
              width="450px"
              height="200px"
            />
          </div>
          <div className="flex flex-col gap-2">
            {studentViewCourseDetails?.curriculum
              ?.filter((item) => item.freePreview)
              .map((filteredItem) => (
                <p
                  onClick={() => handleSetFreePreview(filteredItem)}
                  className="cursor-pointer text-[16px] font-medium"
                >
                  {filteredItem?.title}
                </p>
              ))}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
 

</div>
        
     );
}

export default StudentViewCourseDetailPage; 