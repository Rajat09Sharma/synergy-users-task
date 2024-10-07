
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import { modalAction, usersAction } from "../store";
import { useState } from "react";
import DeleteForm from "../components/DeleteForm";


export default function UserPage() {

    const [isEdit, setIsEdit] = useState(false);

    const users = useSelector(state => state.users.users);
    const isModalOpen = useSelector(state => state.modal.isModalOpen)
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate()

    const user = users.filter(user => user.id == id);

    function editClickHandler() {
        setIsEdit(true);
        dispatch(modalAction.openModal())
    }

    function deleteClickHandler() {
        setIsEdit(false);
        dispatch(modalAction.openModal())
    }

    function closeModal() {
        dispatch(modalAction.closeModal())
    }

    function deleteUser() {
        console.log(id);
        dispatch(usersAction.deleteUser({ id }))
        dispatch(modalAction.closeModal())
        navigate("/")
    }

    return (
        <>
            <Modal open={isModalOpen} onClose={closeModal}>
                {isEdit && <UserForm onClose={closeModal} id={id} />}
                {!isEdit && <DeleteForm onClose={closeModal} onDelete={deleteUser} />}
            </Modal>
            <div className="container">
                {user.map(e => {
                    return (<div className="card" key={e.id}>
                        <h1 className="card-header d-flex ">{e.name} <span className="ms-auto cross-btn" onClick={() => navigate("/")}>×</span></h1>
                        <div className="card-body">
                            <div className="mb-5" >
                                <h3>Username: {e.username}</h3>
                                <h3>Email: {e.email}</h3>
                                <h3>Phone: {e.phone}</h3>
                                <h3>Address: {e.address.street}, {e.address.suite} <br />{e.address.city}, {e.address.zipcode}</h3>
                            </div>
                            <button className="btn btn-lg btn-primary me-4" onClick={editClickHandler}>Edit</button>
                            <button className="btn btn-lg btn-danger" onClick={deleteClickHandler}>Delete</button>
                        </div>
                    </div>
                    )
                })}
            </div>

        </>
    )
}
