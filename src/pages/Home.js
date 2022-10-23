import React, { useEffect  } from 'react'
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch ,useSelector } from "react-redux";
import Banner from './../component/Banner';
import MovieSlide from './../component/MovieSlide';
import ClipLoader from "react-spinners/ClipLoader";


const Home = () => {
    
    const dispatch = useDispatch();
    const {popularMovies,topRateMovies,upcomingMovies,loading} = useSelector(state => state.movie );

    useEffect(() => {

       // if (popularMovies) return;

        dispatch(movieAction.getMovies());     
        
    },[]);

    if (loading) {
        return   <ClipLoader color="#ffffff" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/> 
    }

  return (
    <div>   

        <Banner movie={popularMovies.results[10]} />

        <h1>Popular Movie</h1>
        <MovieSlide movies={popularMovies}/>

        <h1>Top rated Movie</h1>
        <MovieSlide movies={topRateMovies}/>

        <h1>Upcoming Movie</h1>
        <MovieSlide movies={upcomingMovies}/>
    </div>
  )
}

export default Home