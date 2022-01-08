import React, { useState , useEffect, useRef} from 'react';
import { useParams } from 'react-router';
import $ from 'jquery';
import './ShowRoom.css';
import LoginPopup from '../Login/LoginPopup';
import CreditCard from './CreditCard';
import { Link } from 'react-router-dom';


 const ShowRoom = () => {

    const navStyle={ color:'white'};
    const { text } = useParams();
    const { num } = useParams();
    // const [isNum, setNum] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isCreditOpen, setCreditOpen] = useState(false);
    
    const [isLoggedIn, setLoggedIn] = useState(true);
    const [isRoom_2,setRoom_2] = useState(true);
    
    // define ref object
    const renderedElements = useRef({});
    // if(num == 0){
    //     setNum(false);
    // }
    // else{
    //     setNum(true);
    // }
    const idArray=["1","6","11","13","14","15","25","30"];
    var s="screen";
    $('#'+ s).addClass("seat");

    // in initial loading
    // useEffect(() => {
    //     alert('alert');
    //     renderedElements.current[index] = true;
    // }, []);

    useState(() => { for (let i = 0; i < idArray.length; i += 1)
        {
            var idSelector = $('#'+ idArray[i] );
             idSelector.addClass("sold seat");
              console.log("seat"+idArray[i]+" sold");
        } });
      
    const OpenModal = () => {
        console.log("clicked");
        setLoginOpen(true);
        setCreditOpen(true);
        console.log("login",isLoginOpen);
        console.log("credit",isCreditOpen);
    };
    const toggleLoginModal = () => {
        console.log("login");
        setLoginOpen(!isLoginOpen);
      };

      const toggleCreditModal = () => {
        console.log("credit");
        setCreditOpen(!isCreditOpen);
      };



    function select(id){
        console.log("seat");
        id.toggleClass("selected seat seat");
    };

    
    const renderSeat = (id) => {
        let reserved = false;
        for (let i = 0; i < idArray.length; i += 1) {
            if(idArray[i] === id) {
                reserved = true;
            } 
        }
        return ( reserved ?
            <div className="seatSold1" id={id} onClick={()=>select($(`#${id}`))}></div>
            :
            <div className="seat" id={id} onClick={()=>select($(`#${id}`))}></div>
        );
    }

    return (

        
        <>
            <div className='bodyShowRoom'>
            <ul className="showcase">
                    <li>
                    <div className="seat"> </div>
                    <small>Available</small>
                    </li>
                    <li>
                        <div className="selected seat"></div>
                        <small>Selected</small>
                    </li>
                    <li>
                        <div className="sold seat"></div>
                        <small>Reserved</small>
                    </li>
                </ul> 
                <div className="container">
                    <div className="screen"></div>

                   
                    <div className="row">
                    {renderSeat("1")}
                    {renderSeat("2")}
                    {renderSeat("3")}
                    {renderSeat("4")}
                    {renderSeat("5")}

                    </div>
                    
                    
                    <div className="row">
                    {renderSeat("6")}
                    {renderSeat("7")}
                    {renderSeat("8")}
                    {renderSeat("9")}
                    {renderSeat("10")}
                    </div>
                    
                    <div className="row">
                    {renderSeat("11")}
                    {renderSeat("12")}
                    {renderSeat("13")}
                    {renderSeat("14")}
                    {renderSeat("15")}
                    </div>
                    
                    <div className="row">
                    {renderSeat("16")}
                    {renderSeat("17")}
                    {renderSeat("18")}
                    {renderSeat("19")}
                    {renderSeat("20")}       
                    </div>
                    {/* // rows to be added if the room is 30 seats */}
                    {
                    isRoom_2    &&
                        <div>
                            <div className="row">
                            {renderSeat("21")}
                            {renderSeat("22")}
                            {renderSeat("23")}
                            {renderSeat("24")}
                            {renderSeat("25")}     
                            </div>
                            <div className="row">
                            {renderSeat("26")}
                            {renderSeat("27")}
                            {renderSeat("28")}
                            {renderSeat("29")}
                            {renderSeat("30")}       
                            </div>

                        </div>

                    }

                </div>

                {/* condition based on edit or proceed to checkout */}


                {
                    num &&
                    <button className="reserve" onClick={OpenModal}>Proceed to checkout</button>
                }

                {
                    !num &&
                    <button className="reserve" onClick={OpenModal}>Edit</button>
                }

                {/* If condition  if yes .. back to movie .. if no .. back to edit page*/}

                    {num ?
                        <Link className='skipLink' style={navStyle} to={`/MoviePage/${text}`}>
                                    <button type="submit" className='backToMovie'>BACK</button>     
                        </Link>
                    :
                         <Link className='skipLink' style={navStyle} to={`/UserMoviesPage/`}>
                         <button type="submit" className='backToMovie'>BACK</button>     
                       </Link>
                    
                    }
            </div>
            
             <main>
                {isLoginOpen && !isLoggedIn && (
                <LoginPopup
                onLoginRequest={toggleLoginModal}
                 />
                 )}
            </main>
                
            <main>
                {isCreditOpen && isLoggedIn && (
                <CreditCard
                onReserveRequest={toggleCreditModal}
                 />
                 )}
            </main>
            
        </>
  );
}

export default ShowRoom;