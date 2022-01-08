import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './UserMoviesPage.css';
import SideBar from '../home/SideBar';
import ViewReservation from './ViewReservation';
import { GetUserMovies } from "../service/seatServices";

const UserMoviesPage = () => {

    // const [images, setImages] = useState([{ posterImage: 'https://picsum.photos/id/237/200/300',title:"image1" },
    // { posterImage: 'https://picsum.photos/200',title:"image2"},
    //  { posterImage: 'https://picsum.photos/seed/picsum/200/300',title:"image3" },
    //   { posterImage: 'https://picsum.photos/200/300?grayscale',title:"image4" }, 
    //   { posterImage: 'https://picsum.photos/seed/picsum/200/300',title:"image5"  },
    //    { posterImage: 'https://picsum.photos/seed/picsum/200/300',title:"image6"  }]);

    const [images, setImages] = useState([]);

    useEffect(() => {
        //get user photos
        GetUserMovies().then((response) => {
          console.log(response.data);
          setImages(response.data);
        });
      }, []);


    return (

        <>
             <SideBar/>
            <div className='topDiv'>
              {/* <SearchBar/> */}
            </div>
            <div className='container_reserved'>
                <div className='disp_reser_div'>
                    { images!=undefined&&images.map((image) => (
                    <ViewReservation
                    url={image.posterImage}
                    title={image.title} /> )) }

                </div>

            </div>
            
        </>
  );
}

export default UserMoviesPage;