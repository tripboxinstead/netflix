import React  from 'react'
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

const MoviesList = ({ item}) => {

    const {genreList} = useSelector(state => state.movie);
    const imgUrl = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" + item.poster_path

  return (

    <Container className="recommend-container"> 
     
    <div
        className="movie-poster"
        style={{
        backgroundImage:"url(" + `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${item.poster_path}` + ")",
        // backgroundImage:"url(" + `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/AeyiuQUUs78bPkz18FY3AzNFF8b.jpg` + ")",
        }}
    >

        <div className="movie-info">
            <div className="movies-info">
                <img src= {imgUrl} width={50} height={60} alt={item.original_title} />
                <h4>{item.original_title}</h4>
            </div>
            
            <div>{item.genre_ids.map((id,index) => (<Badge key={index} bg="danger">{genreList.find(item => item.id === id).name}</Badge>))}</div>
            <h6>{item.overview}</h6>
        </div>       
    </div>
   
    </Container>
  )
}

export default MoviesList