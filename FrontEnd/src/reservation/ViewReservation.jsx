import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './ViewReservation.css';


const ViewReservation = (props) => {

    const { url , title} = props;
    // const url = "https://picsum.photos/200";
    const num = false;
    const navStyle={ color:'white'};
    return (

        <>

            <div className='diplayReserved'>
                <img className='reservedMovie' src={url}/>
                <div className='reservedInf'>
                    <h2 className='reservedMovie_Title'>{title}</h2>
                    {/* To be replaced with specific showroom */}
                    <div className='link'>
                        <Link  className='text_link' style={navStyle} to={`/ShowRoom/${title}/${num}`}> 
                            <button type="submit" className="submitBttn_Edit" >Edit Reservation</button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </>
  );
}

export default ViewReservation;