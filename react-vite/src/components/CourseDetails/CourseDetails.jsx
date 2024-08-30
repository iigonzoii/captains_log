import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCourse } from "../../redux/courseReducer"
import "./CD.css"
import { fetchReviewsByCourse } from "../../redux/review"
import ReviewButton from "../ReviewFormModal/ReviewButton";
import EditReviewModal from "../ReviewFormModal/EditReviewModal"
import DeleteReviewModal from "../ReviewFormModal/DeleteReviewModal"
import OpenModalButton from "../OpenModalButton";
///// todo fetch course
///// * use params to grab id and effect with thunk
///// todo fetch experiences
/////* make experiences model
/////* make experiences seeders
/////* update course model to have poi as a string or text area
///// todo integrate modal for experiences
/////* import use modal button or make a seperate page like i did with the forms
// todo apply desktop view with grid template areas
//* decide on row heights, gaps, for cols and rows
//* decide on either setting route highlight image as background or banner


function CourseDetails() {
    const dispatch = useDispatch()
    const { course_id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    console.log("ID", course_id)
    const course = useSelector((state) => state.course.courseDetail)
    console.log("COURSESELECT", course)
    const sessionUser = useSelector((state) => state.session.user);
    let reviews = useSelector(state => state.review)
    reviews = Object.values(reviews)
    console.log("REVIEWS",reviews)


    useEffect(() => {
        //?shouldnt i be watching reviews some how? or is watching dispatch doing that?
        dispatch(fetchReviewsByCourse(+course_id))
            .then(() => dispatch(fetchCourse(+course_id)))
            .then(() => setIsLoaded(true));
    }, [dispatch, course_id]);
    // useEffect(() => {
    //     //! will probably need to watch experience to rerender after someone messes with it
    //     dispatch(fetchCourse(course_id))
    //     //! also will probably need to watch courseId if its buggy
    // }, [dispatch, course_id])


    return isLoaded && (
        <div className="cd-container">
            <div className="cd-name">{course.name}</div>
            <textarea disabled className="cd-log">{course.log_entry}</textarea>

            <ul className="reviews-list cd-reviews">

                {reviews.length > 0 ? reviews && reviews.map((review, index) => (
                  <li key={index}>
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
                    </li>
                )) : <p>No reviews here</p>}

            {sessionUser && course.owner_id !== sessionUser.id && (
                <div className=" ad-review-button">
                    {(
                        <ReviewButton reviews={reviews} course_id={course_id} />
                    )}
                </div>
            )}</ul>
            <div className="cd-poi">{course.poi}</div>
            {/* below images div will be an array at some point being mapped over */}
            <div className="cd-img-container">
                <img className="cd-img" src={course.img_1} alt="image of trip" />
                <img className="cd-img" src={course.img_2} alt="image of trip" />
                <img className="cd-img" src={course.img_3} alt="image of trip" />
                <img className="cd-img" src={course.img_4} alt="image of trip" />
            </div>
        </div>
    )
}

export default CourseDetails
