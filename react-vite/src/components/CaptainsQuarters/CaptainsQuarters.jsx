import { fetchCurrUserCourses } from "../../redux/courseReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DeleteCourse from "../DeleteCourse/DeleteCourse";
import OpenModalButton from "../OpenModalButton"
import "./CQ.css"

function CaptainsQuarters() {
    let userCourses = useSelector((state) => state.course);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    userCourses = Object.values(userCourses);
    useEffect(() => {
        if (user)
            dispatch(fetchCurrUserCourses())
    }, [dispatch, user]);
    if (!user) {
        return <p className="cq-unauth">Log In to enter Captains Quarters</p>;
    }
    if (userCourses.length < 1) {
        return <div className="cq-no-courses">
            <p>Welcome to your future home page. Create your first Course to begin!</p>
            <button onClick={() => navigate("/courses/new")}>create course</button>
        </div>
    }

    return (
        <div className="cq-container">
            <div className="cq-banner-area">
                <img className="cq-banner-img" src="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/70West.jpg?alt=media&token=72fef901-1ee7-483d-8bf5-3da3c577e980" />
                <img className="cq-pro-img" src="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/nimbus.jpg?alt=media&token=f15b6a24-fa1f-4977-8bf6-3d5f44983b66" />
            </div>
            <div className="cq-transport">transport
                <div>V2 here will be a vehicle with update delete</div>
                <div>V2 here will be a vehicle with update delete</div>
                <div>V2 here will be a vehicle with update delete</div>
                <div>V2 here will be a vehicle with update delete</div>
                <div>V2 here will an add vehicle button</div>
            </div>
            <div className="cq-card-container">
                {userCourses && userCourses.map((course, index) => (
                    <div className='cq-card'
                        title={`${course.name}`}
                        key={index}>
                        <p className="cq-card-name">{course.name}</p>
                        <span className="cq-card-buttons">
                            <Link to={`/courses/${course.id}/edit`}><button className="cq-update-button">Update</button></Link>
                            <OpenModalButton
                                cssm="cq-delete"
                                buttonText="Delete"
                                modalComponent={<DeleteCourse courseId={course.id} />}
                            />
                        </span>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default CaptainsQuarters
