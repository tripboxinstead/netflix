import React from 'react'

const MovieReview = ({index,item}) => {
  console.log(index);
  return (
    <div className="review-wrap">
        
        {index != 0? <hr/> : "" }
        <div> {item.author}</div>
        <p> {item.content}</p>
    </div>
  )
}

export default MovieReview