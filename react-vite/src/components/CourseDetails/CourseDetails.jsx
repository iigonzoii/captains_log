import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCourse } from "../../redux/courseReducer"
import "./CD.css"
///// todo fetch course
///// * use params to grab id and effect with thunk

// todo fetch experiences
//* make experiences model
//* make experiences seeders
//* update course model to have poi as a string or text area
// todo integrate modal for experiences
//* import use modal button or make a seperate page like i did with the forms
// todo apply desktop view with grid template areas
//* decide on row heights, gaps, for cols and rows
//* decide on either setting route highlight image as background or banner


function CourseDetails() {
    const dispatch = useDispatch()
    const { course_id } = useParams()
    console.log("ID",course_id)
    const course = useSelector((state) => state.course.courseDetail)
    console.log("COURSEBYID", course)
    // const user = useSelector((state) => state.session.user)
    useEffect(() => {
        //! will probably need to watch experience to rerender after someone messes with it
        dispatch(fetchCourse(course_id))
        //! also will probably need to watch courseId if its buggy
    }, [dispatch, course_id])
    return (
        <div className="cd-container">
            <div>{course.name}</div>
            <textarea>{course.log_entry}</textarea>
            <textarea>Thoughts</textarea>
            <textarea>points of interest</textarea>
            {/* below images div will be an array at some point being mapped over */}
            <div className="cd-img-container">
                <img className="cd-img" src={course.img_1} alt="image of trip"/>
                <img className="cd-img" src={course.img_2} alt="image of trip"/>
                <img className="cd-img" src={course.img_3} alt="image of trip"/>
                <img className="cd-img" src={course.img_4} alt="image of trip"/>
                {/* {course && course.map((course, index) =>
                // <img src={course.img} />
                )} */}
            </div>
        </div>
    )
}

export default CourseDetails
