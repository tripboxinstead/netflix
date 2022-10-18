let initialState = {
    popularMovies: {},
    topRateMovies: {},
    upcomingMovies: {},
    genreList: [],
    loading: true,
    details: {},
}


function movieReducer (state = initialState,action) {
    let {type,payload} = action;

    switch (type) {

        case "GET_MOVIE_DETAIL_SUCCESS":
            return {
                ...state,
                details : payload,
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