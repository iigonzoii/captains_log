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


// todo function takes in a number and returns x's
function numToX (number){
    switch(number){
        case 1:
            number = " x"
            break;
        case 2:
            number = " x x"
            break;
        case 3:
            number = " x x x"
            break;
        case 4:
            number = " x x x x"
            break;
        case 5:
            number = " x x x x x"
            break;
        default:
            console.log("switchCase Broke")
    }
    return number
}
    return (
        <div className="cm-container">
            {courseData && courseData.map((course, index) => (

                <div className='cm-card'
                    title={`${course.name}`}
                    // !might have to put forward slash on this
                    onClick={() => navigate(`/courses/${course.id}`)}
                    key={index}>
                    <div className="album-data-container">
                        <p className='data-container-item bottom-item'>{course.origin_city}</p>
                        <p className='data-container-item bottom-item'>{course.state}</p>
                        <p className='data-container-item'>{`Resources${numToX(course.resource_access)}`}</p>
                        <p className='data-container-item bottom-item'>Road Curves{numToX(course.curved_roads)}</p>
                        <p className='data-container-item bottom-item'>Difficulty{numToX(course.difficulty)}</p>
                        <p className='data-container-item'>GAS{numToX(course.gas)}</p>
                        <p className='data-container-item bottom-item'>ID {course.id}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllCoursesPage;
