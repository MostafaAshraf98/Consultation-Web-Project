import React, { useState , useEffect } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{faSearch} from '@fortawesome/free-solid-svg-icons'
import {GetMoviebyTitle} from '../service/movieServices'

function SearchBar(props) {

    const search = <FontAwesomeIcon icon={faSearch} color="DarkGrey"/>
    
    const [title,setTitle] = useState("");
    const [defined,setDefined]=useState(false);
    const handleInputTitle = (event) => {
        const Tt  = event.target.value;
        setTitle(Tt);
        console.log(title);
        // if (event.charCode === 13)
        if (event.key === "Enter")
         {
          
            console.log("title to be sent= ",title);
            
            //  --- calling backEnd API
            // GetMoviebyTitle (title).then( response => {
            //     console.log(response);
            //     props.onSearchRequest();
            // })
            var def=false;
            GetMoviebyTitle(title).then((response) => {
                console.log("The response is ");
                if(response)
                {
                    def=true;
                    props.onSearchRequest(response.data);
                }
                else{
                  def=false;
                }
                console.log("def=",defined);
                console.log(response);
                setDefined(def);
               
              });
            
          }

    }



    return (

        <>
            <div className='wrapperSearch'>
                <div className='containerSearch'>
                    <div className='searchWrap'>
                        <div className='searchBox'>
                            <input type="text" className='inputSearch' placeholder='Search ... ' onKeyPress={handleInputTitle} />
                            <div className='btn btn_common'>
                                {search}
                             </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
  );
}

export default SearchBar;