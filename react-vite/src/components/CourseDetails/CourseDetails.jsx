import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCourse } from "../../redux/courseReducer"
import { fetchImagesByCourse } from "../../redux/image"
import "./CD.css"
import { fetchReviewsByCourse } from "../../redux/review"
import ReviewButton from "../ReviewFormModal/ReviewButton";
import EditReviewModal from "../ReviewFormModal/EditReviewModal"
import DeleteReviewModal from "../ReviewFormModal/DeleteReviewModal"
import OpenModalButton from "../OpenModalButton";
import EditImageModal from "../ImageFormModal/EditImageModal";
import DeleteImageModal from "../ImageFormModal/DeleteImageModal";
import ImageButton from "../ImageFormModal/ImageButton"


function CourseDetails() {
    const dispatch = useDispatch()
    const { course_id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    // console.log("ID", course_id)
    const course = useSelector((state) => state.course.courseDetail)
    // console.log("COURSE", course)
    const sessionUser = useSelector((state) => state.session.user);
    let images = useSelector((state) => state.image)
    let reviews = useSelector(state => state.review)
    reviews = Object.values(reviews)
    images = Object.values(images)
    // images = Object.values(images)
    // console.log("IMG",images)


    useEffect(() => {
        //?shouldnt i be watching reviews some how? or is watching dispatch doing that?
        dispatch(fetchReviewsByCourse(+course_id))
            .then(() => dispatch(fetchImagesByCourse(+course_id)))
            .then(() => dispatch(fetchCourse(+course_id)))
            .then(() => setIsLoaded(true));
    }, [dispatch]);
    //  course
    return isLoaded && (
        <div className="cd-container">
            <div className="cd-name">{course.name}</div>

            <img className="cd-banner" src={course.highlight_img} />

            {/*! once i change logs to a map, change text area to a div and set the overflow for scroll. textarea can only have one child!*/}
            <div className="cd-log">{course.log_entry}</div>
            <div className="cd-reviews">
                {reviews.length > 0 ? reviews && reviews.map((review, index) => (
                    <div key={index}>
                        {`UserId-${review.user_id}-${review.review}`}
                        {sessionUser && review.user_id === sessionUser.id && (
                            <div className="review-modify-buttons">
                                <div className="review-edit-button">
                                    <OpenModalButton
                                        buttonText="EDIT"
                                        modalComponent={<EditReviewModal reviewId={review.id} review={review} />}
                                    />
                                </div>
                                <div className="review-delete-button">
                                    <OpenModalButton
                                        buttonText="DELETE"
                                        modalComponent={<DeleteReviewModal reviewId={review.id} />}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )) : <p>No reviews here</p>}

                {sessionUser && course.owner_id !== sessionUser.id && (
                    <div className="ad-review-button">
                        {(
                            <ReviewButton reviews={reviews} course_id={course_id} />
                        )}
                    </div>
                )}
            </div>
            <div className="cd-poi">{course.poi}</div>
            {/* below images div will be an array at some point being mapped over */}
            <div className="cd-img-container">
                {images.length > 0 ? images.map((image, index) => (
                    <div key={index}>
                        {`UserId-${course.owner_id}imageId-${image.id}`}
                        {sessionUser && course.images.user_id !== sessionUser.id && (
                            <div>
                                <img src={image.file} />
                                <p>{image.caption}</p>
                                <p>{image.created_at}</p>
                                <div className="review-modify-buttons">
                                    <div className="review-edit-button">
                                        <OpenModalButton
                                            buttonText="EDIT"
                                            modalComponent={<EditImageModal imageId={image.id} image={image} />}
                                        />
                                    </div>
                                    <div className="review-delete-button">
                                        <OpenModalButton
                                            buttonText="DELETE"
                                            modalComponent={<DeleteImageModal imageId={image.id} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )) : <p>No images yet</p>}
                {sessionUser && course.owner_id === sessionUser.id && (
                    <div className="ad-image-button">
                        {(
                            <ImageButton course_id={course_id} />
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}

export default CourseDetails
