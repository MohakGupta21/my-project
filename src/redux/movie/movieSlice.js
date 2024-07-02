import { createSlice } from '@reduxjs/toolkit';
import { addMovie, deleteMovie, fetchMovies, updateMovie } from './movieThunks';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(addMovie.fulfilled,(state,action)=>{
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.movies.splice(index,1);
        }
      });
  }
});

export default movieSlice.reducer;
