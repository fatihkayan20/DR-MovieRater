import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import {useCookies} from 'react-cookie';


function MovieDetail(props) {
    let mov = props.movie;
    const [highlighted, setHighlighted] = useState(-1);
    const highligtRate= high => evt => {
        setHighlighted(high);
    }

    const [token] = useCookies(['mr-token']);


    const rateClicked = rate => evt => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mr-token']}`
            },
            body: JSON.stringify ({
                stars: rate+1,
            })
        })
        .then(() => getDetails())
        .catch(err => console.log(err))
    }

    const getDetails = () =>{
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mr-token']}`
            },
        })
        .then(res => res.json())
        .then(res => props.updateMovie(res))
        .catch(err => console.log(err))
    }

    return (
        <React.Fragment>
        {mov ? (
            <div>
            <h1>{mov.title} </h1>
            <p>{mov.description} </p>
            <FontAwesomeIcon
                icon={
                mov.avg_rating < 1 && mov.avg_rating > 0 ? faStarHalf : faStar
                }
                className={mov.avg_rating > 0 ? "orange" : ""}
            />
            <FontAwesomeIcon
                icon={
                mov.avg_rating < 2 && mov.avg_rating > 1 ? faStarHalf : faStar
                }
                className={mov.avg_rating > 1 ? "orange" : ""}
            />
            <FontAwesomeIcon
                icon={
                mov.avg_rating < 3 && mov.avg_rating > 2 ? faStarHalf : faStar
                }
                className={mov.avg_rating > 2 ? "orange" : ""}
            />
            <FontAwesomeIcon
                icon={
                mov.avg_rating < 4 && mov.avg_rating > 3 ? faStarHalf : faStar
                }
                className={mov.avg_rating > 3 ? "orange" : ""}
            />
            <FontAwesomeIcon
                icon={
                mov.avg_rating < 5 && mov.avg_rating > 4 ? faStarHalf : faStar
                }
                className={mov.avg_rating > 4 ? "orange last" : "last"}
            />
            ({mov.no_of_ratings})
            
            
            <div className="rate-container">
                <h2>Rate it</h2>
                {
                    [...Array(5)].map((e,i) => {
                        return(
                            <FontAwesomeIcon
                                icon={faStar}
                                key={i}
                                className={highlighted > i-1 ? "purple" : ""}
                                onMouseEnter={highligtRate(i)}
                                onMouseLeave={highligtRate(-1)}
                                onClick={rateClicked(i)}
                            />
                        )
                    } )
                }

            </div>
            </div>
        ) : null}
        
        </React.Fragment>
    );
}

export default MovieDetail;
