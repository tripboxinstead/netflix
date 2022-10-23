let initialState = {    
    loading: true,
    recommendations: {},
}


function movieRelatedReducer (state = initialState,action) {
    let {type,payload} = action;

    switch (type) {

        case "GET_MOVIE_RELATED_SUCCESS":
            return {
                ...state,              
                recommendations : payload.recommendations,  
                loading : false,              
            };
        
        case "GET_MOVIE_RELATED_REQUEST":
             return {
                ...state,                
                loading : true,
            };

       
        case "GET_MOVIES_RELATED_FAILURE" :
            return {
                ...state,
                loading : false
            };

     
        default :
            return {
                ...state
            }


    }
    

}

export default movieRelatedReducer;