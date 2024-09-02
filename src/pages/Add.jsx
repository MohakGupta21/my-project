import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Star from "../svgs/Star";
import EmptyStar from "../svgs/EmptyStar";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, fetchMovies } from "../redux/movie/movieThunks";

function Add() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [watched, setWatched] = useState(false);
  const [release_year, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const stars = [1, 2, 3, 4, 5];

  const dispatch = useDispatch();

  const { movies, status } = useSelector((state) => state.movies);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchMovies());
    }

    setId(String(parseInt(movies[movies.length-1]?.id)+1));

  }, [status, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hey");
    dispatch(
      addMovie({
        id: id,
        title,
        description,
        watched,
        release_year,
        genre,
        rating,
        review
      })
    )
      .then(() => {
        alert("Movie Added Successfully!");
        dispatch(fetchMovies());//To Update
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add Movie
      </h2>
      <form action="/" method="POST" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Movie Title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Description
          </label>
          <textarea
            rows="4"
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="watched"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Watched
          </label>
          <input
            type="checkbox"
            id="watched"
            name="watched"
            value={watched}
            onChange={(e) => setWatched(e.target.checked)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="release_year"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Release Year
          </label>
          <input
            type="text"
            id="release_year"
            name="release_year"
            value={release_year}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Realease Year"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Genre"
            required
          />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <div className="flex items-center">
            {stars.map((star, index) => (
              <span
                onClick={() => {
                  setRating(star);
                }}
                key={index}
                htmlFor={`star${index}`}
                className="star text-yellow-500 cursor-pointer"
              >
                {star <= rating ? <Star /> : <EmptyStar />}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="review"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Review
          </label>
          <textarea
            rows="4"
            type="text"
            id="review"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Review"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
