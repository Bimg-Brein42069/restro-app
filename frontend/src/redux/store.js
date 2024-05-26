import { createStore, combineReducers } from 'react-redux';
import authReducer from './userfuncs/authReducer';

const rootReducer = combineReducers({
    auth:authReducer,
})

const store = createStore(rootReducer);

export default store;