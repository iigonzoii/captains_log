import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteCourse } from "../../redux/courseReducer"
import { useState } from "react"

function DeleteCourse({ courseId }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})

    const deleteClick = (e) => {
        e.preventDefault()
        setErrors({})
        dispatch(deleteCourse(courseId))
            .then(closeModal)
            .catch(async (res) => {
                let data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
    }
    return (
        <>
            <form className="delete-form">
                <div><h3>Confirm Delete</h3>
                    <h5>Are you sure you want to remove this course from your travel logs?</h5>
                    {errors.message && (
                        <div>{errors}</div>
                    )}
                    <div><button onClick={deleteClick} className="deletebtn">Yes (Delete Course)</button></div>
                    <button onClick={closeModal} className="dontDeleteBtn">No (Keep Course)</button>
                </div>
            </form>
        </>
    )
}

export default DeleteCourse
