const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            };
        case 'SET_OTHEME':
            return {
                ...state,
                oppositeTheme: action.payload
            };
        case 'SET_KEY':
            return {
                ...state,
                key: action.payload
            };
        case 'SET_MODAL':
            return {
                ...state,
                modalColor: action.payload
            };
        case 'SET_ROOM':
            return {
                ...state,
                roomName: action.payload
            };
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            }
        default:
            return state;
    }
};

export default Reducer;
