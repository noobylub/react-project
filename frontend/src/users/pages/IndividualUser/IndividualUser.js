import React from 'react';
import {Link} from 'react-router-dom';
import './IndividualUser.css'
const IndividualUser = ({key,id,image,name,placeCount }) => {
    const message = "";
    
   
    
    return (
        <div>
            <Link to={`/${id}/places`}  className="individual-user">
            <img src={image} alt="User profile picture "/>
            <div className="content">
                <h1>{name}</h1>
                 <h3>{placeCount<=0? "No places visited": (placeCount==1?`${placeCount} Place visited`: `${placeCount} Places visited`)}</h3>
            </div>
           
            </Link>
        </div>
        
    );
}

export default IndividualUser;
