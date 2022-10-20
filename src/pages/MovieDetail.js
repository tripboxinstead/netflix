import React , {useEffect} from 'react';
import Badge from 'react-bootstrap/Badge';
import { useParams } from 'react-router-dom';
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch ,useSelector } from "react-redux";
import { Col, Container, Row } from 'react-bootstrap';
import ClipLoader from "react-spinners/ClipLoader";

const MovieDetail = () => {

    const dispatch = useDispatch();
    //const {details} = useSelector(state => state.movie.details);
    // const {details,loading} = useSelector(state => state.movie.details );
    const {details,loading,genreList} = useSelector(state => state.movie );
    const {movie_id} = useParams();

    useEffect ( () => {
        
        dispatch(movieAction.getMovieDetail(movie_id));
        
       
    },[]);

    if (loading) {
        return   <ClipLoader color="#ffffff" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/> 
    }

    console.log("details",details);
    console.log("genreList",genreList);
    console.log("tt",details.genres);

  return (
    <Container className='detail-container'>
        <Row className="justify-content-md-center">
            <Col lg={3}>
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
            </Col>
            <Col lg={1}>
            </Col>
            <Col lg={3}>

                <div>
                    {details.genres.map((item) => ( <Badge className="detail-genres" bg="danger">{item.name}</Badge>))}
                </div>              
                <h1>SONIC THE HEDGEHOG 2</h1>
                <h4>Welcome to the next level.</h4>

                <div>
                    <div>{details.vote_average}</div>
                    <div>{details.vote_count}</div>
                </div>
                

                
               
            </Col>
        </Row>


    </Container>
    // <div className='detail'>
            
    //     <div 
    //         className='poster'        
    //         style={{
    //             backgroundImage:
    //                 "url(" + 
    //                 `https://themoviedb.org/t/p/w355_and_h200_multi_faces${details.poster_path}` + 
    //                 ")", 
    //         }}
    //     >
    //     </div>       
        
    //     <div>
    //         <div>
    //             <Badge bg="danger">Action</Badge>
    //             <Badge bg="danger">Action</Badge>
    //             <Badge bg="danger">Action</Badge>
    //             <Badge bg="danger">Action</Badge>
    //         </div>
    //         <h1>SONIC THE HEDGEHOG 2</h1>
    //         <h4>Welcome to the next level.</h4>
    //     </div>

    // </div>
  )
}

export default MovieDetail