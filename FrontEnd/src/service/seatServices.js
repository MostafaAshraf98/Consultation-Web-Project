import axios from "axios"

 const SERVER_URL = "http://localhost:8086/" ;



 // Add reservation
 export async function AddReservation (object){
    console.log(movie);
    try{
        
        // Need for token here
         const response = await axios.post(SERVER_URL + 'reservation', object,{headers:{token:localStorage.token}});
        

        return(response)
    }catch (error){
        if (error.response){
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request){
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error);
    }
    }
  

