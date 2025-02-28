
import MediaProgressbar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext } from "react";

function CourseCurriculum() {
    const { courseCurriculumFormData, setCourseCurriculumFormData,mediaUploadProgress, setMediaUploadProgress,mediaUploadProgressPercentage, setMediaUploadProgressPercentage} = useContext(InstructorContext);

console.log(courseCurriculumFormData)
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
        console.log("Updated state:", copyCourseCurriculumFormData);
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
                        videoUrl: response?.data?.secure_url,
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
    

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={handleNewLecture}>Add Lecture</Button>
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
                                        <Button>Replace Video</Button>
                                        <Button className="bg-red-900">Delete Lecture</Button>

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
