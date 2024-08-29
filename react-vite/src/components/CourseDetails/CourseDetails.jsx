import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCourse } from "../../redux/courseReducer"
import "./CD.css"
// todo fetch course
    //* use params to grab id and effect with thunk
// todo fetch experiences
    //* make experiences model
    //* make experiences seeders
    //* update course model to have poi as a string or text area
// todo integrate modal for experiences
    //* import use modal button or make a seperate page like i did with the forms
// todo apply desktop view with grid template areas
    //* decide on row heights, gaps, for cols and rows
    //* decide on either setting route highlight image as background or banner


function CourseDetails(){
    const dispatch = useDispatch()
    const {courseId} = useParams
    const course = useSelector((state) => state.course.courseDetail)
    // const user = useSelector((state) => state.session.user)
    console.log("COURSEBYID",course)
    useEffect(()=>{
//! will probably need to watch experience to rerender after someone messes with it
dispatch(fetchCourse(courseId))
//! also will probably need to watch courseId if its buggy
    },[dispatch, courseId])
    return (
        <div className="cd-container">
        <div>Route Name</div>
        <div>Log Entry</div>
        <div>Experiences</div>
        <div>points of interest</div>
        <div>images of trip</div>
        </div>
    )
}

export default CourseDetails
