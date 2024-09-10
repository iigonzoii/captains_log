import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import PostImageModal from "./PostImageModal"

function ImageButton({ course_id }) {
    const currUser = useSelector((state) => state.session.user.id);
    let course = useSelector(state => state.course);
    // console.log("Flag:", course)

    // const userAlreadyReviewed = sessionUser && reviews ? reviews.some((review) => review.user_id === sessionUser.id) : false;

    return (
        <div className="review-button-container" >
            {currUser && currUser !== course.owner_id && (
                <OpenModalButton
                    buttonText="Post an Image"
                    modalComponent={<PostImageModal course_id={course_id} />}
                />
            )}
        </div>
    );
}

export default ImageButton;
