import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = 'https://project-data-1-ij9s.onrender.com'
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(`${API}/movies`);
  console.log(response);
  return response.data.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async (movie) => {
  console.log(movie);
  const response = await axios.put(`${API}/movies/${movie.id}`, movie);
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movie) => {
  const response = await axios.post(`${API}/movies`, movie);
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  const response = await axios.delete(`${API}/movies/${id}`);
  return response.data;
});
