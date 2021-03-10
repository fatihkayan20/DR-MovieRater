import React from "react";
import {API} from '../api-service';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit, faTrash,faStarHalf } from "@fortawesome/free-solid-svg-icons";
import {useCookies} from 'react-cookie';

function MovieList(props) {
  const [token] = useCookies(['mr-token']);
  const editClicked = (movie) => {
    props.editClicked(movie);
  };

  const deleteClicked = movie => {
    props.deletedMov(movie);
    API.deleteMovie(movie.id,token['mr-token'])
    .catch(err => console.log(err))
}
    
  

  return (
    <div>
      {props.movies &&
        props.movies.map((movie) => {
          return (
            <div className="title" key={movie.id}>
              <div onClick={props.movieClicked(movie)}>
                {" "}
                {movie.title}
                <small className="movie-list-stars">
                  {[...Array(5)].map((e, i) => {
                    return <FontAwesomeIcon  
                    icon={
                        movie.avg_rating < i+1 && movie.avg_rating > i ? faStarHalf : faStar
                        }key={i} 
                        className={movie.avg_rating > i ? 'orange' : ''}
                    />;
                  })}
                </small>
              </div>

              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => editClicked(movie)}
              />
              <FontAwesomeIcon icon={faTrash}  onClick={() => deleteClicked(movie)}/>
            </div>
          );
        })}
    </div>
  );
}

export default MovieList;
