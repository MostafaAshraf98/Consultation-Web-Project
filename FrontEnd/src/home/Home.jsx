import React, { useState, useEffect } from "react";
import "./Home.css";
import ImageFilmHome from "./ImageFilmHome";
import { GetAllMovies } from "../service/movieServices";
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";

function Home() {
  // const images = [{ url: 'https://picsum.photos/id/237/200/300',title:"image1" },
  //  { url: 'https://picsum.photos/200',title:"image2"},
  //   { url: 'https://picsum.photos/seed/picsum/200/300',title:"image3" },
  //    { url: 'https://picsum.photos/200/300?grayscale',title:"image4" },
  //    { url: 'https://picsum.photos/seed/picsum/200/300',title:"image5"  },
  //     { url: 'https://picsum.photos/seed/picsum/200/300',title:"image6"  }];

  // const [images, setImages] = useState([
  //   { posterImage: "https://picsum.photos/id/237/200/300", title: "image1" },
  //   { posterImage: "https://picsum.photos/200", title: "image2" },
  //   {
  //     posterImage: "https://picsum.photos/seed/picsum/200/300",
  //     title: "image3",
  //   },
  //   { posterImage: "https://picsum.photos/200/300?grayscale", title: "image4" },
  //   {
  //     posterImage: "https://picsum.photos/seed/picsum/200/300",
  //     title: "image5",
  //   },
  //   {
  //     posterImage: "https://picsum.photos/seed/picsum/200/300",
  //     title: "image6",
  //   },
  // ]);

  const [images, setImages] = useState([]);

  // HOME RENDERING
  // //Get movies
  useEffect(() => {
    //get user photos
    GetAllMovies().then((response) => {
      console.log(response.data);
      setImages(response.data);
    });
  }, []);

  //----------------------------------- To check with
  //    //get request
  //    useEffect( () =>{
  //     //get user photos
  //     GetAlbumById(album_id).then( response => {
  //         setAlbum(response.data);
  //         //validate  API response
  //         if(album == undefined)
  //         {
  //           setUndefined(true);

  //         }
  //         else{
  //           setUndefined(false);
  //         }
  //     })
  //  },[album])

  return (
    <>
      <SideBar />
      <div className="topDiv">
        <SearchBar onSearchRequest={setImages} />
      </div>
      <div className="container_movies">
        {images != undefined &&
          images.map((image) => (
            <ImageFilmHome url={image.posterImage} title={image.title} />
          ))}
      </div>
    </>
  );
}

export default Home;
