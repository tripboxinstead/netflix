import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY

function getMovies() {
    return async (dispatch) => {

        try {

            dispatch({type:"GET_MOVIES_REQUEST"});

            const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

            const topRateApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1'`);

            const upComingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1'`);

            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);

            //동시에 받는다
            let [popularMovies,topRateMovies,upcomingMovies,genreList] = await Promise.all([popularMovieApi,topRateApi,upComingApi,genreApi]);

            dispatch( {
                type : "GET_MOVIES_SUCCESS",
                payload: {
                    popularMovies : popularMovies.data,
                    topRateMovies : topRateMovies.data,
                    upcomingMovies : upcomingMovies.data,
                    genreList : genreList.data.genres,
                }
            });

        } catch(error) {
            //에러 핸들링 하는 곳

            dispatch({type:"GET_MOVIES_FAILURE"});
        }

        
        
        // console.log(popularMovies);
       //  console.log("popular",popularMovies);
        // console.log(upcomingMovies);
    }
};



export const movieAction = {
    getMovies,
}