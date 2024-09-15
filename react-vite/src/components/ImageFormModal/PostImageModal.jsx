import { useState } from 'react';
import { createImage } from '../../redux/image';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useHistory } from "react-router-dom"
import "./ImageForm.css"


function CreateImageModal({ course_id }) {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // * create an object with the attribute keys set to empty strings
    const [formData, setFormData] = useState({
        file: "",
        caption: "",
        private: ""
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // // * variable to house the response of my createImage thunk
        // const serverResponse = await dispatch(
        //     createImage(course_id, formData)
        // );

        // if (serverResponse) {
        //     setErrors(serverResponse);
        // } else {
        //     closeModal();
        // }
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        await dispatch(createImage(formData));
        history.push("/images");


    };

    const handleChange = (e) => {
        // *spread in the formData as well as a key value pair of the updated target
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className='review-form-parent'>
            <h1 className="review-form-heading">Post an image</h1>
            {errors.server && <p>{errors.server}</p>}
            <form className="review-form-body" onSubmit={handleSubmit}
                encType="mulitpart/form-data"
            >
                <input
                type="file"
                accept="image/*"
                    placeholder='Add file here'
                    name="file"
                    value={formData.file}
                    // onChange={handleChange}
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
                {/* {errors.image.file && <p>{errors.image.file}</p>} */}
                <input
                    placeholder='Add a caption'
                    name="caption"
                    value={formData.caption}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="private">This photo is private?</label>
                <select
                    id="private"
                    name="private"
                    required
                    onChange={handleChange}
                >
                    <option value=""
                    >Please choose an option</option>
                    <option value={formData.private}
                    > True</option>
                    <option value={formData.private}
                    > False</option>
                </select>


                <div className="review-buttons">
                    <button className="submit-button" type="submit" disabled={Object.keys(formData).length < 3} >Submit</button>
                    {(imageLoading)&& <p>Loading...</p>}
                    <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateImageModal;
