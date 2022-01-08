import React, { useState , useEffect } from 'react';
import './AddNewMovie.css';
import { Link } from 'react-router-dom';
import {AddMovie} from '../service/movieServices'

function AddNewMovie() {
    
    const navStyle={ color:'white'};
    const [title,setTitle] = useState("");
    const [date,setDate] = useState("");
    const [stime,setStart] = useState("");
    const [etime,setEnd] = useState("");
    const [poster,setPoster] = useState("");
    const [room,setRoom] = useState("");

    const handleAdd = () => {
                
        // AddMovie(movieObj).then( response => {
        //     console.log(response);
        // });
  
    }
    const movieObj ={  
        "title":title,
        "date":date,
        "start":stime,
        "end":etime,
        "roomNumber":room,
        "file":poster
     };

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
            <div class="Total-Page">
                <div id="frame"class="formbox">
                <div class="title">
                    <h2> ADD NEW MOVIE</h2>
                </div>
                <form class="inputGroup">
                    <input type="text" class="input-field " placeholder="MOVIE NAME" name="title" onKeyPress={handleChangeTitle} required /><br/>
                    MOVIE DATE:<input type="date" class="input-field " id="specialInputDate" placeholder="MOVIE DATE" name="date" onChange={handleChangeDate} required/><br/>
                    START TIME:<input type="time" class="input-field " id="specialInputStart" placeholder="START TIME" name="startTime" onChange={handleChangeStartT} required/><br/>
                    END TIME:<input type="time" class="input-field " id="specialInputEnd"placeholder="END TIME" name="endTime" onChange={handleChangeEndT} required/><br/>
                    <input type="text" class="input-field" placeholder="POSTER IMAGE URL" name="PosterImage" onKeyPress={handleChangePoster} required />  
                    <select name="room" className="input_room"  onChange={handleChangeRoom}>
                        <option disabled selected>ROOM</option>
                        <option value="1">SILVER ROOM</option>
                        <option value="2">GOLD ROOM</option>
                    </select>
                    <button type="submit" class="submit_Bttn" >ADD MOVIE</button>
            
                </form>
                </div>
                <Link className='skipLink' style={navStyle} to={`/`}>
                         <button type="submit" className='backButton' onClick={handleAdd}>BACK</button>     
                  </Link>
            </div>

            
        </>
  );
}

export default AddNewMovie;