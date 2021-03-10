import React, {useState,useEffect} from 'react';
import {API} from '../api-service';
import {useCookies} from 'react-cookie';


function MovieForm(props) {
    const mov = props.movie;
    const [title, setTitle]= useState('')
    const [description, setDescription]= useState('')
    const [token] = useCookies(['mr-token']);

    useEffect (() => {
        setTitle(mov.title)
        setDescription(mov.description)
    }, [mov])
    
    const updateClicked = () => {
        API.updateMovie(mov.id,{title,description},token['mr-token'])
        .then(res => props.updatedMovie(res)) 
        .catch(err => console.log(err))
    }

    const createClicked = () => {
        setTitle('');
        setDescription('');
        API.createMovie({title,description},token['mr-token'])
        .then(res => props.createdMovie(res)) 
        .catch(err => console.log(err))
    }

    return(
        <React.Fragment>
        {mov ?
            (
                <div>
                    <label htmlFor="title">Title*</label>
                    <input type="text" name="title" placeholder='Title' required value={title} 
                        onChange={evt => setTitle(evt.target.value)}
                    />
                    <label htmlFor="description">Description*</label>
                    <textarea type="text" name="description" placeholder='description' required value={description}
                        onChange={evt => setDescription(evt.target.value)}
                     />
                    
                    {props.movie.id ?
                        <button onClick={updateClicked}>Update</button>  :
                        <button onClick={createClicked}>Create</button>  

                    }
                     
                </div>
                
            ): null
        }
    </React.Fragment>
    )
}

export default MovieForm;