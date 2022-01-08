import React, { useState , useEffect } from 'react';
import queryString from 'query-string';
import { useParams } from 'react-router';
import $ from 'jquery';
import './MoviePage.css';
import EditMovie from '../managerFeatures/EditMovie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{faPen} from '@fortawesome/free-solid-svg-icons'
import {GetMoviebyTitle} from '../service/movieServices'

import { Link } from 'react-router-dom';


const MoviePage = () => {
    const navStyle={ color:'white'};

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const toggleEditModal = () => {
        console.log("edit");
        setEditModalOpen(!isEditModalOpen);
      };
    const pen = <FontAwesomeIcon icon={faPen} color="White" size='2x'/>
    // const path=queryString.parse(this.props.location.pathname);
    // const path = props.location.pathname;
    // var index = path.split('/');
    // const movieTitle= index[2];
    // const isUser=index[3];  
    const { text } = useParams();
    const num = true;
    console.log(text); 
    // const url = "https://picsum.photos/id/2/200/300";
    const url = "https://picsum.photos/200";
    
    function show()
    {
        $(".PopUp_Edit").addClass("active");
    }

      // useEffect( () =>{
  //   //get user photos
  //   GetMoviebyTitle (text).then( response => {
  //     setImages(response.data);
  //   })

  // },[])



    return (

        <>
            <div className='movieInfo'>
                <img className='moviePoster' src={url}/>
                <div className='movieText'>
                    <h1 className='movieName'>Movie Name {text} </h1>
                    <br/>
                    <br/>
                    <h2 className='movieDate'>Tuesday 04/01/2022</h2>
                    <br/>
                    <h2 className='movieDate'>10:00 am</h2>
                    <br/>
                    <h2 className='movieDate'>Room </h2>
                    <br/>
                    <div className='popcorn'>
                    </div>
                    <main className='main_edit'>
                            {isEditModalOpen && (
                            <EditMovie
                            onEditRequest={toggleEditModal}
                            title={text}
                            />
                            )}
                    </main>

                    {/* Based on selected movie*/}
                    <Link className='skipLink' style={navStyle} to={`/ShowRoom/${text}/${num}`}>
                     <button type="submit" className="bookSeat" >BOOK YOUR SEAT NOW !!</button>
                    </Link>

                     <Link className='skipLink' style={navStyle} to={`/`}>
                         <button type="submit" className='backButton_movie'>BACK</button>     
                     </Link>
                </div>
                <div className='editInfo'onClick={toggleEditModal}>
                    {pen}
                </div>

                
            </div>

            
        </>
  );
}

export default MoviePage;