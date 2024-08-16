import React from 'react';
import './Header.css';

const Header = ()=> {
  return (
    <header className="header">
    <input type="text" className="search-bar" placeholder="Search" />
    <div className="user-info">
      <span className="user-name">vanshaj vats</span>
      <span className="user-role">Admin</span>
    </div>
  </header>
  
  );
}

export default Header;