import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const MovieCard = ({item}) => {

    const navigate = useNavigate();
    const {genreList} = useSelector(state => state.movie);

    const showDetail = () => {
        navigate(`/Movies/${item.id}`)
    }

  return (
    <div onClick={showDetail}
        className='card-item'
        style={{
            backgroundImage:
                "url(" + 
                `https://themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}` + 
                ")", 
            }}
    >        

        <div className='overlay'>
            <h1>{item.title}</h1>
            <div>{item.genre_ids.map((id,index) => (<Badge key={index} bg="danger">{genreList.find(item => item.id === id).name}</Badge>))}</div>
            <div>
                <span>{item.vote_average}</span>
                <span>{item.adult? "청불" : "Under 18" }</span>
            </div>
        </div>
    
    </div>
  )
}

export default MovieCard