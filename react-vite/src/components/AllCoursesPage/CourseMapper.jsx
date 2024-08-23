import { fetchCourses } from "../../redux/courseReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AllCourses.css"

function CourseMapper() {
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
                <div className='pointer'
                    title={`${course.name}`}
                    // !might have to put forward slash on this
                    onClick={() => navigate(`/courses/${course.id}`)}
                    key={index}>
                    <img className="cm-img" src={course.highlight_img} alt={`${course.name} cover`} />
                    <div className="album-data-container">
                        <p className='data-container-item'>{course.gas}</p>
                        <p className='data-container-item'>{`by ${course.resource_access}`}</p>
                        <p className='data-container-item bottom-item'>{course.difficulty}</p>
                        <p className='data-container-item bottom-item'>{course.curved_roads}</p>
                        <p className='data-container-item bottom-item'>{course.state}</p>
                        <p className='data-container-item bottom-item'>{course.oriign_city}</p>
                        <p className='data-container-item bottom-item'>ID {course.id}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CourseMapper;
