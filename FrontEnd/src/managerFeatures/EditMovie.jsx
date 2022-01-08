import React, { useState , useEffect } from 'react';
import $ from 'jquery';
import './EditMovie.css';
import {EditMovieInfo} from '../service/movieServices'


function EditMovie(props) {

    const [title,setTitle] = useState("");
    const [date,setDate] = useState("");
    const [stime,setStart] = useState("");
    const [etime,setEnd] = useState("");
    const [poster,setPoster] = useState("");
    const [room,setRoom] = useState("");

    const [titleEdit,setTitleEdit] = useState(false);
    const [dateEdit,setDateEdit]= useState(false);
    const [stimeEdit,setSTimeEdit] = useState(false);
    const [etimeEdit,setETimeEdit]= useState(false);
    const [posterEdit,setposterEdit]= useState(false);
    const [roomEdit,setroomEdit]= useState(false);


    const handleChangeTitle = (event) => {
                
        const ttl  = event.target.value;
        setTitle(ttl);
        console.log(title);

    }
    const handleChangeDate = (event) => {
                
        const d  = event.target.value;
        setDate(d);
        console.log(date);

    }
    const handleChangeStartT = (event) => {
                
        const s  = event.target.value;
        setStart(s);
        console.log(stime);

    }
    const handleChangeEndT = (event) => {
                
        const e  = event.target.value;
        setEnd(e);
        console.log(etime);

    }

    const handleChangePoster = (event) => {
                
        const p  = event.target.value;
        setPoster(p);
        console.log(poster);

    }
    const handleChangeRoom = (event) => {
                
        const r  = event.target.value;
        setRoom(r);
        console.log(room);

    }
    return (

        
        <>
                {/* <div className="center_Edit">
                    <button id="showPopUp_Edit" onClick={show}>Show</button>
                </div> */}
                <div className="PopUp_Edit active">
                    <div className="close_bttn_Edit" onClick={props.onEditRequest}>&times;</div>
                    <div className="Form_Edit">
                        <div className="title_Edit">
                            <h2>EDIT MOVIE</h2>
                        </div>
                    <form className="inputGroup_Edit">
                        <input type="text" className="input_field_Edit " placeholder="MOVIE NAME" name="title" required /><br/>
                        MOVIE DATE:<input type="date" className="input_field_Edit " id="specialInputDate_Edit" placeholder="MOVIE DATE" name="date" required/><br/>
                        START TIME:<input type="time" className="input_field_Edit " id="specialInputStart_Edit" placeholder="START TIME" name="startTime" required/><br/>
                        END TIME:<input type="time" className="input_field_Edit " id="specialInputEnd_Edit"placeholder="END TIME" name="endTime" required/><br/>
                        <input type="text" className="input_field_Edit" placeholder="POSTER IMAGE URL" name="PosterImage" required />  
                        
                        <button type="submit" className="submitBttn_Edit" >EDIT</button>
                    
                    </form>
                    </div>
                </div>

            
        </>
  );
}

export default EditMovie;