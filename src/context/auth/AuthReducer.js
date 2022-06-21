const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                currentUser: action.payload
            }

        case "LOGOUT":
            return {
                ...state,
                currentUser: action.payload
            }
        
        default:
            return state
    }
}

export default authReducer