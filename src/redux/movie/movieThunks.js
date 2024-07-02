import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get('http://localhost:3000/movies');
  return response.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async (movie) => {
  const response = await axios.put(`http://localhost:3000/movies/${movie.id}`, movie);
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movie) => {
  const response = await axios.post(`http://localhost:3000/movies`, movie);
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  const response = await axios.delete(`http://localhost:3000/movies/${id}`);
  return response.data;
});
