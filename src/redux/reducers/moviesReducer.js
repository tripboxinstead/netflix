let initialState = {
    movies : {},
    moviesLoading : true,
}

function moviesReducer (state = initialState,action) {
    let {type,payload} = action;

    switch (type) {

        case "GET_SEARCH_MOVIES_REQUEST" : 
            return {
                ...state,
                moviesLoading : true,
            };
        
        case "GET_SEARCH_MOVIES_SUCCESS" : 
            return {
                ...state,
                movies : payload.data,
                moviesLoading : false,
            };

            case "GET_SEARCH_MOVIES_FAILURE" : 
            return {
                ...state,
                moviesLoading : false,
            }

        default : 
            return {
                ...state
            }
        
    }

}

export default moviesReducer;