import React, { useState , useEffect } from 'react';
import $ from 'jquery';
import './EditMovie.css';
import {EditMovieInfo,GetMoviebyTitle} from '../service/movieServices'


function EditMovie(props) {

    const [title,setTitle] = useState("");
    const [date,setDate] = useState("");
    const [stime,setStart] = useState("");
    const [etime,setEnd] = useState("");
    const [poster,setPoster] = useState("");
    const [room,setRoom] = useState("");

    // const [titleEdit,setTitleEdit] = useState(false);
    // const [dateEdit,setDateEdit]= useState(false);
    // const [stimeEdit,setSTimeEdit] = useState(false);
    // const [etimeEdit,setETimeEdit]= useState(false);
    // const [posterEdit,setposterEdit]= useState(false);
    // const [roomEdit,setroomEdit]= useState(false);

    // useEffect( () =>{
    //       //get user photos
    //       GetMoviebyTitle(props.title).then( response => {
    //         setTitle(response.data);
    //         setDate(response.data);
    //         setStart(response.data);
    //         setEnd(response.data);
    //         setPoster(response.data);
    //         setRoom(response.data);
    //       })
      
    //     },[])
      

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

    const handleEdit = () => {
                
        EditMovieInfo(props.title, movieObj).then( response => {
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
          var start_time = $("#specialInputStart_Edit").val();

          //end time
          var end_time = $("#specialInputEnd_Edit").val();

          //convert both time into timestamp
          var stt = new Date("November 13, 2013 " + start_time);//putting a dummy date in the function
          stt = stt.getTime();

          var endt = new Date("November 13, 2013 " + end_time);
          endt = endt.getTime();

         
          if(stt > endt) {
              $("#specialInputEnd_Edit").css("border-bottom","1px solid rgb(202, 7, 7)");
              $("#specialInputStart_Edit").css("border-bottom","1px solid rgb(202, 7, 7)");
              $(".error5").addClass("ShowError");
                 
          }
          else{
              $("#specialInputStart_Edit").css("border-bottom","1px solid #aed309");
              $("#specialInputEnd_Edit").css("border-bottom","1px solid #aed309");
              $(".error5").removeClass("ShowError");
              
          }
          continueBttn()
         
  }
  function checkDate() {
      // var selectedText = document.getElementById('specialInputDate').value;
      var selectedText = $("#specialInputDate_Edit").val();
          var selectedDate = new Date(selectedText);
          var now = new Date();
          if (selectedDate < now)
          {
              $("#specialInputDate_Edit").css("border-bottom","1px solid rgb(202, 7, 7)");
              $(".error6").addClass("ShowError");
              
          }
          else{
              $("#specialInputDate_Edit").css("border-bottom","1px solid #aed309");
              $(".error6").removeClass("ShowError");
          }
          continueBttn()
   }

   function continueBttn()//diabling the sign up button if there is an error
  {
      var selectedText = $("#specialInputDate_Edit").val();
          var selectedDate = new Date(selectedText);
          var now = new Date();
            //start time
            var start_time = $("#specialInputStart_Edit").val();

              //end time
              var end_time = $("#specialInputEnd_Edit").val();

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
                        <input type="text" className="input_field_Edit " placeholder="MOVIE NAME" name="title"onKeyPress={handleChangeTitle} required /><br/>
                        MOVIE DATE:<input type="date" className="input_field_Edit " id="specialInputDate_Edit" placeholder="MOVIE DATE" name="date"onChange={handleChangeDate} required/><br/>
                        <p class="error6">Date should be in the future!</p>
                        START TIME:<input type="time" className="input_field_Edit " id="specialInputStart_Edit" placeholder="START TIME" name="startTime" onChange={handleChangeStartT} required/><br/>
                        END TIME:<input type="time" className="input_field_Edit " id="specialInputEnd_Edit"placeholder="END TIME" name="endTime" onChange={handleChangeEndT}  required/><br/>
                        <p class="error5">Start time should be smaller then end time!</p>
                        <input type="text" className="input_field_Edit" placeholder="POSTER IMAGE URL" name="PosterImage" onKeyPress={handleChangePoster} required />  
                        <select name="room" className="input_room"  onChange={handleChangeRoom}>
                            <option disabled selected>ROOM</option>
                            <option value="1">SILVER ROOM</option>
                            <option value="2">GOLD ROOM</option>
                        </select>
                        <button type="submit" className="submitBttn_Edit" id="Add" onClick={handleEdit}>EDIT</button>
                    
                    </form>
                    </div>
                </div>

            
        </>
  );
}

export default EditMovie;