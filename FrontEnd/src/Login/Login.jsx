import React, { useState , useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {UserSignup, UserLogin} from '../service/userServices'
import './Login.css';
import Home from '../home/Home';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import {BrowserRouter as Router,Redirect, Routes  , Route} from "react-router-dom";


function Login() {

            const navStyle={ color:'white'};
            const [isLoggedIn, setLoggedIn] = useState(false);

            const [username,setUsername] = useState("");
            const [password,setPassword] = useState("");
            const [email,setEmail] = useState("");
            const [role,setRole] = useState("");
            const [fname,setFirstname] = useState("");
            const [lname,setLastname] = useState("");
        
            const handleLogin = () => {
              console.log("Handling login");
                    UserLogin(loginObj).then( response => {
                         localStorage.setItem('token', response);
                         console.log(response);
                         if(response ==null)
                         {
                            setLoggedIn(false);
                         }
                         else{
                             setLoggedIn(true);
                         }
                    });
                // ------------ call backEnd fn Login
                // ------------ save returned token in local storage using the next line
            }

            const handleSignUp = () => {
                // event.preventDefault();

                UserSignup(signUpObj).then( response => {
                    localStorage.setItem('token', response);
                    console.log(response);
                    if(response ==null)
                    {
                       setLoggedIn(false);
                    }
                    else{
                        setLoggedIn(true);
                    }
                });
                //------------ call backEnd fn SignUp --- POST
                //------------ save returned token in local storage using the next line

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
                "emailorusername":username,
             };

            function SIGN()
            {
                $(".inputGroupLogin").toggleClass("LogForm");
                $(".inputGroupSignUp").toggleClass("SignInLog");
                $(".form-box").toggleClass("SignBox");
                $(".toggleB").toggleClass("colorBttn");

            }

          function pass()//showing error message in all cases of invalid password
          {
            var conf=$("#pwdConfirm").val();
              if(!validatePass())
              {
                $(".error1").addClass("ShowError");
                $("#pwd").css("border-bottom","1px solid rgb(202, 7, 7)");
              }
              else{
                $(".error1").removeClass("ShowError");
                $("#pwd").css("border-bottom","1px solid #aed309");
               
              }
              if(!digitsAndChar())
              {
                $(".error4").addClass("ShowError");
                $("#pwd").css("border-bottom","1px solid rgb(202, 7, 7)");
              }
              else{
                $(".error4").removeClass("ShowError");
                $("#pwd").css("border-bottom","1px solid #aed309");
               
              }
              if(conf.length!=0)
              {
              if(!validateConfirm())
              {
                $(".error2").addClass("ShowError");
                $("#pwd").css("border-bottom","1px solid rgb(202, 7, 7)");
              }
              else{
                $(".error2").removeClass("ShowError");
                $("#pwd").css("border-bottom","1px solid #aed309");
               
              }
            }
            if(validateConfirm)
              {
                $("#pwdConfirm").css("border-bottom","1px solid #aed309");
              }
              continueBttn();

          }

    
      function confirm()//showing error message if the passwords do not match
      {
            if(!validateConfirm())
              {
                $(".error2").addClass("ShowError");
                $("#pwdConfirm").css("border-bottom","1px solid rgb(202, 7, 7)");
              }
              else{
                $(".error2").removeClass("ShowError");
                $("#pwdConfirm").css("border-bottom","1px solid #aed309");
               
              }
              if(validatePass()&&digitsAndChar())
              {
                $("#pwd").css("border-bottom","1px solid #aed309");
              }
              continueBttn();
     }

   function mail()
   {
            if(!validateMail())
              {
                $(".error3").addClass("ShowError");
                $("#mail").css("border-bottom","1px solid rgb(202, 7, 7)");
              }
              else{
                $(".error3").removeClass("ShowError");
                $("#mail").css("border-bottom","1px solid #aed309");
               
              }
              continueBttn();
     }

    function validateMail()//checking if email is valid
    {
        var mail=$("#mail").val();
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		 if(reg.test(mail))
         {
		 	return true;
		 }else
         {
		 	return false;
		 }

    }
    function continueBttn()//diabling the sign up button if there is an error
    {
        if(validatePass() && validateConfirm() &&digitsAndChar())
            {
                $("#submitS").show();
            }
            else
            {
                $("#submitS").hide();
            }
    }
    function validatePass()//checking the length of the password>8
    {
        var pass=$("#pwd").val();//getting the value of the password to check the charachers

        if(pass.length>8 )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    function digitsAndChar()//checking that password has at least 1 digit and 1 char
    {
        var pass=$("#pwd").val();//getting the value of the password to check the charachers
        var reg=/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
        if(reg.test(pass))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    function validateConfirm()//checking if confirm password an password match
    {
        var pass=$("#pwd").val();
        var confirm=$("#pwdConfirm").val();
        if(pass==confirm)
        {
            return true;
        } 
        else
        {
        return false;
        }

    }
    return (

        <>
            <div className="TotalPage">
                  <Link className='skipLink' style={navStyle} to={`/`}>
                         <button type="submit" className='skipButton'>SKIP</button>     
                  </Link>
                <div id="frame"className="form-box">
                <div className="FormType-button">
                    <div className="toggleB" id="bttn"></div>
                    <button type="button" className="ToggleForm" onClick={SIGN}>LOG IN</button>
                    <button type="button" className="ToggleForm" onClick={SIGN}>SIGN UP</button>
                </div>

                <form  className="inputGroupLogin">
                    
                    <input type="email" className="input_field " placeholder="EMAIL" name="email" onKeyPress={ handleChangeEmail}  onKeyUp={mail} required/>
                    <input type="password" className="input_field" placeholder="PASSWORD" name="password" id="password" onKeyPress={handleChangePass} required /> 

                     {/* Call backEnd request -- based on response .. route to home/ not  */}
                    <button type="submit" className="submitBttn" onClick={handleLogin} >LOG IN</button>
                    {/* {isLoggedIn?
                        <Navigate to='/' />     
                    :
                        <Navigate to='/Login' />
                     } */}


                </form>
                
                <form className="inputGroupSignUp">
                    <input type="text" className="input_field " placeholder="FIRST NAME" name="firstname" onKeyPress={handleChangeFname} required />
                    <input type="text" className="input_field " placeholder="LAST NAME" name="lastname" onKeyPress={handleChangeLname} required/>
                    <input type="text" className="input_field " placeholder="USERNAME" name="username" onKeyPress={ handleChangeUsername} required/>
                    <input type="email" className="input_field " id="mail" placeholder="EMAIL" name="email" onKeyPress={ handleChangeEmail} onKeyUp={mail} required/>
                    <p className="error3">Invalid email</p>
                    <input type="password" className="input_field" id="pwd" placeholder="PASSWORD" name="password" onKeyPress={handleChangePass} onKeyUp={pass} required /> 
                    <p className="error1">Password needs to be more then 8 characters </p> 
                    <p className="error4">Password should contain 1 charachter and 1 digit</p>
                    <input type="password" className="input_field" id="pwdConfirm" placeholder="CONFIRM PASSWORD" name="confirm_password" onKeyUp={confirm} required/>
                    <p className="error2">Passwords do not match</p>
                    <select name="role" className="input_role"  onChange={handleChangeRole}>
                        <option disabled selected>ROLE</option>
                        <option value="customer">CUSTOMER</option>
                        <option value="manager">MANAGER</option>
                    </select>

                    {/* Call backEnd request -- Post */}
                    <button type="submit" id="submitS"className="submitBttn" onClick={handleSignUp} >SIGN UP</button>
                    {/* {isLoggedIn?
                        <Navigate to='/' />     
                    :
                        <Navigate to='/Login' />
                     } */}

                </form>

                </div>
                
            </div>
                        
        </>
  );
}

export default Login;