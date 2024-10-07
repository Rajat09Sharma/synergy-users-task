import { configureStore, createSlice } from "@reduxjs/toolkit";

const usersIinitialState={users:[],isFirstUpdate:true}
const usersSlice=createSlice({
    name:"users",
    initialState:usersIinitialState,
    reducers:{
        setUsers(state,{payload}){
            const newUsers=[...payload.data]
            state.users=newUsers;
        },
        updateUser(state,{payload}){
            const updatedUsers = [...state.users]
            const editUserIndex = updatedUsers.findIndex(user => user.id == payload.id);
            const editUser = updatedUsers[editUserIndex];
            editUser.name=payload.name;
            editUser.email=payload.email;
            editUser.phone=payload.phone;
            editUser.address=payload.address;
            console.log(updatedUsers);
            state.users=updatedUsers;
            state.isFirstUpdate=false;
        },
        createUser(state,{payload}){
            const newUser=[payload,...state.users];
            state.users=newUser;
            state.isFirstUpdate=false;
        },
        deleteUser(state,{payload}){
            console.log(payload.id,"id");
            
            const currentUsers = [...state.users]
            const newUsers = currentUsers.filter(user => user.id != payload.id);
            console.log(newUsers);
            state.users=newUsers;
            state.isFirstUpdate=false;
            
        }
    }
});

const modalInitialState={isModalOpen:false}
const modalSlice=createSlice({
    name:"modal",
    initialState:modalInitialState,
    reducers:{
        openModal(state){
            state.isModalOpen=true;
        },
        closeModal(state){
            state.isModalOpen=false;
        }
    }
})

const store=configureStore({
    reducer:{
        users:usersSlice.reducer,
        modal:modalSlice.reducer
    }
});

export const usersAction=usersSlice.actions;
export const modalAction=modalSlice.actions;
export default store;