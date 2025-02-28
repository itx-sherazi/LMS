import MediaProgressbar from "@/components/media-progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext } from "react";


function CourseSetting() {
      const {courseLandingFormData, setCourseLandingFormData,mediaUploadProgress, setMediaUploadProgress,mediaUploadProgressPercentage, setMediaUploadProgressPercentage}=useContext(InstructorContext)
console.log(courseLandingFormData)
      async function handleImageUploadChange(event){
const selectedImage = event.target.files[0]
if(selectedImage){
  const imageFormData = new FormData()
  imageFormData.append('file', selectedImage)
  try {
    setMediaUploadProgress(true);
    const response = await mediaUploadService(imageFormData,setMediaUploadProgressPercentage)
    if(response.success){
    setCourseLandingFormData({
      ...courseLandingFormData,
      image: response.data.secure_url,
    })
    setMediaUploadProgress(false)
    }

    
  } catch (error) {
    console.error("Error in Image Upload:", error);
    
    
  }
}
      }
    return (  
        <Card>
          <CardHeader>
            <CardTitle>Course Setting</CardTitle>
          </CardHeader>
         <div className="p-4">
         {
                    mediaUploadProgress ?
                    <MediaProgressbar
                    progress={mediaUploadProgressPercentage}
                    isMediaUploading={mediaUploadProgress}
                    
                    />:null
                }
         </div>
          <CardContent>
            {
              courseLandingFormData?.image ?
              <img src={courseLandingFormData?.image} alt="Course Image" className="w-full h-48 object-cover"/>
              :
              <div className="flex flex-col gap-3">
              <Label>Upload Course Image</Label>
              <Input
              type="file"
              accept="image/*"
              onChange={handleImageUploadChange}
              
              />
            </div>
            }
             
        
          </CardContent>
        </Card>
    );
}

export default CourseSetting;