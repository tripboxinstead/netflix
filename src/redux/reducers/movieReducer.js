let initialState = {
    popularMovies: {},
    topRateMovies: {},
    upcomingMovies: {},
    genreList: [],
    loading: true,
}


function movieReducer (state = initialState,action) {
    let {type,payload} = action;

    switch (type) {

        case "SEARCH_MOVIE_POPULAR_SUCCESS" :
            return {
                ...state,
                popularMovies : payload.popularMovies, 
            }

        case "GET_MOVIE_POPULAR_REQUEST" :
            return {
                ...state,
                loading : true
            };
        
        case "GET_MOVIE_POPULAR_SUCCESS" :
            return {
                ...state,
                popularMovies : payload.popularMovies, 
                loading : false
            };

        case "GET_MOVIE_POPULAR_FAILURE" :
            return {
                ...state,
                loading : false,
            };
       
        case "GET_MOVIES_REQUEST" :
            return {
                ...state,
                loading : true
            };

        case "GET_MOVIES_FAILURE" :
            return {
                ...state,
                loading : false
            };

        case "GET_MOVIES_SUCCESS" :
            return {
                ...state,
                popularMovies : payload.popularMovies, 
                topRateMovies : payload.topRateMovies, 
                upcomingMovies : payload.upcomingMovies ,
                genreList : payload.genreList,
                loading : false,
            };

        default :
            return {
                ...state
            }


    }
    

}

export default movieReducer;