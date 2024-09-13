import { useDispatch } from 'react-redux';
import { removeImage } from '../../redux/image';
import { useModal } from '../../context/Modal';


function DeleteImageModal({imageId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        return dispatch(removeImage(imageId)).then(closeModal());
    };

    return (
        <div className="review-form-parent">
            <h1 className="review-form-heading">Confirm Delete</h1>
            <h2 id="delete-subheading">Are you sure you want to remove this Image?</h2>
            <div className="review-buttons">
                <button className="cancel-button" type="submit" onClick={handleDelete}>Yes (Delete Image)</button>
                <button className="submit-button" onClick={closeModal}>No (Keep Image)</button>
            </div>
        </div>
    )
}

export default DeleteImageModal;
