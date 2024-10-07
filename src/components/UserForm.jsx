import { useState } from "react";
import { createNewUser, editUser } from "../util/util";
import { useDispatch, useSelector } from "react-redux";
import { modalAction, usersAction } from "../store";
import { useNavigate } from "react-router-dom";
import AlertContainer from "./AlertContainer";


export default function UserForm({ onClose, id }) {

    const [defaultUserName, setDefaultUserName] = useState("USER-");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const users = useSelector(state => state.users.users);

    let name = "";
    let username = "";
    let email = "";
    let phone = "";
    let street = "";
    let city = "";
    let zipcode = "";
    let userId = Math.floor(Math.random() * (100 - 11 + 1)) + 11;;


    if (id) {
        const editUserIndex = users.findIndex(user => user.id == id)
        name = users[editUserIndex].name
        username = users[editUserIndex].username
        email = users[editUserIndex].email
        phone = users[editUserIndex].phone
        street = users[editUserIndex].address.street
        city = users[editUserIndex].address.city
        zipcode = users[editUserIndex].address.zipcode
        userId = users[editUserIndex].id
    }


    function nameChangeHandler(event) {
        setDefaultUserName(`USER-${event.target.value}`)
    }

    async function formSubmitHandler(event) {
        event.preventDefault();
        setIsLoading(true);
        const fd = new FormData(event.target);
        const formData = Object.fromEntries(fd.entries());
        const userObject = {
            id: userId,
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            address: {
                street: formData.street,
                city: formData.city,
                zipcode: formData.zip,
                suite: ""
            }
        }

        try {
            const { message, result } = name ? await editUser(userObject) : await createNewUser(userObject);
            console.log("result", result);
            console.log("mess", message);
            setMessage(message);
            if (name) {
                dispatch(usersAction.updateUser(result));
            } else {
                setTimeout(()=>{
                    dispatch(usersAction.createUser(result))
                },1000)
            }
            setIsLoading(false);
            setIsError(false);
            setTimeout(() => {
                dispatch(modalAction.closeModal());
                navigate("/");
            }, 1000)


        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            setMessage(error.message);
        }

    }


    return (
        <div className="w-100">
            <h1 className="mb-4">{name ? "Edit User Deatils" : "Create User"}</h1>
            {message && <AlertContainer message={message} type={isError ? "alert-danger" : "alert-success"} />}
            <form onSubmit={formSubmitHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" id="name" defaultValue={name} onChange={nameChangeHandler} required={name ? false : true} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" id="uesrname" value={name ? username : defaultUserName} onChange={() => { }} disabled />
                    <input type="text" name="username" className="form-control" id="uesrname" value={name ? username : defaultUserName} onChange={() => { }} hidden />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" defaultValue={email} required={name ? false : true} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="text" name="phone" className="form-control" id="phone" defaultValue={phone} required={name ? false : true} />
                </div>

                <div className="mb-5">
                    <label htmlFor="address" className="form-label">Address</label>
                    <div className="d-flex justify-content-start mb-3">
                        <div className="me-5 w-50">
                            <label htmlFor="street">Street Address</label>
                            <input type="text" id="street" className="form-control" name="street" defaultValue={street} placeholder="Enter your street address" required={name ? false : true} />
                        </div>
                        <div className="w-50">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" className="form-control" name="city" defaultValue={city} placeholder="Enter your city" required={name ? false : true} />

                        </div>
                    </div>
                    <div className="d-flex justify-content-start">
                        <div className="w-50">
                            <label htmlFor="zip">Zip Code</label>
                            <input type="text" id="zip" className="form-control" name="zip" defaultValue={zipcode} placeholder="Enter your zip code" required={name ? false : true} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary me-4" disabled={isLoading ? true : false}>{isLoading ? "Submitting....." : "Submit"}</button>
                {!isLoading && <button type="button" className="btn btn-primary" onClick={() => onClose()}>Close</button>}
            </form>
        </div>
    )
}
