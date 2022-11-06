import React , {useEffect ,useState} from 'react';
import Badge from 'react-bootstrap/Badge';
import { useParams } from 'react-router-dom';
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch ,useSelector } from "react-redux";
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ClipLoader from "react-spinners/ClipLoader";
import MovieReview from './../component/MovieReview';
import Recommendations from '../component/Recommendations.js';
import GridSystem from './../component/GridSystem';
import MovieVideoPopup from '../component/MovieVideoPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons'


const MovieDetail = () => {

    const [movieTitle, setMovieTitle] = useState('');
    const [show, setShow] = useState(false);
    const [tabPosition, setTabPosition] = useState('review');
    const dispatch = useDispatch();    
    const {movie_id} = useParams();
    const {details,loading,recommendations,reviews} = useSelector(state => state.movieDetail );
    //const {recommendations } = useSelector(state => state.movieRelated);
   // const {reviews} = useSelector(state => state.movieReview );

    
    const getReviews = async (e) => {
        e.preventDefault();        
        await dispatch(movieAction.getMoivieReviews(movie_id));
        setTabPosition('review');
    }

    const handleRelatedMovies = async (e) => {
        e.preventDefault();     
        await dispatch(movieAction.getMoivieRelated(movie_id));
        setTabPosition('related');

        //console.log("re",recommendations.results);
    }

    const handleVideoModal = (e) => {
        e.preventDefault();   
        setMovieTitle(e.target.dataset.title)
        setShow(true);  
    }

    const handleVideoPopupClose = (e) => {
        //e.preventDefault();   
        setShow(false);
    }

    useEffect (  () => {
                
         dispatch(movieAction.getMovieDetail(movie_id));

         console.log("details",details)
        
               
    },[movie_id]);

    if (loading) {
        return   <ClipLoader color="#ffffff" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/> 
    }


  return (
    <Container className='detail-container'>
        <Row className="justify-content-md-center">
            <Col lg={5}>
              
                <div 
                    className='poster'                         
                    style={{
                        backgroundImage:
                            "url(" + 
                            // `https://themoviedb.org/t/p/w355_and_h200_multi_faces${details.poster_path}` + 
                            `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${details.poster_path}` + 
                            ")", 
                    }}
                >
                </div>    
            </Col>
            <Col lg={1}>
            </Col>
            <Col lg={6}>

                <div>
                    {details.genres.map((item,index) => ( <Badge key={index} className="detail-genres" bg="danger">{item.name}</Badge>))}
                </div>              
                <h1>{details.original_title}</h1>
                <h4>Welcome to the next level.</h4>

                <div className='vote-container'>
                    <div className='vote-item'><FontAwesomeIcon icon={ faStar} /> <div className='vote-value'>{details.vote_average}</div></div> 
                    <div className='vote-item'><FontAwesomeIcon icon={ faUser} /> <div className='vote-value'>{details.vote_count}</div></div> 
                </div>
                    
                <hr/>

                <div>
                    <p>{details.overview}</p>
                </div>

                <div className='detail-property-wrap'>
                    <Badge  bg="danger"> <div className="detail-property">Budget</div></Badge> 
                    <div className="detail-property-value">{details.budget}</div>            
                </div>

                <div className='detail-property-wrap'>
                    <Badge  bg="danger"> <div className="detail-property">Revenue</div></Badge> 
                    <div className="detail-property-value">{details.revenue}</div> 
                </div>

                <div className='detail-property-wrap'>
                    <Badge  bg="danger"> <div className="detail-property">Release Day</div></Badge> 
                    <div className="detail-property-value">{details.release_date}</div>               
                </div>

                <div className='detail-property-wrap'>
                    <Badge  bg="danger"> <div className="detail-property">Time</div></Badge>    
                    <div className="detail-property-value">{details.runtime}</div>             
                </div>

                <hr/>

                <div className="trailer-container" onClick={handleVideoModal} data-title={details.original_title} >Watch Trailer</div>
               
            </Col>
        </Row>

        <div className="detail-review-wrap">

            <div className="detail-review-button">
                <div className="detail-review-button">
                    <Button variant={tabPosition === "review" ? "danger" : "secondary"} onClick={getReviews}>REVIEWS ({reviews.total_results})</Button>
                </div>

                <div className="detail-review-button">
                    <Button variant={tabPosition !== "review" ? "danger" : "secondary"} onClick={handleRelatedMovies} >RELATED MOVIES ({recommendations.total_results})</Button>
                </div>
            </div>

        </div>

        { tabPosition === "review" ? 
            <div className="detail-review-list"> {reviews.results.map((item,index) =>  ( <MovieReview key={index} colCount={2} item = {item} index = {index} />) )}</div> 
            : 
            <div className="detail-review-list"> 

                <GridSystem colCount={2} md = {6} >
                    {recommendations.results.length > 0 ? recommendations.results.map( (item,index) => <Recommendations key={index} item={item} /> ) : [<p>no image</p>] }
                
                </GridSystem>
                
            </div>
            
        }

       <MovieVideoPopup show={show} handleVideoPopupClose={handleVideoPopupClose} movieId={movie_id} movieTitle={movieTitle} />
       
        

    </Container>

  )
}

export default MovieDetail