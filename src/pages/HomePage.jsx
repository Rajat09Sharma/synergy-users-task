import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { modalAction, usersAction } from "../store";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import AlertContainer from "../components/AlertContainer";
import LoadingBar from "../components/LoadingBar";


export default function HomePage() {

    const users = useSelector(state => state.users.users);
    const isFirstUpdate = useSelector(state => state.users.isFirstUpdate);
    const isModalOpen = useSelector(state => state.modal.isModalOpen);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [searchList, setSearchList] = useState(users);

    function clickHandler(id) {
        navigate(`user/${id}`)
    }

    function createUserBtnHandler() {
        dispatch(modalAction.openModal())
    }

    function closeModal() {
        dispatch(modalAction.closeModal())
    }

    function handleSearchSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const { search } = Object.fromEntries(fd.entries());

        if (search == "") {
            setSearchList(users);
        } else {
            const newUsersList = users.filter(user => {
                const searchableText = `${user.name}`
                return searchableText.toLowerCase().includes(search.toLowerCase());
            });
            console.log(newUsersList);
            setSearchList(newUsersList);
        }
    }

    useEffect(() => {
        async function fectUsers() {
            setIsLoading(true)
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users.");
                }
                const data = await response.json();
                dispatch(usersAction.setUsers({ data }));
                setSearchList([...data])
                setIsError(false);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsError(true);
                setIsLoading(false);
            }
        }
        if (isFirstUpdate) {
            fectUsers();
        }
        console.log("main called");

    }, [dispatch, isFirstUpdate]);

    useEffect(() => {
        setSearchList(users)
    }, [users])

    return (
        <>
            <Modal key={users.length} open={isModalOpen} onClose={closeModal}>
                <UserForm onClose={closeModal} />
            </Modal>
            <div className="container mt-4">
                {isError && <AlertContainer message="Failed to fetch users, please try again later." type="alert-danger" />}
                <div className="d-flex">
                    <h2>User Management</h2>
                    <div className="ms-auto">
                        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                            <input className="form-control me-2" name="search" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-dark" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                {isLoading && <LoadingBar />}
                {!isLoading && <button className="btn btn-lg btn-dark my-3" onClick={createUserBtnHandler}>Create New User</button>}
                {!isLoading && !isError && <div className="table-responsive">
                    <table className="table table-striped table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col">UserName</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                                <th scope="col">Deatils</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchList.map(user => {
                                return (<tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address.street}, {user.address.city}, {user.address.zipcode}</td>
                                    <td><button className="btn btn-info" onClick={() => clickHandler(user.id)}>View & Edit</button></td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>}
            </div>
        </>
    )
}
