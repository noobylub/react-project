import React, { useContext, useState } from 'react';
import './Header.css';

import { BsArrowDown } from "react-icons/bs";
import useWindowDimensions from '../../../hook/SizeWindow';
import { BsArrowUp } from 'react-icons/bs'
import Navigation from './Navigation'



const Header = () => {
    const { height, width } = useWindowDimensions();
    const [menu, setMenu] = useState(true);
    
    const change = () => setMenu(!menu)
    var toDisplay;
    if (width < 832 && !menu) {
        toDisplay = <Navigation />
    }
    else if (width > 832) {
        toDisplay = <Navigation />
    }
    var icon;
    if (width < 832) {
        icon = <div className="menu" onClick={change} >{menu ? <BsArrowDown></BsArrowDown> : <BsArrowUp />}</div>
    }
    else {
        icon = <div className="content">
            Welcome
    </div>
    }

    return (
        <header className={menu ? 'header' : 'header-long'} >
            <div className="content">
                {icon}


                <div className="main-content">

                </div>
            </div>

            {toDisplay}
        </header>
    )







    // if(!menu){return (
    //     <header className="header">
    //         <div className="content">

    //             <div className="menu"onClick={change} ><BsArrowDown/></div>
    //             <div className="main-content">
    //               Your Places
    //             </div>
    //         </div>
    //         <nav className="navigations">
    //             <ul className="nav-links">
    //                 <li>
    //                     <NavLink to="/" exact>ALL USERS</NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/places">MY PLACES</NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/places/new">ADD PLACE</NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/auth">AUTHENTICATE</NavLink>
    //                 </li>
    //             </ul>
    //         </nav>
    //     </header>
    // );}
    // else if(menu){
    //     return(
    //         <div className="main-menu">
    //             <div className="menu"onClick={change} ><BsArrowUp/></div>
    //             <li>
    //                     <NavLink to="/" exact>ALL USERS</NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/places">MY PLACES</NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/places/new">ADD PLACE</NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/auth">AUTHENTICATE</NavLink>
    //                 </li>
    //         </div>

    //     )
    // }
}

export default Header;
