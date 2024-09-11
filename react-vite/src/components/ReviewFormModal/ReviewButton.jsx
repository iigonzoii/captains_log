import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "./PostReviewModal"

function ReviewButton({ reviews, course_id }) {
    const sessionUser = useSelector((state) => state.session.user);

    const userAlreadyReviewed = sessionUser && reviews ? reviews.some((review) => review.user_id === sessionUser.id) : false;

    return (
        <div className="review-button-container" >
            {sessionUser && !userAlreadyReviewed && (
                <OpenModalButton
                    buttonText="Post a Review"
                    modalComponent={<PostReviewModal course_id={course_id} />}
                />
            )}
        </div>
    );
}

export default ReviewButton;
