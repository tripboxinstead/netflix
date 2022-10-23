import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieVideoCard from './MovieVideoCard';
import { Button } from 'react-bootstrap';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const MovieVideoSlide = ({videos}) => {
    console.log("MovieVideoSlide",videos)
  return (
    <div>
         
        <Carousel responsive={responsive}>
           { videos.results.map((item,index) => ( 
                
                <MovieVideoCard key={index} item={item} />
           
           ))}
            
        </Carousel>
    </div>
  )
}

export default MovieVideoSlide