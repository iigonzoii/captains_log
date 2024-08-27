import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CC.css";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../redux/courseReducer";

// todo check to see if logged in
//     * set variable using session object for if null comparison

//todo show a form
//* render an html form


//todo check to make sure required fields are passed into form by user
//* create an error object using state
//todo store that form input data into a variable
//* useState to collect the valueform data
//todo call the createCourse thunk and pass it in the formdata
//todo navigate to captainsquarters
//! I dont understand what flask forms is for when i have to create an html form anyways. I also dont know if im supposed to be referring to the model variable names or the flask form variable names

function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const [highlightImg, setHighlightImg] = useState("");
    const [imgOne, setImgOne] = useState("");
    const [imgTwo, setImgTwo] = useState("");
    const [imgThree, setImgThree] = useState("");
    const [imgFour, setImgFour] = useState("");
    const [name, setName] = useState("");
    const [surface, setSurface] = useState("");
    const [gas, setGas] = useState();
    const [resourceAccess, setResourceAccess] = useState();
    const [difficulty, setDifficulty] = useState();
    const [curvedRoads, setCurvedRoads] = useState();
    const [originCity, setOriginCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [logEntry, setLogEntry] = useState("");
    const [errors, setErrors] = useState({});

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
            console.log("NEWCOURSE",payload);
            dispatch(createCourse(payload));
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
        <>
            <h1>Chart Your Course</h1>
            <section className="form-container">
                <form onSubmit={handleSubmit}>
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
                        placeholder="Course Name"
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
                        value={gas}
                        onChange={e => setGas(e.target.value)}
                        placeholder="Gas Availability"
                        className="input-field"
                    />
                    <input
                        value={resourceAccess}
                        onChange={e => setResourceAccess(e.target.value)}
                        placeholder="Resource Availabilty"
                        className="input-field"
                    />
                    <input
                        value={difficulty}
                        onChange={e => setDifficulty(e.target.value)}
                        placeholder="Difficulty Level"
                        className="input-field"
                    />
                    <input
                        value={curvedRoads}
                        onChange={e => setCurvedRoads(e.target.value)}
                        placeholder="Road Curves"
                        className="input-field"
                    />
                    <input
                        value={originCity}
                        onChange={e => setOriginCity(e.target.value)}
                        placeholder="Departure City"
                        className="input-field"
                    />
                    {errors.originCity && <p className="error-message">{errors.originCity}</p>}
                    <input
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="Departure State"
                        className="input-field"
                    />
                    {errors.state && <p className="error-message">{errors.state}</p>}
                    <input
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="Departure Country"
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
                        <button type="submit" className="form-button">Submit
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
            </section>
        </>
    );
}

export default CreateCourse;
