import { useState } from 'react';
import { editImage } from '../../redux/image';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "./ImageForm.css"


function EditImageModal({ imageId, image }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [formData, setFormData] = useState({
        image: image.image,
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            editImage(imageId, formData)
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className='review-form-parent'>
            <h1 className="review-form-heading">Edit your review</h1>
            {errors.server && <p>{errors.server}</p>}
            <form className="review-form-body" onSubmit={handleSubmit}>
                <input
                    placeholder='Add file here'
                    name="file"
                    value={formData.file}
                    onChange={handleChange}
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
                <label htmlFor="private">Is this photo Private?</label>
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
                    <button className="submit-button" type="submit" >Submit</button>
                    <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditImageModal;
