import React from 'react';
import Home from "./home/Home";
import MoviePage from "./reservation/MoviePage";
import ShowRoom from "./reservation/ShowRoom";
import Login from './Login/Login';
import AddNewMovie from './managerFeatures/AddNewMovie';
import UserMoviesPage from './reservation/UserMoviesPage';

import {BrowserRouter as Router, Routes  , Route} from "react-router-dom";


// const AuthorizationContext  = React.createContext();

function App() { 
  
  // const token = localStorage.getItem('token');
  const navStyle={
    color:'white'
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>

          {/* <Route path="/seat" element={<seat/>}/> */}

          {/* To be modified based on selected movie */}
          <Route path="/ShowRoom/:text/:num" element={<ShowRoom/>}/>

          <Route path="/MoviePage/:text" element={<MoviePage/>}/>

          <Route path="/AddNewMovie" element={<AddNewMovie/>}/>

          {/* To be modified based on user_id */}
          <Route path="/UserMoviesPage" element={<UserMoviesPage/>}/>
{/* 
          <AuthorizationContext.Provider value={token}>
            {!!token ?
            
            <PrivateRoute /> 
            :
            
            <PublicRoute />
            
            }
          </AuthorizationContext.Provider> */}
        </Routes>
      </div>

    </Router>
  );
}

export default App;
