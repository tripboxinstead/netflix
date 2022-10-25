import React , {useEffect,useState} from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap';
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch ,useSelector } from "react-redux";
import GridSystem from './../component/GridSystem';
import Recommendations from './../component/Recommendations';
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "react-js-pagination";


const Movies = () => {

    const dispatch = useDispatch();
    const [activePage, setActivePage] = useState(1)
    const {popularMovies,loading} = useSelector(state => state.movie)

    const handlePageChange = (pageNumber) => {
        
        setActivePage(pageNumber);
        //console.log(`active page is ${e}`);
       // this.setState({activePage: pageNumber});
    };

    useEffect (() => {
      
        dispatch(movieAction.getMoviesPopular(activePage));
      
    }, [activePage]);

    if (loading) {
        return   <ClipLoader color="#ffffff" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/> 
    }

    console.log("123",popularMovies);
    


  return (
    <Container>
        <Row >
           
            <Col md="2"></Col>
            <Col md={"2"} className="col-movies-filter">
                <Row>
                    <Button variant="dark" className="col-button" >Sort</Button>
                </Row>
                <Row>
                    <Button variant="dark" className="col-button" >Sort</Button>
                </Row>
            </Col>        
            <Col md="1"></Col>
            <Col className="col-movies-list" md="6">
                <GridSystem colCount={2} md = {6} >
                        {popularMovies.results.length > 0 ? popularMovies.results.map( (item,index) => <Recommendations key={index} item={item} /> ) : [<p>no image</p>] }
                    
                </GridSystem>

                <Pagination
                itemClass="page-item"
                linkClass="page-link"
                    activePage={activePage}
                    itemsCountPerPage={popularMovies.total_pages}
                    totalItemsCount={popularMovies.total_results}
                    pageRangeDisplayed={20}
                    onChange={handlePageChange}
                    />
            </Col>        
        </Row>
    </Container>
  )
}

export default Movies