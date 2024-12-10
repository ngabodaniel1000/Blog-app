import React from 'react'
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';


function Hidenavbar() {

    const location = useLocation();
    let navbar;
    if (location.pathname !== '/login' && location.pathname !== '/signup') {
      navbar = <Navbar />;
    } else {
      navbar = null;
    }
  return ( 
    <div>
     {navbar}
    </div>
  )
}

export default Hidenavbar