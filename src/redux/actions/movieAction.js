import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY

function getMovies() {
    return async (dispatch) => {

        const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

        const topRateApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1'`);

        const upComingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1'`);

        //동시에 받는다
        let [popularMovies,topRateMovies,upcomingMovies] = await Promise.all([popularMovieApi,topRateApi,upComingApi]);

        dispatch( {
            type : "GET_MOVIES_SUCCESS",
            payload: {
                popularMovies : popularMovies.data,
                topRateMovies : topRateMovies.data,
                upcomingMovies : upcomingMovies.data,
            }
        });
        
        // console.log(popularMovies);
         console.log("top",topRateMovies);
        // console.log(upcomingMovies);
    }
};



export const movieAction = {
    getMovies,
}