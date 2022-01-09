import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useParams } from "react-router";
import $ from "jquery";
import "./MoviePage.css";
import EditMovie from "../managerFeatures/EditMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faPen } from "@fortawesome/free-solid-svg-icons";
import { GetMoviebyTitle } from "../service/movieServices";

import { Link } from "react-router-dom";

const MoviePage = () => {
  const navStyle = { color: "white" };
  const [image, setImages] = useState();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [defined,setDefined]=useState(false);
  const toggleEditModal = () => {
    console.log("edit");
    setEditModalOpen(!isEditModalOpen);
  };
  const pen = <FontAwesomeIcon icon={faPen} color="White" size="2x" />;
  // const path=queryString.parse(this.props.location.pathname);
  // const path = props.location.pathname;
  // var index = path.split('/');
  // const movieTitle= index[2];
  // const isUser=index[3];
  const { text } = useParams();
  const num = true;
  // const url = "https://picsum.photos/id/2/200/300";
  const url = "https://picsum.photos/200";

  function show() {
    $(".PopUp_Edit").addClass("active");
  }
var def=false;
  useEffect(() => {
    //get user photos
    console.log("Entering the useEffect");

    GetMoviebyTitle(text).then((response) => {
      console.log("The response is ");
      if(response)
      {
          def=true;
          setImages(response.data);
      }
      else{
        def=false;
      }
      console.log("def=",defined);
      console.log(response);
      setDefined(def);
    });
  }, []);
  
  //   var photo;
  //   useState(() => {
  //     console.log("Entering the useEffect");
  //     GetMoviebyTitle(text).then((response) => {
  //       console.log("The response is ");
  //       photo = response.data;
  //       console.log(response);
  //     });
  //   });
 
  console.log({
    "image: ": image,
  });
  return (
    <>
      <div className="movieInfo">
        {defined &&<img className="moviePoster" src={image[0].posterImage} />}
        <div className="movieText">
            {defined && <h1 className="movieName">{image[0].title} </h1>}
          {/* <h1 className="movieName"> Happy </h1> */}
          <br />
          <br />
          
          {defined && <h2 className="movieDate">Movie Date : {image[0].date}</h2>}
          {/* <h2 className="movieDate"> 12/12/2020</h2> */}
          <br />
          {defined &&<h2 className="movieDate">Start Time : {image[0].start}</h2>}
          {/* <h2 className="movieDate"> 5 Pm</h2> */}
          <br />
          {defined &&<h2 className="movieDate"> Room number : {image[0].roomNumber} </h2>}
          <br />
          <div className="popcorn"></div>
          <main className="main_edit">
            {isEditModalOpen && (
              <EditMovie onEditRequest={toggleEditModal} title={text} />
            )}
          </main>

          {/* Based on selected movie*/}
          <Link
            className="skipLink"
            style={navStyle}
            to={`/ShowRoom/${text}/${num}`}
          >
            <button type="submit" className="bookSeat">
              BOOK YOUR SEAT NOW !!
            </button>
          </Link>

          <Link className="skipLink" style={navStyle} to={`/`}>
            <button type="submit" className="backButton_movie">
              BACK
            </button>
          </Link>
        </div>
        <div className="editInfo" onClick={toggleEditModal}>
          {pen}
        </div>
      </div>
    </>
  );
};

export default MoviePage;
