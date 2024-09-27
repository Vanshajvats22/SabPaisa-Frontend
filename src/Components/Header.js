import React from 'react';
import './Header.css';
import Bell_icon from '../Assets/bell.svg'
import User_dp from '../Assets/man-438081_960_720.svg'

const Header = ()=> {
  return (
    <header className="header">
    <input type="text" className="search-bar" placeholder="Search" />
    <div className="user-info">
      <span className='bell-icon'><img src={Bell_icon}></img></span>
      <span className="user-image"><img src={User_dp} alt='userImage'></img></span>
      <span className="user-role">Admin</span>
    </div>
  </header>
  
  );
}

export default Header;