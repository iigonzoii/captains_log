
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UC.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUpdateCourse, fetchCurrUserCourses } from "../../redux/courseReducer";

function UpdateCourse() {
    const { course_id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const courses = useSelector((state) => state.course)
    //* find the course we want to edit by id
    const course = Object.values(courses).find(course => course.id === parseInt(course_id));

    //*initialize state with course data if it exists
    // const [id] = useState(course ? course.id :"")
    const [highlightImg, setHighlightImg] = useState(course ? course.highlight_img : "");
    const [imgOne, setImgOne] = useState(course ? course.img_1 : "");
    const [imgTwo, setImgTwo] = useState(course ? course.img_2 : "");
    const [imgThree, setImgThree] = useState(course ? course.img_3 : "");
    const [imgFour, setImgFour] = useState(course ? course.img_4 : "");
    const [name, setName] = useState(course ? course.name : "");
    const [surface, setSurface] = useState(course ? course.surface : 0);
    const [gas, setGas] = useState(course ? course.gas : 0);
    const [resourceAccess, setResourceAccess] = useState(course ? course.resource_access : 0);
    const [difficulty, setDifficulty] = useState(course ? course.difficulty : 0);
    const [curvedRoads, setCurvedRoads] = useState(course ? course.curved_roads : 0);
    const [originCity, setOriginCity] = useState(course ? course.origin_city : "");
    const [state, setState] = useState(course ? course.state : "");
    const [country, setCountry] = useState(course ? course.country : "");
    const [logEntry, setLogEntry] = useState(course ? course.log_entry : "");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            dispatch(fetchCurrUserCourses()); // Fetch the user's courses on mount
        }
    }, [dispatch, user]);

    useEffect(() => {
        // Update form fields when the course is loaded from the Redux store
        if (course) {
            setHighlightImg(course.highlight_img || "");
            setImgOne(course.img_1 || "");
            setImgTwo(course.img_2 || "");
            setImgThree(course.img_3 || "");
            setImgFour(course.img_4 || "");
            setName(course.name || "");
            setSurface(course.surface || 0);
            setGas(course.gas || 0);
            setResourceAccess(course.resource_access || 0);
            setDifficulty(course.difficulty || 0);
            setCurvedRoads(course.curved_roads || 0);
            setOriginCity(course.origin_city || "");
            setState(course.state || "");
            setCountry(course.country || "");
            setLogEntry(course.log_entry || "")
        }
    }, [course]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newErrors = {};
        if (!name) newErrors.name = "Name of new Course is required";
        if (!originCity) newErrors.originCity = "Departure City is required";
        if (!state) newErrors.state = "Departure State is required";
        if (!country) newErrors.country = "Departure Country is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // !if issues may have to change the state variables that require numbers to empty () instead of empty string

        const payload = {
            id: course_id,
            owner_id: user.id,
            name,
            highlight_img: highlightImg,
            img_1: imgOne,
            img_2: imgTwo,
            img_3: imgThree,
            img_4: imgFour,
            surface,
            gas,
            resource_access: resourceAccess,
            difficulty,
            curved_roads: curvedRoads,
            origin_city: originCity,
            state,
            country,
            log_entry: logEntry
        };

        try {
            await dispatch(fetchUpdateCourse(payload));
        }
        catch (err) {
            const data = await err.json();
            if (data?.errors) {
                setErrors(data.errors);
            }
        }
        navigate("/courses")
    };

    if (!user) {
        return <p>Log In to Chart a Course</p>;
    }
    return (
        <div className="uc-container">
            <h1>Chart Your Course</h1>
            <form onSubmit={handleSubmit} className="uc-form-container">
                <input
                    value={highlightImg}
                    onChange={e => setHighlightImg(e.target.value)}
                    placeholder="Highlight Image"
                    className="input-field"
                />
                <input
                    value={imgOne}
                    onChange={e => setImgOne(e.target.value)}
                    placeholder="Image One"
                    className="input-field"
                />
                <input
                    value={imgTwo}
                    onChange={e => setImgTwo(e.target.value)}
                    placeholder="Image Two"
                    className="input-field"
                />
                <input
                    value={imgThree}
                    onChange={e => setImgThree(e.target.value)}
                    placeholder="Image Three"
                    className="input-field"
                />
                <input
                    value={imgFour}
                    onChange={e => setImgFour(e.target.value)}
                    placeholder="Image Four"
                    className="input-field"
                />
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Course Name...(Required)"
                    className="input-field"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
                <input
                    value={surface}
                    onChange={e => setSurface(e.target.value)}
                    placeholder="Surface Type"
                    className="input-field"
                />
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={gas}
                    onChange={e => setGas(e.target.value)}
                    placeholder="Gas Availability(..1-5)"
                    className="input-field"
                />
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={resourceAccess}
                    onChange={e => setResourceAccess(e.target.value)}
                    placeholder="Resource Availabilty(..1-5)"
                    className="input-field"
                />
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value)}
                    placeholder="Difficulty Level(..1-5)"
                    className="input-field"
                />
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={curvedRoads}
                    onChange={e => setCurvedRoads(e.target.value)}
                    placeholder="Road Curves..(1-5)"
                    className="input-field"
                />
                <input
                    value={originCity}
                    onChange={e => setOriginCity(e.target.value)}
                    placeholder="Departure City...(Required)"
                    className="input-field"
                />
                {errors.originCity && <p className="error-message">{errors.originCity}</p>}
                <input
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder="Departure State...(Required)"
                    className="input-field"
                />
                {errors.state && <p className="error-message">{errors.state}</p>}
                <input
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    placeholder="Departure Country...(Required)"
                    className="input-field"
                />
                {errors.country && <p className="error-message">{errors.country}</p>}
                <h2>Log Your Experience!</h2>
                <textarea
                    value={logEntry}

                    onChange={e => setLogEntry(e.target.value)}
                    placeholder="Log your experience as you go!"
                    className="textarea-field"
                />
                <div className="button-group">
                    <button type="submit" className="form-button submit-button">Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="form-button cancel-button"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateCourse;
