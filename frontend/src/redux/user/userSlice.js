import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    jwt: null,
    currentUser: null,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        authLogin: (state,action) => {
            state.jwt=action.payload.jwt
            state.currentUser=action.payload.user
        },
        authLogout: (state) => {
            state.jwt=null
            state.currentUser=null
        },
    }
})

export const {authLogin,authLogout} = userSlice.actions;
export default userSlice.reducer;