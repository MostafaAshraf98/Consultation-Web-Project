import React, { useState , useEffect } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{faSearch} from '@fortawesome/free-solid-svg-icons'
function SearchBar(props) {

    const search = <FontAwesomeIcon icon={faSearch} color="DarkGrey"/>
    
    const [title,setTitle] = useState("");

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