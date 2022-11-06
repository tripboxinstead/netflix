import React , {useEffect,useState} from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap';
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch ,useSelector } from "react-redux";
import GridSystem from './../component/GridSystem';
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "react-js-pagination";
import MoviesList from './../component/MoviesList';
import Dropdown from 'react-bootstrap/Dropdown';
import InputRange from 'react-input-range';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Badge from 'react-bootstrap/Badge';

const Movies = () => {

    const dispatch = useDispatch();
    const [Genre, setGenre] = useState(0);
    const [activePage, setActivePage] = useState(1)
    const [year, setYear] = useState({min: 1900,max:2050})
    const {loading} = useSelector(state => state.movie)
    const popularMovies = useSelector(state => state.movie.popularMovies)
    // const genreList = useSelector(state => state.movie.genreList)
    const genreList = useSelector(state => state.movieDetail.genreList);
    const [moviesSort, setMoviesSort] = useState('asc')

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const handleFilter = async (event) => {
        event.preventDefault();
        await dispatch(movieAction.searchMovies(1,"bb"));
        console.log("ggg",popularMovies);
    }

    const handleSortDesc = (e) => {
        //popularMovies = popularMovies.results.sort((a,b) =>  b[popularMovies.results.original_title] - a[popularMovies.results.original_title]);
        e.preventDefault();
        if (moviesSort === "desc") {
            setMoviesSort("asc");
        } else {
            setMoviesSort("desc");
        }
    }

    const handleYearFilter = (value) => {
        setYear(value);
    }

    const handleGenresFilter = (event) => {
        setGenre(parseInt(event.target.dataset.id));
    }

    useEffect (() => {
      
        dispatch(movieAction.getMoviesPopular(activePage));
        dispatch(movieAction.getGenreList());
      
    }, [activePage]);

    if (loading) {
        return   <ClipLoader color="#ffffff" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/> 
    }

    console.log("123",popularMovies);
    console.log("333",genreList)


  return (
    <Container fluid>

        <div class="container"> 
            <div class="row"> 
                <div class="col"   >
                    
                    <br/>

                    <Dropdown>
                  
                        <Dropdown.Toggle   variant="dark" id="dropdown-basic" className='dropdown-menu-button'>
                            SORT
                        </Dropdown.Toggle>
                    
                    
                        <Dropdown.Menu className='dropdown-menu-sort' variant="dark">
                            <Dropdown.Divider variant="dark" />
                            <Dropdown.Header variant="dark" >
                                Sort Results By
                            </Dropdown.Header>
                            <Dropdown.Item onClick={handleSortDesc} variant="dark">
                                <Dropdown.Header>
                                    Sort By
                                </Dropdown.Header>
                                <Dropdown.Header>
                                    Popularity({moviesSort === 'asc' ? 'Desc' : 'Asc'})
                                    </Dropdown.Header>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <br/>

                    <Dropdown >
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className='dropdown-menu-button'>
                            YEAR FILTER
                        </Dropdown.Toggle>
                      
                        <Dropdown.Menu variant="dark"  className='dropdown-menu-filter' >
                            <Dropdown.Divider />
                            <Dropdown.Header  >
                                 YEAR Filter
                            </Dropdown.Header>
                            <br/>
                            <Dropdown.Header  >
                                <InputRange
                                    maxValue={2050}
                                    minValue={1900}
                                    value={year}
                                    onChange={ handleYearFilter } 
                                />
                             </Dropdown.Header>
                            
                        </Dropdown.Menu>
                    </Dropdown>

                    <br/>

                   
                        <Dropdown >
                            <Dropdown.Toggle variant="dark" id="dropdown-basic" className='dropdown-menu-button'>
                                GENRES FILTER
                            </Dropdown.Toggle>
                        
                            <Dropdown.Menu variant="dark"  className='dropdown-menu-genres-filter' >
                            
                            
                                <Dropdown.Header  >
                                    Genres Filter
                                </Dropdown.Header>
                                <Dropdown.Divider />
                                <Button className="genres-button"   variant="danger" data-id={0} onClick={handleGenresFilter}>ALL</Button> 
                                {genreList &&  <div>{genreList.map((item,index) => (<Button className="genres-button"  key={index} variant="danger" data-id={item.id} onClick={handleGenresFilter}>{item.name}</Button> ))} </div> }
                            
                            </Dropdown.Menu>
                        </Dropdown>
                    

                  
                   
                  
               
                </div>
               
                <div class="col">
                    <Row>
                    
                    { 
                       
                        (moviesSort == 'desc'  && Genre == '')  &&
                           
                            <GridSystem colCount={2} >
                            {
                                popularMovies.results.length > 0 ? 
                                popularMovies.results.sort((a,b) =>  {
                                    return b.popularity - a.popularity ;
                                }).filter(item => item.release_date.substring(0,4) <= year.max && item.release_date.substring(0,4) >= year.min 
                                ).map( (item,index) => <MoviesList key={index} item={item} /> ) : [<p>no image</p>] 
                            }
                            </GridSystem>
                    }

                    { 
                       
                       (moviesSort == 'desc' && Genre !== 0) &&
                          
                           <GridSystem colCount={2} >
                           {
                               popularMovies.results.length > 0 ? 
                               popularMovies.results.sort((a,b) =>  {
                                   return b.popularity - a.popularity ;
                                }).filter(item => item.release_date.substring(0,4) <= year.max && item.release_date.substring(0,4) >= year.min   && item.genre_ids.indexOf(Genre) !== -1
                                ).map( (item,index) => <MoviesList key={index} item={item} /> ) : [<p>no image</p>] 
                           }
                           </GridSystem>
                    }

                    { 
                        
                        (moviesSort == 'asc' && Genre == '' )&&
                            <GridSystem colCount={2} >

                            {
                                  popularMovies.results.length > 0 ? 
                                  popularMovies.results.sort((a,b) =>  {
                                        return a.popularity - b.popularity; 
                                  }).filter(item => item.release_date.substring(0,4) <= year.max && item.release_date.substring(0,4) >= year.min 
                                  ).map( (item,index) => <MoviesList key={index} item={item} /> ) : [<p>no image</p>] 
                            }
                            </GridSystem>
                    }

                    { 
                        
                        (moviesSort == 'asc' && Genre !== 0 )&&
                            <GridSystem colCount={2} >

                            {
                                  popularMovies.results.length > 0 ? 
                                  popularMovies.results.sort((a,b) =>  {
                                        return a.popularity - b.popularity; 
                                  }).filter(item => item.release_date.substring(0,4) <= year.max && item.release_date.substring(0,4) >= year.min && item.genre_ids.indexOf(Genre) !== -1
                                  ).map( (item,index) => <MoviesList key={index} item={item} /> ) : [<p>no image</p>] 
                            }
                            </GridSystem>
                    }
                   
                    
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={activePage}
                        itemsCountPerPage={20}
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