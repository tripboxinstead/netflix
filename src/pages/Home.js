import React, { useEffect } from 'react'
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch ,useSelector } from "react-redux";

const Home = () => {

    const dispatch = useDispatch();
    const {popularMovies,topRateMovies,upcomingMovies} = useSelector(state => state.movie );

    
    useEffect(() => {

        dispatch(movieAction.getMovies());     

    },[])

  return (
    <div>Home</div>
  )
}

export default Home