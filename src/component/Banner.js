import React from 'react'

const Banner = (movie) => {

    console.log(movie);
    //console.log(movie.movie.poster_path);

  return (
    <div
        className="banner"
        style={{
        backgroundImage:"url(" + `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.movie.poster_path}` + ")",
        // backgroundImage:"url(" + `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/AeyiuQUUs78bPkz18FY3AzNFF8b.jpg` + ")",
        }}
    >
        <div className="banner-info">
            <h1>{movie.movie.title}</h1>
            <p>{movie.movie.overview}</p>
        </div>
    </div>
  )
}

export default Banner