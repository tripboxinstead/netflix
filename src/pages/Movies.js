import React , {useEffect,useState} from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap';
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch ,useSelector } from "react-redux";
import GridSystem from './../component/GridSystem';
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "react-js-pagination";
import MoviesList from './../component/MoviesList';


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
    <Container fluid>

        <div class="container"> 
            <div class="row"> 
                <div class="col">
                    <Button variant="dark" className="col-button" >Sort</Button>
                    <Button variant="dark" className="col-button" >Filter</Button>
                </div>
                <div class="col">
                    <Row>
                    <GridSystem colCount={2}  >
                            {popularMovies.results.length > 0 ? popularMovies.results.map( (item,index) => <MoviesList key={index} item={item} /> ) : [<p>no image</p>] }
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
                    </Row>
                </div>
                
            </div> 
        </div>

        
    </Container>
  )
}

export default Movies