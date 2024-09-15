
//*------ACTION TYPES---------
const LOAD_IMAGES = "images/loadImages"
const ADD_IMAGE = 'images/addImage';
const UPDATE_IMAGE = 'images/updateImage';
const DELETE_IMAGE = 'images/deleteImage';

//*-------ACTION CREATORS---------
export const loadImages = (images) => {
    return {
        type: LOAD_IMAGES,
        images
    }
}

export const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        image
    }
}

export const updateImage = (image) => {
    return {
        type: UPDATE_IMAGE,
        image
    }
}

export const deleteImage = (imageId) => {
    return {
        type: DELETE_IMAGE,
        imageId
    }
}

//*---------THUNKS------------

//* Get current users images
export const fetchCurrUserImages = () => async (dispatch) => {
    const response = await fetch("/api/images/current")
    const images = await response.json()
    dispatch(loadImages(images.Images))
}

//* Get all images by Course ID
export const fetchImagesByCourse = (courseId) => async (dispatch) => {
    const response = await fetch(`/api/courses/${courseId}/images`)
    let images = await response.json()
    dispatch(loadImages(images))
}

//* Create a image by Course ID--current setup
// export const createImage = (course_id, image) => async (dispatch) => {
//     const response = await fetch(`/api/courses/${course_id}/images`, {
//         method: "POST",
//         body: JSON.stringify(image),
//         headers: { "Content-Type": "application/json" }
//     })
//     const newImage = await response.json()
//     dispatch(addImage(newImage))
// }

//* Create a image by Course ID AWS
export const createImage = (post) => async (dispatch) => {
    const response = await fetch(`/images/new`, {
      method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     "Content-Type": "application/json",
    //   },
      body: post
    });

    if (response.ok) {
        const { resPost } = await response.json();
        dispatch(addImage(resPost));
    } else {
        console.log("There was an error making your post!")
    }
};



//* Update a image by ID
export const editImage = (imageId, image) => async dispatch => {
    const response = await fetch(`/api/images/${imageId}`, {
        method: 'PUT',
        body: JSON.stringify(image),
        headers: { "Content-Type": "application/json" }
    })
    if (response.ok) {
        const updatedImage = await response.json()
        dispatch(updateImage(updatedImage))
    } else {
        const errors = await response.json()
        return errors
    }
}

//* Delete a image by id
export const removeImage = (imageId) => async (dispatch) =>{
    const response = await fetch(`/api/images/${imageId}`, {
        method: "DELETE"
    })
    dispatch(deleteImage(imageId))
    return response
}


//*---------REDUCERS-----------

const initialState = {};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_IMAGES: {
            const newState = {}
            action.images.images?.forEach((image) => {
                newState[image.id] = image
            });
            return newState;
        }
        case ADD_IMAGE: {
            return {
                ...state,
                [action.image.id]: action.image ,
            };
        }
        case UPDATE_IMAGE: {
            const updatedState = { ...state };
            updatedState[action.image.id] = action.image;
            return updatedState;

        }
        case DELETE_IMAGE: {
            const newState = { ...state };
            delete newState[action.imageId];
            return newState;
        }
        default:
            return state;
    }
};

export default imageReducer;
