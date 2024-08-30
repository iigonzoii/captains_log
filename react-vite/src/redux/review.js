
//*------ACTION TYPES---------
const LOAD_REVIEWS = "reviews/loadReviews"
const ADD_REVIEW = 'reviews/addReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';

//*-------ACTION CREATORS---------
export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

export const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

//*---------THUNKS------------

//* Get current users reviews
export const fetchCurrUserReviews = () => async (dispatch) => {
    const response = await fetch("/api/reviews/current")
    const reviews = await response.json()
    dispatch(loadReviews(reviews.Reviews))
}

//* Get all reviews by Course ID
export const fetchReviewsByCourse = (courseId) => async (dispatch) => {
    const response = await fetch(`/api/courses/${courseId}/reviews`)
    const reviews = await response.json()
    dispatch(loadReviews(reviews))
}
// !might have to take this slash off

//* Create a review by Course ID
export const createReview = (course_id, review) => async (dispatch) => {
    const response = await fetch(`/api/courses/${course_id}/reviews`, {
        method: "POST",
        body: JSON.stringify(review),
        headers: { "Content-Type": "application/json" }
    })
    const newReview = await response.json()
    dispatch(addReview(newReview))
}
// !might have to take this slash off
//* Update a review by ID
export const editReview = (reviewId, review) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}/`, {
        // csrfFetch
        method: 'PUT',
        body: JSON.stringify(review),
        headers: { "Content-Type": "application/json" }
    })
    if (response.ok) {
        const updatedReview = await response.json()
        dispatch(updateReview(updatedReview))
    } else {
        const errors = await response.json()
        return errors
    }
}

//* Delete a review by id
export const removeReview = (reviewId) => async (dispatch) =>{
    const response = await fetch(`/api/reviews/${reviewId}`, {
        // csrfFetch
        method: "DELETE"
    })
    dispatch(deleteReview(reviewId))
    return response
}


//*---------REDUCERS-----------

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {}
            action.reviews.reviews?.forEach((review) => {
                newState[review.id] = review
            });
            return newState;
        }
        case ADD_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review ,
            };
        }
        case UPDATE_REVIEW: {
            const updatedState = { ...state };
            updatedState[action.review.id] = action.review;
            return updatedState;

        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        default:
            return state;
    }
};

export default reviewReducer;
