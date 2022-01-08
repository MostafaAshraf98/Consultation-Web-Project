import axios from "axios"

 const SERVER_URL = "http://localhost:8086/" ;



 // Add new movie by manager
 export async function AddMovie (movie){
    console.log(movie);
    try{
        
        // No need for token here
        // const response = await axios.post(SERVER_URL + 'movie', movie,{headers:{token:localStorage.token}});
        
        const response = await axios.post( SERVER_URL+'movie',movie, {
            crossDomain: true
          });
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
  

    // get movie by title .. to be used in movie page
  export async function GetMoviebyTitle (movieTitle){
    
    try{ 


    // we should not pass token here .. al customers can view the movie page 
    //const response = await axios.get(SERVER_URL+'movie/'+movieTitle,{headers:{token:localStorage.token}});
      const response = await axios.get( SERVER_URL+'movie/'+movieTitle, {
        crossDomain: true
      });

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
    

    //Get all movies
    export default async function GetAllMovies(){
        try{
            
            // No need for token to be passed
            const response = await axios.get( SERVER_URL+'movie', {
                crossDomain: true
            });
            
            // const response = await axios.get( SERVER_URL+'movie',{headers:{token:localStorage.token}});
            // const response = await axios.get( SERVER_URL+'movie');
            //Success
            return(response)
        } catch (error){
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
    };
    

    //--------------------------------CHECK-------------------------
    //Edit movie info by manager
  export async function EditMovieInfo (title, object){
    try{
        const response = await axios.put(SERVER_URL+'movie/'+title , object,{headers:{token:localStorage.token}})
        //Success
        return(response)
    } catch (error){
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
  
    };
  