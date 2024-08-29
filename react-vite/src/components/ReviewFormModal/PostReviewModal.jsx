import { useState } from 'react';
import { createReview } from '../../redux/review';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "./ReviewForm.css"


function PostReviewModal({ course_id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [formData, setFormData] = useState({
        review: ''
    });
    const [errors, setErrors] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            createReview(course_id, formData)
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
        <div className="review-form-parent">
            <h1 className="review-form-heading">Share your review</h1>
            {errors.server && <p>{errors.server}</p>}›
            <form className="review-form-body" onSubmit={handleSubmit}>
                <textarea
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    placeholder='Your feedback...'
                    required
                />
                {errors.review && <p>{errors.review}</p>}
                <div className="review-buttons">
                    <button className="submit-button" type="submit" disabled={formData.review.length < 2}>Submit Your Review</button>
                    <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default PostReviewModal;
