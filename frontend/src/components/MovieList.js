import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const rawApiUrl = process.env.REACT_APP_MOVIE_API_URL || 'http://localhost:5000';
    const baseUrl = rawApiUrl.replace(/\/$/, '');
    const fetchUrl = baseUrl.endsWith('/movies') ? baseUrl : `${baseUrl}/movies`;

    axios
      .get(fetchUrl)
      .then((response) => {
        setMovies(response.data.movies || []);
      })
      .catch((error) => {
        console.error('Failed to fetch movies from', fetchUrl, error);
      });
  }, []);

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div className="movie-card movieItem" key={movie.id} onClick={() => onMovieClick(movie)}>
          <h2 className="movie-card-title">{movie.title}</h2>
          {movie.year && <div className="movie-card-year">{movie.year}</div>}
          {movie.description && <p className="movie-card-description">{movie.description}</p>}
          {movie.rating && (
            <div className="movie-card-rating">
              {movie.rating.startsWith('Rating:') ? movie.rating : `Rating: ${movie.rating}`}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;
