import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY


function getGenres() {
    return async (dispatch) => {

        try {

            dispatch({type:"GET_MOVIE_GENRES_REQUEST"});

            const genres = await api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);

            dispatch ( {
                type: "GET_MOVIE_GENRES_SUCCESS",
                payload :{
                    genres: genres.data,                    
                }
            })

        }
        catch(error) {
            dispatch({type:"GET_MOVIE_GENRES_FAILURE"});
        }
    }
}


function getVideos(movie_id) {

    return async (dispatch) => {

        try {
            dispatch({type:"GET_MOVIE_VIDEOS_REQUEST"});
            
            const videos = await api.get(`/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`);

            console.log("videos",videos)

            dispatch ( {
                type: "GET_MOVIE_VIDEOS_SUCCESS",
                payload :{
                    videos: videos.data,                    
                }
            });

        }
        catch (error) {
            dispatch({type:"GET_MOVIE_VIDEOS_FAILURE"});
        }


    }
}

function getMoivieRelated ( movie_id ) {

    return async (dispatch) => {

        try {
            dispatch({type:"GET_MOVIE_RELATED_REQUEST"});

            ///movie/{movie_id}/recommendations
            const recommendations = await api.get(`/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`);

            dispatch ( {
                type: "GET_MOVIE_RELATED_SUCCESS",
                payload :{
                    recommendations: recommendations.data,                    
                }
            });

        }
        catch (error) {
            dispatch({type:"GET_MOVIE_RELATED_FAILURE"});
        }

    }

}


function getMoivieReviews(props) {

    return async (dispatch) => {

        try {
            dispatch({type:"GET_MOVIE_REVIEWS_REQUEST"});

            const reviews = await api.get(`/movie/${props}/reviews?api_key=${API_KEY}&language=en-US&page=1`);

            dispatch ( {
                type: "GET_MOVIE_REVIEWS_SUCCESS",
                payload :{
                    reviews: reviews.data,                    
                }
            });

        }
        catch (error) {
            dispatch({type:"GET_MOVIE_REVIEWS_FAILURE"});
        }

    }

}

function searchMovies(page,keyWord) {

    return async (dispatch) => {

        try {

            //dispatch({type:"SEARCH_MOVIES"});

            const popularMovies = await api.get(`search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${keyWord}`);

            console.log("search",popularMovies)

            dispatch ( {
                type : "SEARCH_MOVIE_POPULAR_SUCCESS",
                payload : {
                    popularMovies : popularMovies.data,
                }
            })

        }
        catch (error) {
            
        }

    }

}

function getMoviesPopular(page) {

    return async (dispatch) => {

        try {

            dispatch({type:"GET_MOVIE_POPULAR_REQUEST"});

            const popularMovies = await api.get(`movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);

            
            dispatch ( {
                type : "GET_MOVIE_POPULAR_SUCCESS",
                payload : {
                    popularMovies : popularMovies.data,
                }
            })

        }
        catch (error) {

            dispatch({type:"GET_MOVIE_POPULAR_FAILURE"});
        }

    }

}

function getMovieDetail(props) {

    return async (dispatch) => {

        try {
        
            dispatch({type:"GET_MOVIE_DETAIL_REQUEST"});

            const detailsApi = api.get(`/movie/${props}?api_key=${API_KEY}&language=en-US`);
            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
            const reviewsApi = api.get(`/movie/${props}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
            const recommendationsApi = api.get(`/movie/${props}/recommendations?api_key=${API_KEY}&language=en-US&page=1`);
        
            let [details,genreList,reviews,recommendations] = await Promise.all([detailsApi,genreApi,reviewsApi,recommendationsApi]);

            dispatch ( {
                type: "GET_MOVIE_DETAIL_SUCCESS",
                payload :{
                    details: details.data,
                    genreList: genreList.data.genres,  
                    reviews: reviews.data,
                    recommendations: recommendations.data,     
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
    getMoivieReviews,
    getMoivieRelated,
    getVideos,
    getMoviesPopular,
    searchMovies,
    getGenres,
}