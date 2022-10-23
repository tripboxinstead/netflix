let initialState = {    
    reviews: [],
    loading: true,    
}


function movieReviewReducer (state = initialState,action) {
    let {type,payload} = action;

    switch (type) {

        case "GET_MOVIE_REVIEWS_SUCCESS":
            return {
                ...state,              
                reviews : payload.reviews,                  
                loading : false,              
            };
        
        case "GET_MOVIE_REVIEWS_REQUEST":
             return {
                ...state,                
                loading : true,
            };

       
        case "GET_MOVIES_REVIEWS_FAILURE" :
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

export default movieReviewReducer;