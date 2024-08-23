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

// todo make backround image of div the scroll
    //* i think replace the img tag with a div, set class with background image using scroll url
// todo overlay data on the image
    //* i think we will set the p tags inside the div, probably display the div flex, direction column, align-center. do flex start for name and flex end for state or the other way
        //* switch cases checking each course.attribute for numbers 1 thourgh five and returning the same amount of x's?
// todo make a mobile friendly container
    //* outer div container displaying grid, two columns, two rows, on media query make it one column, four rows
// todo
// todo
// todo
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
