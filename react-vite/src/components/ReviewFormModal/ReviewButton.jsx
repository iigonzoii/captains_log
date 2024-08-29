import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "./PostReviewModal"

function ReviewButton({ reviews, album_id }) {
    const sessionUser = useSelector((state) => state.session.user);
    let course = useSelector(state => state.course);
    console.log("Flag:", course)

    const userAlreadyReviewed = sessionUser && reviews ? reviews.some((review) => review.user_id === sessionUser.id) : false;

    return (
        <div className="review-button-container" >
            {sessionUser && !userAlreadyReviewed && (
                <OpenModalButton
                    buttonText="Post a Review"
                    modalComponent={<PostReviewModal albumId={album_id} />}
                />
            )}
        </div>
    );
}

export default ReviewButton;
