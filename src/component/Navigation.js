import React ,{useState} from 'react'
import {Navbar , Container, Form, Button , Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { movieAction } from './../redux/actions/movieAction';
import { useNavigate } from 'react-router-dom';



const Navigation = () => {

    const [keyWord, setKeyWord] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        
        console.log("ggg",keyWord);
    //     dispatch("SEARCH_MOVIES");
        dispatch(movieAction.searchMovies(1,keyWord));

        navigate('/Movies');
    }


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
            <img width={100} 
                 src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/movies" className="nav-item">Movies</Link>
           
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(event) => setKeyWord(event.target.value)}
            />
            <Button variant="outline-danger" onClick={handleSearch}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

}

export default Navigation