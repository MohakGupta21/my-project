import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Star from '../svgs/Star';
import EmptyStar from '../svgs/EmptyStar';
import { fetchMovies, updateMovie } from '../redux/movie/movieThunks';

const Edit = () => {
  const params = useParams();
  const stars = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movies, status } = useSelector((state) => state.movies);
  const movie = movies.find((movie) => movie.id === parseInt(params.id));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [watched, setWatched] = useState(false);
  const [release_year, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }

    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setWatched(movie.watched);
      setReleaseYear(movie.release_year);
      setGenre(movie.genre);
      setRating(movie.rating);
      setReview(movie.review);
    }
  }, [status, dispatch, movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMovie({ id: parseInt(params.id), title, description, watched, release_year, genre, rating, review }))
      .then((res) => {
        console.log(res);
        alert('Movie Updated Successfully!');
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            rows={4}
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="watched" className="block text-gray-700 text-sm font-bold mb-2">
            Watched
          </label>
          <input
            type="checkbox"
            id="watched"
            checked={watched}
            onChange={(e) => setWatched(e.target.checked)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="release_year" className="block text-gray-700 text-sm font-bold mb-2">
            Release Year
          </label>
          <input
            type="text"
            id="release_year"
            value={release_year}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <div className="flex items-center">
            {stars.map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className="star text-yellow-500 cursor-pointer"
              >
                {star <= rating ? <Star /> : <EmptyStar />}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="review" className="block text-gray-700 text-sm font-bold mb-2">
            Review
          </label>
          <textarea
            rows="4"
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
