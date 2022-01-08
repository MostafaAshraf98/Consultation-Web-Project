import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ImageFilmHome.css'

// function ImageFilmHome() {
    const ImageFilmHome = (props) => {

        // const url = "https://picsum.photos/id/1/200/300";
        const navStyle={ color:'white'};
        const { url , title} = props;

    return (

        <> 
        <div className="column_adj">
            <Link  style={navStyle} to={`/MoviePage/${props.title}`}>
                <img className="img-responsive" id="content" src={url}/>
            </Link>    
        </div>
                {/* <Link  style={navStyle} to={`/AlbumPage/${props.id}/${isUser}`}>
                    <button id="open-button" >{open}</button>
                 </Link> */}

        </>
  );
}

export default ImageFilmHome;