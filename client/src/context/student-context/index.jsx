import { createContext, useState } from "react";



export const studentContext = createContext(null)

export default function StudentProvider({children}){
    const [studentViewCoursesList, setStudentViewCoursesList] =useState([])
    const [loadingState, setLoadingState] = useState(true)
    const [studentViewCourseDetails, setStudentViewCourseDetails] = useState(null)
    const [currentCourseDetailId, setCurrentCourseDetailId] = useState(null)
    const [studentBoughtCoursesList, setStudentBoughtCoursesList] = useState([])
    const [studentCurrentCourseProgress, setStudentCurrentCourseProgress] = useState({})
    return <studentContext.Provider
    value={{
        studentViewCoursesList, setStudentViewCoursesList,
        loadingState, setLoadingState,
        studentViewCourseDetails, setStudentViewCourseDetails,
        currentCourseDetailId, setCurrentCourseDetailId,
        studentBoughtCoursesList, setStudentBoughtCoursesList,
        studentCurrentCourseProgress, setStudentCurrentCourseProgress
    }}
    >
        {children}
    </studentContext.Provider>
}