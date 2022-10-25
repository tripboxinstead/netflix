import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import movieDetailReducer from './movieDetailReducer';
import movieReviewReducer from './movieReviewReducer';
import movieRelatedReducer from './moviewRelatedReducer';
import movieVideoReducer from './movieVideos';
import moviesReducer from './moviesReducer';

export default combineReducers({
    movie: movieReducer,
    movieDetail : movieDetailReducer,
    movieReview : movieReviewReducer,
    movieRelated : movieRelatedReducer,
    movieVideos : movieVideoReducer,
    movies : moviesReducer,
});