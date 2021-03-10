import React, { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/movie-list";
import MovieDetail from "./components/movie-detail";
import MovieForm from "./components/movie-form";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "./hooks/useFetch";
import Loading from './components/loading';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, removeCookie] = useCookies(["mr-token"]);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data]);

  useEffect(() => {
    if (!token["mr-token"]) {
      window.location.href = "/";
    }
  }, [token]);

  const movieClicked = (movie) => (evt) => {
    setEditedMovie(null);
    setSelectedMovie(movie);
  };

  const loadMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const editClicked = (movie) => {
    setSelectedMovie(null);
    setEditedMovie(movie);
  };

  const updatedMovie = (movie) => {
    const newMovies = movies.map((mov) => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    });

    setMovies(newMovies);
  };

  const createdMovie = (movie) => {
    const createdMov = [...movies, movie];
    setMovies(createdMov);
  };

  const createMovie = () => {
    setEditedMovie({ title: "", description: "" });
    setSelectedMovie(null);
  };

  const deletedMov = (movie) => {
    const newMovies = movies.filter((mov) => mov.id !== movie.id);
    setMovies(newMovies);
  };

  const logoutClick = () => {
    setToken();
    removeCookie(["mr-token"]);
  };


  if (loading) return <Loading />
  if (error) return <h1>Error loading movies</h1>
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
        <FontAwesomeIcon
          onClick={logoutClick}
          className="signout"
          icon={faSignOutAlt}
        />
      </header>
      <div className="layout">
        <div>
          <button onClick={createMovie}>Create New Movie</button>
          <MovieList
            movies={movies}
            movieClicked={movieClicked}
            editClicked={editClicked}
            deletedMov={deletedMov}
          />
        </div>
        <MovieDetail movie={selectedMovie} updateMovie={loadMovie} />
        {editedMovie ? (
          <MovieForm
            movie={editedMovie}
            updatedMovie={updatedMovie}
            createdMovie={createdMovie}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
