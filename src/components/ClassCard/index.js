import React from 'react';
import './ClassCard.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


function ClassCard(){

    function handleClick(){
        
    }

    return(
        <Link to = {ROUTES.FEED}>
            <div className = "class-card-container" onClick={()=> {handleClick()}}>
                <span className = "class-title"><h2>Class Title</h2></span>
            </div>
        </Link>
    );
}

export default ClassCard;