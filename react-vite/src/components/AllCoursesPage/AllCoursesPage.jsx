import { fetchCourses } from "../../redux/courseReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AllCourses.css"

function AllCoursesPage() {
    const navigate = useNavigate();
    let courseData = useSelector((state) => state.course);
    const dispatch = useDispatch();
    courseData= Object.values(courseData);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    return (
        <div className="cm-container">
            {courseData && courseData.map((course, index) => (

                <div className='cm-card'
                    title={`${course.name}`}
                    // !might have to put forward slash on this
                    onClick={() => navigate(`/courses/${course.id}`)}
                    key={index}>
                    <div className="album-data-container">
                        <p className='data-container-item'>{`Resources ${course.resource_access}`}</p>
                        <p className='data-container-item bottom-item'>Road Curves{course.curved_roads}</p>
                        <p className='data-container-item bottom-item'>Difficulty{course.difficulty}</p>
                        <p className='data-container-item'>GAS{course.gas}</p>
                        <p className='data-container-item bottom-item'>ID {course.id}</p>
                        <p className='data-container-item bottom-item'>Denver{course.orign_city}</p>
                        <p className='data-container-item bottom-item'>STATE{course.state}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllCoursesPage;
