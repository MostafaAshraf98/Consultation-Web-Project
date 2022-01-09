import axios from "axios"

const SERVER_URL = "http://localhost:8086/api/";



// Add reservation
export async function AddReservation(object) {

  try {

    // Need for token here
    const response = await axios.post(SERVER_URL + 'reservation', object, { headers: { token: localStorage.token } });


    return (response)
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error);
  }
}


// get seats by title .. to be used in showroom foe users
export async function GetUserSeatsbyMovieTitle(movieTitle) {

  try {


    // we should not pass token here .. al customers can view the movie page 
    const response = await axios.get(SERVER_URL+'reservation/'+movieTitle,{headers:{token:localStorage.token}});


    return (response)
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error);
  }
}



export async function GetUserMovies() {

  try {
    // we should not pass token here .. al customers can view the movie page 
    const response = await axios.get(SERVER_URL+'reservation/',{headers:{token:localStorage.token}});

    return (response)
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error);
  }
}

// get seats by title .. showroom guest
export async function GetSeatsbyMovieTitle(title) {

  try {
    const response = await axios.get(SERVER_URL + 'reservation/guest/'+title, {
      crossDomain: true
    });

    return (response)
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error);
  }
}