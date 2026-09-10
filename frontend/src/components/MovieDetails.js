import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieDetails({ movie }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!movie || !movie.id) return;
    const rawApiUrl = process.env.REACT_APP_MOVIE_API_URL || 'http://localhost:5000';
    const baseUrl = rawApiUrl.replace(/\/$/, '');
    axios
      .get(`${baseUrl}/movies/${movie.id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((err) => {
        console.error('Failed to fetch movie details:', err);
      });
  }, [movie]);

  const movieData = details?.movie || movie;

  return (
    <div className="movie-detail-view">
      <h2 className="movie-detail-title">{movieData.title}</h2>
      {movieData.year && <div className="movie-detail-year">{movieData.year}</div>}
      {movieData.description && <p className="movie-detail-desc">{movieData.description}</p>}
      {movieData.rating && (
        <div className="movie-detail-rating">
          {movieData.rating.startsWith('Rating:') ? movieData.rating : `Rating: ${movieData.rating}`}
        </div>
      )}
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieDetails;
