import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY

function getMovieDetail(props) {


    return async (dispatch) => {

        try {
        
           // dispatch({type:"GET_MOVIE_DETAIL_REQUEST"});

            const details = await api.get(`/movie/${props}?api_key=${API_KEY}&language=en-US`);

            //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

            console.log("디테일", details.data)

            dispatch ( {
                type: "GET_MOVIE_DETAIL_SUCCESS",
                payload :{
                    details: details.data
                }
            });
        }
        catch (error) {
            dispatch({type:"GET_MOVIE_DETAIL_FAILURE"});
        }

    }
};

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
        
    }
};



export const movieAction = {
    getMovies,
    getMovieDetail,
}