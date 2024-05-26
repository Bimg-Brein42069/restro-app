const authReducer = (state, action) => {
    switch(action.type){
        case 'SIGNIN':
            return {
                ...state,
                jwt:action.payload.jwt,
                currUser:action.payload.user
            };
        case 'SIGNOUT':
            return {
                ...state,
                jwt:null,
                currUser:null
            };
        default:
            return state;
    }
}

export default authReducer;