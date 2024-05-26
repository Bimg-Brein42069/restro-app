import {createSlice} from '@reduxjs/toolkit';
import authReducer from './authReducer';

const initState = {
    jwt: null,
    currUser: null,
};

const userSlice = createSlice({
    name:'user',
    initState,
    reducers: {
        authReducer
    }
})

export default userSlice.reducer;