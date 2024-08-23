const LOAD_COURSES = "course/loadCourses"
const LOAD_COURSE = "course/loadCourse"
const UPDATE_COURSE = "course/updateCourse"
const CREATE_COURSE = "course/createCourse"
const USER_COURSES =    "course/loadUserCourses"
const DELETE_COURSE = "course/deleteCourse"


    //*-------ACTION CREATORS---------
export const loadCourses = (courses) => {
    return {
        type: LOAD_COURSES,
        courses
    }
}

export const loadCourse = (course) => {
    return {
        type: LOAD_COURSE,
        course
    }
}

export const loadUserCourses = (courses) => ({
    type: USER_COURSES,
    courses
});

export const updateCourse = (courseId, payload) => {
    return {
        type: UPDATE_COURSE,
        courseId,
        payload,
    };
};

export const addCourse = (course) => ({
    type: CREATE_COURSE,
    course
});

export const removeCourse = (courseId) => ({
    type: DELETE_COURSE,
    courseId
})

        //*---------THUNKS------------*

//* Get all courses
export const fetchCourses = () => async (dispatch) => {
    const response = await fetch('/api/courses/');
    const courses = await response.json();
    // console.log(courses)
    dispatch(loadCourses(courses));
};


//* Get course by ID
export const fetchCourse = (courseId) => async (dispatch) => {
    const response = await fetch(`/api/courses/${courseId}`)
    const course = await response.json()
    dispatch(loadCourse(course))
    return course
}

//* Update course by ID
export const fetchUpdateCourse = (course) => async (dispatch) => {
    // console.log('Course',course);
    try {
        const res = await fetch(`/api/courses/${course.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        });


        if (res.ok) {
            const data = await res.json();

          // console.log('Data',data)

            dispatch(updateCourse(course.id, data));
        } else {
            console.error("Failed to load course");
        }
    } catch (err) {
        console.error("Error loading course", err);
    }
};


//* delete course by id
export const deleteCourse = (courseId) => async (dispatch) =>{
    try {
        const res = await fetch(`/api/courses/${courseId}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            dispatch(removeCourse(courseId));
        }
    } catch (err) {
        console.error("Error deleting course", err);
    }
}

//* Get current user's courses
export const fetchCurrUserCourses = () => async (dispatch) => {
    try {
        const res = await fetch("/api/courses/current", {
            headers: { "Content-Type": "application/json" }
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(loadUserCourses(data));
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch courses");
        }
    } catch (err) {
        console.error("Error loading courses", err);
    }
};


//* Create an course
export const createCourse = (course) => async (dispatch) => {
    try {
        const response = await fetch(`/api/courses/`, {
            method: "POST",
            body: JSON.stringify(course),
            headers: { "Content-Type": "application/json" }
        });

        // console.log("FetchResponse", response);

        if (response.ok) {
            const newCourse = await response.json();
            dispatch(addCourse(newCourse));
            return newCourse;
        } else {
            const errors = await response.json();
            throw errors;
        }
    } catch (err) {
        console.error("Error creating course", err);
    }
};


            //*---------REDUCERS-----------*

const initialState = { courseDetail: {} };

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COURSES: {
            let newState = {}
            action.courses.courses.forEach(course => {console.log(course)})
            action.courses.courses.forEach(course => {
                newState[course.id] = course
            })
            return newState
        }
        case LOAD_COURSE:{
            const newState = { ...state };
            const updatedCourse = {
                ...action.course,
                UserCourses: action.course.UserCourses
            };
            newState[action.course.Course.id] = updatedCourse;
            return newState;
        }
            // return { ...state, courseDetail: {...action.course}};
            case UPDATE_COURSE: {
                // console.log(action.payload)
                return {
                    ...state,
                    courseDetail: action.payload
                };
            }

        case CREATE_COURSE:
                return {
                    ...state,
                    [action.course.id]: action.course
                };

        case USER_COURSES: {
                    const newState = {};
                    action.courses.courses.forEach(course => {
                        newState[course.id] = course
                    })
                    return {  ...newState}
                }
        case DELETE_COURSE: {
            const newState = { ...state };
            delete newState[action.courseId];
            return newState;
        }

        default:
            return state;
    }
};

export default courseReducer;
