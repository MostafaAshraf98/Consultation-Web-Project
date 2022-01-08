import React, { useState , useEffect } from 'react';

import $ from 'jquery';
import './CreditCard.css';


const CreditCard = (props) => {


    return (

        <>
            
            <div className="PopUp_Credit active">
                <div className="close_bttn_Credit" onClick={props.onReserveRequest}>&times;</div>
                <div className="Form_Credit">
                    <div className="title_Credit">
                        <h2>PAYMENT PROCESS</h2>
                    </div>
                <form className="inputGroup_Credit">
                    <input type="text" className="input_field_Credit " placeholder="CARD NUMBER" name="creditNumber" required /><br/>
                    <input type="text" className="input_field_Credit" placeholder="PIN" name="creditPin" required />  
                    
                    <button type="submit" className="submitBttn_Credit" onClick={props.onReserveRequest}>CHECKOUT</button>
                
                </form>
                </div>
                
            </div>
        </>
  );
}

export default CreditCard;