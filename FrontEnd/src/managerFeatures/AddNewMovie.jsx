import React, { useState , useEffect } from 'react';
import './AddNewMovie.css';
import $ from 'jquery';
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
                
        AddMovie(movieObj).then( response => {
            console.log(response);
        });
  
    }
    const movieObj ={  
        "title":title,
        "date":date,
        "start":stime,
        "end":etime,
        "roomNumber":room,
        "file":poster
     };
     function checkTime()
     {
            //start time
          var start_time = $("#specialInputStart").val();

          //end time
          var end_time = $("#specialInputEnd").val();

          //convert both time into timestamp
          var stt = new Date("November 13, 2013 " + start_time);//putting a dummy date in the function
          stt = stt.getTime();

          var endt = new Date("November 13, 2013 " + end_time);
          endt = endt.getTime();

         
          if(stt > endt) {
              $("#specialInputEnd").css("border-bottom","1px solid rgb(202, 7, 7)");
              $("#specialInputStart").css("border-bottom","1px solid rgb(202, 7, 7)");
              $(".error5").addClass("ShowError");
                 
          }
          else{
              $("#specialInputStart").css("border-bottom","1px solid #aed309");
              $("#specialInputEnd").css("border-bottom","1px solid #aed309");
              $(".error5").removeClass("ShowError");
              
          }
          continueBttn()
         
  }
  function checkDate() {
      // var selectedText = document.getElementById('specialInputDate').value;
      var selectedText = $("#specialInputDate").val();
          var selectedDate = new Date(selectedText);
          var now = new Date();
          if (selectedDate < now)
          {
              $("#specialInputDate").css("border-bottom","1px solid rgb(202, 7, 7)");
              $(".error6").addClass("ShowError");
              
          }
          else{
              $("#specialInputDate").css("border-bottom","1px solid #aed309");
              $(".error6").removeClass("ShowError");
          }
          continueBttn()
   }

   function continueBttn()//diabling the sign up button if there is an error
  {
      var selectedText = $("#specialInputDate").val();
          var selectedDate = new Date(selectedText);
          var now = new Date();
            //start time
            var start_time = $("#specialInputStart").val();

              //end time
              var end_time = $("#specialInputEnd").val();

              //convert both time into timestamp
              var stt = new Date("November 13, 2013 " + start_time);//putting a dummy date in the function
              stt = stt.getTime();

              var endt = new Date("November 13, 2013 " + end_time);
              endt = endt.getTime();
      if((selectedDate > now)&& (stt < endt))
          {
              $("#Add").show();
          }
          else
          {
              $("#Add").hide();
          }
  }

    const handleChangeTitle = (event) => {
                
        const ttl  = event.target.value;
        setTitle(ttl);
        console.log(title);
        

    }
    const handleChangeDate = (event) => {
                
        const d  = event.target.value;
        setDate(d);
        console.log(date);
        checkDate();

    }
    const handleChangeStartT = (event) => {
                
        const s  = event.target.value;
        setStart(s);
        console.log(stime);
        checkTime();

    }
    const handleChangeEndT = (event) => {
                
        const e  = event.target.value;
        setEnd(e);
        console.log(etime);
        checkTime();

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
                    <p class="error6">Date should be in the future!</p>
                    START TIME:<input type="time" class="input-field " id="specialInputStart" placeholder="START TIME" name="startTime" onChange={handleChangeStartT} required/><br/>
                    END TIME:<input type="time" class="input-field " id="specialInputEnd"placeholder="END TIME" name="endTime" onChange={handleChangeEndT} required/><br/>
                    <p class="error5">Start time should be smaller then end time!</p>
                    <input type="text" class="input-field" placeholder="POSTER IMAGE URL" name="PosterImage" onKeyPress={handleChangePoster} required />  
                    <select name="room" className="input_room"  onChange={handleChangeRoom}>
                        <option disabled selected>ROOM</option>
                        <option value="1">SILVER ROOM</option>
                        <option value="2">GOLD ROOM</option>
                    </select>
                    <button type="submit" class="submit_Bttn" id="Add"onClick={handleAdd} >ADD MOVIE</button>
            
                </form>
                </div>
                <Link className='skipLink' style={navStyle} to={`/`}>
                         <button type="submit" className='backButton'>BACK</button>     
                  </Link>
            </div>

            
        </>
  );
}

export default AddNewMovie;