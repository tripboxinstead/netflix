import React , {useEffect} from 'react';
import Badge from 'react-bootstrap/Badge';
import { useParams } from 'react-router-dom';
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch ,useSelector } from "react-redux";

const MovieDetail = () => {

    const dispatch = useDispatch();
    //const {details} = useSelector(state => state.movie.details);
    const {details} = useSelector(state => state.movie.details );
    const {id} = useParams();

    

    useEffect ( () => {
        
        dispatch(movieAction.getMovieDetail(id));
        
        console.log("dd",details);
    },[]);

    

  return (
    <div className='detail'>
            
        <div 
            className='poster'        
            style={{
                backgroundImage:
                    "url(" + 
                    `https://themoviedb.org/t/p/w355_and_h200_multi_faces${details.poster_path}` + 
                    ")", 
            }}
        >
        </div>       
        
        <div>
            <div>
                <Badge bg="danger">Action</Badge>
                <Badge bg="danger">Action</Badge>
                <Badge bg="danger">Action</Badge>
                <Badge bg="danger">Action</Badge>
            </div>
            <h1>SONIC THE HEDGEHOG 2</h1>
            <h4>Welcome to the next level.</h4>
        </div>

    </div>
  )
}

export default MovieDetail