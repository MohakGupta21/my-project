import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tick from "../assets/tick.png";
import cross from "../assets/cross.png";
import Star from "../svgs/Star";
import EmptyStar from "../svgs/EmptyStar";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movie/movieThunks";

function Details() {
  const params = useParams();
  const stars = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();
  const movies = useSelector((state)=>state.movies.movies);
  const movieStatus = useSelector((state) => state.movies.status);
  const movie = movies.filter((movie)=>(movie.id===parseInt(params.id)));

  useEffect(()=>{
    if(movieStatus=="idle"){
        dispatch(fetchMovies());
    }
    console.log(movies);
    console.log(movie);
  },[movieStatus,dispatch])

  return (
    <div className="mx-auto p-8">
      <div className="bg-white p-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">{movie[0]?.title}</h1>
            <p className="text-gray-600 mb-4">Release Year: {movie[0]?.release_year}</p>
            <p className="text-gray-600 mb-4">Genre: {movie[0]?.genre}</p>
          </div>
          {movie[0]?.watched ? (
            <div className="flex items-center text-gray-700 px-4 py-2 rounded-lg">
              <img src={tick} alt="tick" width={40} />
              &nbsp; Watched
            </div>
          ) : (
            <div className="flex items-center text-gray-700 px-4 py-2 rounded-lg">
              <img src={cross} alt="cross" width={40} />
              &nbsp; Not Watched
            </div>
          )}
        </div>
        <p className="text-gray-700 mb-6">{movie[0]?.description}</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <div className="flex items-center">
            {stars.map((star, index) => (
              <label
                key={index}
                htmlFor={`star${index}`}
                className="star text-yellow-500 cursor-pointer"
              >
                {star <= movie[0]?.rating ? <Star key={index} /> : <EmptyStar key={index}/>}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          <p
            className="para w-full p-2 border rounded-lg"
            rows="4"
            placeholder="Write your review here..."
          >
            {movie[0]?.review}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;
