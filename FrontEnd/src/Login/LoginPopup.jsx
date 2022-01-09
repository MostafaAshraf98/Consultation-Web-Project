import React, { useState , useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './LoginPopup.css';
import {UserSignup, UserLogin} from '../service/userServices'


function LoginPopup(props) {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");
    const [fname,setFirstname] = useState("");
    const [lname,setLastname] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    var x = false;

    const handleLogin = () => {
        
        console.log("Handling login");
        UserLogin(loginObj).then((response) => {
          console.log("entered the user login handler");
          if (!response.error) localStorage.setItem("token", response.data.token);
          //  localStorage.setItem('role', response.data.role);
          console.log(response);
          if (!response.error) {
            x = false;
          } else {
            x = true;
          }
        });
        setLoggedIn(x);
        console.log("IsLogged in value is:");
        console.log(isLoggedIn);
        // ------------ call backEnd fn Login
        // ------------ save returned token in local storage using the next line
    }

    const handleSignUp = () => {
          // event.preventDefault();

    UserSignup(signUpObj).then((response) => {
        localStorage.setItem("token", response);
        console.log(response);
        if (response == null) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      });
    }
    const handleChangeUsername = (event) => {
        
        const usr  = event.target.value;
        setUsername(usr);
        console.log(username);

    }

    const handleChangePass = (event) => {
        const pass  = event.target.value;
        setPassword(pass);
        console.log(password);

    }
    
    const handleChangeEmail = (event) => {
        const mail  = event.target.value;
        setEmail(mail);
        console.log(email);

    }
    const handleChangeFname = (event) => {
        const name = event.target.value;
       setFirstname(name);
        console.log( fname);

    }
    const handleChangeLname = (event) => {
        const l = event.target.value;
        setLastname(l);
        console.log( lname);

    }
    const handleChangeRole = (event) => {
        const r = event.target.value;
        setRole(r);
        console.log( role);

    }


  
    const  signUpObj={
        "email":email,
        "password":password,
        "userName":username,
        "role":role,
        "firstName":fname,
        "lastName":lname
    };

     const loginObj ={  
        "password":password,
        "userName":username,
     };
    
      function SIGN()
        {
            $(".inputGroup_Login").toggleClass("LogForm");
            $(".inputGroup_SignUp").toggleClass("SignInLog");
            $(".PopUp_Login").toggleClass("SignBox");
            $(".toggleB_Login").toggleClass("colorBttn");
    
        }


    return (

        <>
                <div className="PopUp_Login active">
                    <div className="close_bttn_Login" onClick={props.onLoginRequest}>&times;</div>
                    <div id="frame"className="form-box_Login">
                        <div className="FormType-button_Login">
                            <div className="toggleB_Login" id="bttn_Login"></div>
                            <button type="button" className="ToggleForm_Login" onClick={SIGN}>LOG IN</button>
                            <button type="button" className="ToggleForm_Login" onClick={SIGN}>SIGN UP</button>
                        </div>
                
                        <form  className="inputGroup_Login">
                        
                        <input type="email" className="input_field_Login " placeholder="EMAIL" name="email" onKeyPress={handleChangeEmail} required/>
                        <input type="password" className="input_field_Login" placeholder="PASSWORD" name="password" id="password" onKeyPress={handleChangePass} required />  
                        <button type="submit" className="submitBttn_Login"  onClick={handleLogin}  >LOG IN</button>
                    </form>
                    
                    <form class="inputGroup_SignUp">
                        <input type="text" className="input_field_Login " placeholder="FIRST NAME" name="firstname" onKeyPress={handleChangeFname} required />
                        <input type="text" className="input_field_Login " placeholder="LAST NAME" name="lastname" onKeyPress={handleChangeLname} required/>
                        <input type="text" className="input_field_Login " placeholder="USERNAME" name="username" onKeyPress={handleChangeUsername} required/>
                        <input type="email" className="input_field_Login " placeholder="EMAIL" name="email" onKeyPress={handleChangeEmail} required/>
                        <input type="password" className="input_field_Login" placeholder="PASSWORD" name="password" id="password" onKeyPress={handleChangePass} required />  
                        <input type="password" className="input_field_Login" placeholder="CONFIRM PASSWORD" name="confirm_password" id="confirm_password" required/>
                        <select name="role" className="input_role_Login" onChange={handleChangeRole}>
                            <option disabled selected>ROLE</option>
                            <option value="customer">CUSTOMER</option>
                            <option value="manager">MANAGER</option>
                        </select>
                        <button type="submit" className="submitBttn_Login" onClick={handleSignUp} >SIGN UP</button>
                
                    </form>
                    </div>
                </div> 
                        
        </>
  );
}

export default LoginPopup;