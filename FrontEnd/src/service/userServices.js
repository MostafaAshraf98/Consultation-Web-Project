import axios from "axios"

const SERVER_URL = "http://localhost:8086/api/";


export async function UserSignup(object) {
  try {
    const response = await axios.post(SERVER_URL + 'user', object, {
      crossDomain: true
    });
    // const response = await axios.get( SERVER_URL+'user?id='+0);
    //Success
    console.log(object);
    return (response)
  } catch (error) {
    if (error.response) {
      /*
      * The request was made and the server responded with a
      * status code that falls out of the range of 2xx
      */
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return (error.response.data)
    } else if (error.request) {
      /*
      * The request was made but no response was received, `error.request`
      * is an instance of XMLHttpRequest in the browser and an instance
      * of http.ClientRequest in Node.js
      */
      console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message);
    }
    console.log(error);
  }
};


export async function UserLogin(object) {
  try {
    console.log(object);
    const response = await axios.post(SERVER_URL + 'user/login', object, {
      crossDomain: true
    });
    // const response = await axios.get( SERVER_URL+'user?id='+0);
    //Success

    return (response)
  } catch (error) {
    if (error.response) {
      /*
      * The request was made and the server responded with a
      * status code that falls out of the range of 2xx
      */
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return (error.response.data)
    } else if (error.request) {
      /*
      * The request was made but no response was received, `error.request`
      * is an instance of XMLHttpRequest in the browser and an instance
      * of http.ClientRequest in Node.js
      */
      console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message);
    }
    console.log(error);
  }
};
