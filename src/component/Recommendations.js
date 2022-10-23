import React from 'react'
import {  Container } from 'react-bootstrap';


const Recommendations = ({ item}) => {


    const imgUrl = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" + item.poster_path

    //console.log("tttt",item)
    //<img src= {imgUrl} width={400} alt="영화" />
   


  return (
    <Container className="recommend-container"> 
       <img src= {imgUrl} width={400} alt={item.original_title} />
       
    </Container>
  )
}

export default Recommendations