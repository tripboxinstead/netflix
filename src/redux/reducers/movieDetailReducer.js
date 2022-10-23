let initialState = {    
    genreList: [],
    loading: true,
    details: {},
    reviews: [],
    recommendations:[],
}


function movieDetailReducer (state = initialState,action) {
    let {type,payload} = action;

    switch (type) {

        case "GET_MOVIE_DETAIL_SUCCESS":
            return {
                ...state,              
                details : payload.details,  
                genreList : payload.genreList,
                loading : false,       
                reviews : payload.reviews,    
                recommendations : payload.recommendations,         
            };
        
        case "GET_MOVIE_DETAIL_REQUEST":
             return {
                ...state,                
                loading : true,
            };

       
        case "GET_MOVIES_DETAIL_FAILURE" :
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

export default movieDetailReducer;