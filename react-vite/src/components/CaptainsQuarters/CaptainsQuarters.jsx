import { fetchCurrUserCourses } from "../../redux/courseReducer";
import { useEffect,} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// useNavigate useState
import DeleteCourse from "../DeleteCourse/DeleteCourse";
import OpenModalButton from "../OpenModalButton"

import "./CQ.css"
// todo Get all current users courses
//* useEffect or maybe that useApi to get current courses
// todo Update Course
//*navigate to an update course form, or preferably set up a modal
// todo Delete Course
//* same as update course

function CaptainsQuarters() {
    let userCourses = useSelector((state) => state.course);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    userCourses = Object.values(userCourses);

    useEffect(() => {
        dispatch(fetchCurrUserCourses())
    }, [dispatch]);
    console.log("USERCOURSES", userCourses)
    if (!user) {
        return <p>Log In to enter Captains Quarters</p>;
    }
    return (
        <>
                <div className="cm-container">
                    {userCourses && userCourses.map((course, index) => (

                        <div className='cq-card'
                            title={`${course.name}`}
                            // !might have to put forward slash on this
                            // onClick={() => navigate(`/courses/${course.id}`)}
                            key={index}>
                            <p>courseId - {course.id}</p>
                            <p>ownerId - {course.owner_id}</p>
                            <span>
                                <Link to={`/courses/${course.id}/update`}><button className="update-button">Update</button></Link>
                                <OpenModalButton
                                    cssm="manage-delete"
                                    buttonText="Delete"
                                    modalComponent={<DeleteCourse courseId={course.id} />}
                                />
                            </span>
                        </div>
                    ))}
                </div>

        </>
    )
}

export default CaptainsQuarters
