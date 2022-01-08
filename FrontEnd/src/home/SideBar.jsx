import React, { useState , useEffect } from 'react';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{faRubleSign, faUserPlus} from '@fortawesome/free-solid-svg-icons'
import{faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import{faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import{faPlus} from '@fortawesome/free-solid-svg-icons'
import{faHome} from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SideBar() {
    // const SideBar = (props) => { 

    const navStyle={ color:'white'};
    const signUp = <FontAwesomeIcon icon={faUserPlus} color="White"/>
    const logIn = <FontAwesomeIcon icon={faSignInAlt} color="White"/>
    const logOut = <FontAwesomeIcon icon={faSignOutAlt} color="White"/>
    const add = <FontAwesomeIcon icon={faPlus} color="White"/>
    const home = <FontAwesomeIcon icon={faHome} color="White"/>
    const eye = <FontAwesomeIcon icon={faEye} color="White"/>
    
    // based on role returned from back end .. st the the manager true/ false
    const [isManager, setIsManager] = useState(true);
    // based on returned props from the login page
    const [isLoggedIn, setLoggedIn]= useState(true);


    return (

        <>

        <div className='wrapper'>
            <div className='sidebar'>
                <h2 className='titleSidebar'>Tickee-Book</h2>
                <ul>
                <li className='list'>
                        <Link  className='anchor' style={navStyle} to={`/`}>
                             {home}  {' '} Home
                         </Link> 
                    </li>
                    <li className='list'>
                        <Link  className='anchor' style={navStyle} to={`/Login`}>
                             {logIn}  {' '} Sign Up | Log In
                         </Link> 
                    </li>

                    {/* In case the user already loged in */}
                    {isLoggedIn &&
                        <li className='list'>
                            <Link  className='anchor' style={navStyle} to={`/Login`}>
                                {logOut} {' '}Log Out
                            </Link>
                        </li> 
                    }

                    {/* In case the user already logged in */}
                    {isLoggedIn &&
                        <li className='list'>
                            <Link  className='anchor' style={navStyle} to={`/UserMoviesPage`}>
                                {eye} {' '}View Reservations
                            </Link>
                        </li>

                    }
                    {/* In case the user is a manager -- ability to add new movies */}
                    {isManager &&
                        <li className='list'>
                            <Link  className='anchor' style={navStyle} to={`/AddNewMovie`}>
                                {add} {' '}Add new Movie
                            </Link>
                        </li>

                    }
                </ul>
            </div>
        </div>

        </>
  );
}

export default SideBar;