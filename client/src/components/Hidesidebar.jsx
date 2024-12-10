import React from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
function Hidesidebar() {
    const location = useLocation();
    let sidebar;
    if (location.pathname !== '/login' && location.pathname !== '/signup') {
      sidebar = <Sidebar />;
    } else {
      sidebar = null;
    }
  return ( 
    <div>
     {sidebar}
    </div>
  )
}

export default Hidesidebar