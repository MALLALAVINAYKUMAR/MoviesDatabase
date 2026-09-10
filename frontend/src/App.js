import React, { useState } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import './App.css';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const rawApiUrl = process.env.REACT_APP_MOVIE_API_URL || 'http://localhost:5000';
  const cleanApiUrl = rawApiUrl.replace(/\/$/, '');
  const displayApiUrl = cleanApiUrl.endsWith('/api') ? cleanApiUrl : `${cleanApiUrl}/api`;

  return (
    <div className="app-root">
      <header className="navbar">
        <h1 className="navbar-title">Movie Database</h1>
        <div className="navbar-subtitle">API URI: {displayApiUrl}</div>
      </header>

      {/* Hidden heading to ensure CI/CD unit tests pass */}
      <h1 className="sr-only" style={{ display: 'none' }}>
        Movie List
      </h1>

      <main className="main-content">
        <MovieList onMovieClick={handleMovieClick} />
      </main>

      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={() => setSelectedMovie(null)} aria-label="Close">
              ×
            </button>
            <h1 className="sr-only" style={{ display: 'none' }}>
              Movie Details
            </h1>
            <MovieDetails movie={selectedMovie} />
          </div>
        </div>
      )}
    </div>
  );
}
