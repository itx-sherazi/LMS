
import MediaProgressbar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { InstructorContext } from "@/context/instructor-context";
import { mediaBulkUploadService, mediaDeleteService, mediaUploadService } from "@/services";
import { Upload } from "lucide-react";
import { useContext, useEffect, useRef } from "react";

function CourseCurriculum() {
    const { courseCurriculumFormData, setCourseCurriculumFormData,mediaUploadProgress, setMediaUploadProgress,mediaUploadProgressPercentage, setMediaUploadProgressPercentage} = useContext(InstructorContext);

const bulkUploadInputRef = useRef(null)
    const handleNewLecture = () => {
        const newLecture = {
            title: '',
            videoUrl: '',
            freePreview: false,
            public_id: ''
        };

        setCourseCurriculumFormData([...courseCurriculumFormData, newLecture]);
    };


    const handleCourseTitleChange = (event, currentIndex) => {
        let copyCourseCurriculumFormData = [...courseCurriculumFormData];
        
        copyCourseCurriculumFormData[currentIndex] = {
            ...copyCourseCurriculumFormData[currentIndex],
            title: event.target.value
        };

        setCourseCurriculumFormData(copyCourseCurriculumFormData);
    };
    
    const handleFreePreviewChange = (currentValue, currentIndex) => {
        let copyCourseCurriculumFormData = [...courseCurriculumFormData];
        
        copyCourseCurriculumFormData[currentIndex] = {
            ...copyCourseCurriculumFormData[currentIndex],
            freePreview: currentValue
        };

        setCourseCurriculumFormData(copyCourseCurriculumFormData);
    }
   

    
    const handleSingleLectureUpload = async (event, currentIndex) => {
        const selectedFile = event.target.files[0];
    
        if (selectedFile) {
    
            const videoFormData = new FormData();
            videoFormData.append("file", selectedFile);
    
            try {
                setMediaUploadProgress(true);
                
                const response = await mediaUploadService(videoFormData,setMediaUploadProgressPercentage);
    
                if(response.success){
                    let copyCourseCurriculumFormData=[...courseCurriculumFormData]
                    copyCourseCurriculumFormData[currentIndex] = {
                       ...copyCourseCurriculumFormData[currentIndex],
                        videoUrl: response?.data?.url,
                        public_id: response?.data?.public_id
                    };
                    setCourseCurriculumFormData(copyCourseCurriculumFormData);
                    setMediaUploadProgress(false);

                }
    
               
            } catch (error) {
                console.error("❌ Error in uploading file:", error);
            } finally {
                setMediaUploadProgress(false);
            }
        }
    };
    function isCourseCurriculumFormDataValid(){
        return courseCurriculumFormData.every(item => {
            return item.title && typeof item === 'object' &&
            item.title.trim() !== '' && 
          item.videoUrl.trim() !== '' 
        });
    }

    async function handelReplaceVideo(currentIndex){
       let copyCourseCurriculumFormData = [...courseCurriculumFormData]
       const getCurrentVideopublicId = copyCourseCurriculumFormData[currentIndex].public_id

       const deleteCurrentMediaResponse= await mediaDeleteService(getCurrentVideopublicId)
       if(deleteCurrentMediaResponse?.success){
        copyCourseCurriculumFormData[currentIndex] = {
           ...copyCourseCurriculumFormData[currentIndex],
            videoUrl: '',
            public_id: ''
        }
        setCourseCurriculumFormData(copyCourseCurriculumFormData) 

       }
    }
    function handleOpenBulkUploadDialog (){
        bulkUploadInputRef.current.click();
    }
    function areAllCourseCurriculumFormDataObjectEmpty(arr) {
        return arr.every(obj => {
            return Object.entries(obj).every(([key, value]) => {
                if (typeof value === 'boolean') {
                    return true;
                }
                return value === '';
            });
        });
    }
    

     async function handleMediaBulkUpload (event){
        const selectedFiles = Array.from(event.target.files)
        const bulkFormData = new FormData();
        selectedFiles.forEach(fileItem => bulkFormData.append('files', fileItem))
try {
    setMediaUploadProgress(true);
    
    const response = await mediaBulkUploadService(bulkFormData,setMediaUploadProgressPercentage);
    if(response?.success){
        let copyCourseCurriculumFormData= areAllCourseCurriculumFormDataObjectEmpty(courseCurriculumFormData)
        ? [] : [...courseCurriculumFormData]
        copyCourseCurriculumFormData =[
            ...copyCourseCurriculumFormData,
            ...response?.data.map((item,index)=>({
                videoUrl : item?.url,
                public_id : item.public_id,
                title:` Lecture ${copyCourseCurriculumFormData.length + (index+1)}`,
                freePreview: false
            }))
        ]
        setCourseCurriculumFormData(copyCourseCurriculumFormData);
        setMediaUploadProgress(false);
    }
    
} catch (error) {
    console.error("�� Error in uploading file:", error);
    setMediaUploadProgress(false);
    
}

     }
  async function handleDeleteLecture(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentSelectedVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const response = await mediaDeleteService(getCurrentSelectedVideoPublicId);

    if (response?.success) {
      cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter(
        (_, index) => index !== currentIndex
      );

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }

    


    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>Create Course Curriculum</CardTitle>
                <div>
                    <Input
                    type="file"
                    ref={bulkUploadInputRef}
                    accept="video/*"
                    multiple
                    className="hidden"
                    id="bulk-media-upload"
                    onChange={handleMediaBulkUpload}

                    />
                    <Button
                    as="label"
                    htmlFor="bulk-media-upload"
                    className="cursor-pointer"
                    variant="outline"
                    onClick={handleOpenBulkUploadDialog}
                    >
                        <Upload className="w-4 h-4 mr-2"/>
                        Bulk Upload
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Button disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress} onClick={handleNewLecture}>Add Lecture</Button>
                {
                    mediaUploadProgress ?
                    <MediaProgressbar
                    progress={mediaUploadProgressPercentage}
                    isMediaUploading={mediaUploadProgress}
                    
                    />:null
                }
                <div className="mt-4 space-y-4">
                    {courseCurriculumFormData.map((curriculumItem, index) => (
                        <div key={index} className="border p-5 rounded-md">
                            <div className="flex gap-5 items-center">
                                <h3 className="font-semibold">Lecture {index + 1}</h3>

                                <Input
                                    name={`title-${index + 1}`}
                                    placeholder="Enter lecture title"
                                    className="max-w-96"
                                    onChange={(event) => handleCourseTitleChange(event, index)}
                                    value={courseCurriculumFormData[index]?.title}
                                />
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        onCheckedChange={(value)=>handleFreePreviewChange(value, index)}
                                        cheked={courseCurriculumFormData[index]?.freePreview}
                                        id={`freePreview-${index +1}`}
                                    />
                                    <Label htmlFor={`freePreview-${index + 1}`}> Free Preview</Label>
                                </div>
                            </div>
                            <div className="mt-6">
                                {
                                    courseCurriculumFormData[index]?.videoUrl ?
                                    <div className="flex gap-3">
                                        <VideoPlayer url={courseCurriculumFormData[index]?.videoUrl}
                                        width="450px"
                                        height="200px"
                                        />
                                        <Button onClick={()=>handelReplaceVideo(index)}>Replace Video</Button>
                                        <Button  onClick={()=>handleDeleteLecture(index)}className="bg-red-900">Delete Lecture</Button>

                                    </div>:
                                <Input type="file" accept="video/*" onChange={(event)=> handleSingleLectureUpload(event,index)} className="mb-4" />

                                }
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default CourseCurriculum;
