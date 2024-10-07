import { useState } from "react"

export default function DeleteForm({ onClose, onDelete }) {
    const [isDelete, setIsDelete] = useState(false)

    function handleDelete() {
        setIsDelete(true);
        setTimeout(() => {
            onDelete();
        }, 1200)

    }

    return (
        <div className="alert alert-danger" role="alert">
            {isDelete && <h3 className="alert alert-success">Deleted successfully.</h3>}
            <h1 className="mb-5">Are you sure?</h1>
            <div className="mt-5 d-flex justify-content-end">
                <button className="btn me-5" onClick={() => onClose()}>Cancle</button>
                <button className="btn btn-lg btn-danger" onClick={handleDelete}>Delete</button>
            </div>

        </div>
    )
}
