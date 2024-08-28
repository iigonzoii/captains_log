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
            number = " X"
            break;
        case 2:
            number = " X X"
            break;
        case 3:
            number = " X X X"
            break;
        case 4:
            number = " X X X X"
            break;
        case 5:
            number = " X X X X X"
            break;
        default:
            console.log("switchCase Broke")
    }
    return number
}
    return (
        <div className="ac-container">
            {courseData && courseData.map((course, index) => (

                <div className='ac-card'
                    title={`${course.name}`}
                    // !might have to put forward slash on this
                    onClick={() => navigate(`/courses/${course.id}`)}
                    key={index}>
                    <div>
                    <p className='ac-card-name'>{course.name}</p>
                        <p className='ac-card-location'>{course.origin_city}, {course.state}</p>
                        <p className='ac-card-curves'>{`Road Curves:${numToX(course.curved_roads)}`}</p>
                        <p className='ac-card-difficulty'>Difficulty:{numToX(course.difficulty)}</p>
                        <p className=''>{`Resources:${numToX(course.resource_access)}`}</p>
                        <p className='ac-card-gas'>GAS:{numToX(course.gas)}</p>
                        <p className=''>ID {course.id}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllCoursesPage;
