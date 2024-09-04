import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = "https://project-data-1-ij9s.onrender.com";
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(`${API}/movies`);
  // console.log(response);
  return response.data;
});

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async (movie) => {
    console.log(movie);
    try {
      const response = await axios.put(`${API}/movies/${movie.id}`, movie);
      console.log(response);
      alert("Movie updated successfully!");
      return response.data;
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
      return error.response?.data?.message || "Something went wrong";
    }
  }
);

export const addMovie = createAsyncThunk("movies/addMovie", async (movie) => {
  const response = await axios.post(`${API}/movies`, movie);
  return response.data;
});

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id) => {
    try {
      const response = await axios.delete(`${API}/movies/${id}`);
      alert('Movie Deleted Successfully!');
      return response.data;
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
      return error.response?.data?.message || "Something went wrong";
    }
  }
);
