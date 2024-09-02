import React from "react";
import MovieCard from "./MovieCard";
import { useState,useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies } from '../redux/movie/movieThunks';

function Home() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const movieStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies());
    }
  }, [movieStatus,dispatch,movies]);
  if(movieStatus === 'loading')
    return <div>Loading</div>
  
  else if(movieStatus === 'failed')
    return <div>Failed</div>

  else { 
    // console.log(movies.length);
    // console.log(movies.data);
    return (
    
    <div className="container mx-auto p-0.5">
      <h1 className="text-3xl font-bold mb-4">Movie Watchlist</h1>
      <div className="flex flex-wrap -m-4">
        {movies?.length>0 && movies.map((movie,index) => (
            <MovieCard
              key={index}
              id={movie.id}
              title={movie.title}
              description={movie.description || "No description available"}
            />
        ))}
        {
          movies?.length==0 && <div className="container p-3">No Movies to display</div>
        }
      </div>

    </div>
  );
}
}

export default Home;
