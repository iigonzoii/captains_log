import { fetchCurrUserCourses } from "../../redux/courseReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import "./CQ.css"
// todo Get all current users courses
    //* useEffect or maybe that useApi to get current courses
// todo Update Course
    //*navigate to an update course form, or preferably set up a modal
// todo Delete Course
    //* same as update course

function CaptainsQuarters() {
    let userCourses = useSelector((state) => state.course);
    const dispatch = useDispatch();
    userCourses= Object.values(userCourses);

    useEffect(() => {
        dispatch(fetchCurrUserCourses());
    }, [dispatch]);
    console.log("USERCOURSES", userCourses)
    return(
        <>
        <div className="cm-container">
            {userCourses && userCourses.map((course, index) => (

                <div className='cq-card'
                    title={`${course.name}`}
                    // !might have to put forward slash on this
                    // onClick={() => navigate(`/courses/${course.id}`)}
                    key={index}>

                    
                </div>
            ))}
        </div>
        </>
    )
}

export default CaptainsQuarters
