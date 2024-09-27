import React, { useState } from 'react';
import logo from "../Assets/Group 46312.svg";
import { useNavigate } from 'react-router-dom'; 
import './Sidebar.css'

// const Menu = ()=>{
//   const [activeItem,setActiveItem] = useState('dash');
// }
const Sidebar = ({ setSelectedField }) => {
 
  const navigate  = useNavigate(); 

  const [activeItem, setActiveItem] = useState('MainContent'); // Default active item

  const [isSidebarVisible, setSidebarVisible] = useState(false);



  const handleLogout = (e) => {
    e.preventDefault();

    
    localStorage.removeItem('authToken'); 

    
    navigate('/login');
  };

  
  const handleMenuItemClick = (field) => (e) => {
    e.preventDefault();
    setSelectedField(field);
    setActiveItem(field);
  };


  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  // const handleDashboardClick = (e) => {
  //   e.preventDefault();
    
    
  //   navigate('/dashboard', { replace: true }); 
  // };

  return (
    <>
    <button className="sidebar-toggle" onClick={toggleSidebar}>
        Menu
      </button>
      <aside className={`sidebar ${isSidebarVisible ? 'show' : ''}`}>
      <div className="logo">
        <img src={logo} alt="SabPaisa" />
      </div>
      <nav className="menu" id="sidebars">
        <a href="#" id="dash"  className={`menu-item ${activeItem === 'MainContent' ? 'active' : ''}`} onClick={handleMenuItemClick('MainContent')}>
          <span className="material-symbols-outlined" >dashboard</span>Dashboard
        </a>
        <a href="#" id="total" className={`menu-item ${activeItem === 'TotalReports' ? 'active' : ''}`} onClick={handleMenuItemClick('TotalReports')}>
          <span className="material-symbols-outlined">lab_profile</span>Total Reports
        </a>
        <a href="#" id="sucess" data-page="sucess-reports.html"  className={`menu-item ${activeItem === 'SuccessReports' ? 'active' : ''}`} onClick={handleMenuItemClick('SuccessReports')} >
          <span className="material-symbols-outlined">leaderboard</span>Success Report
        </a>
        <a href="#" id="failure" data-page="failure-reports.html"  className={`menu-item ${activeItem === 'FailureReports' ? 'active' : ''}`}  onClick={handleMenuItemClick('FailureReports')}>
          <span className="material-symbols-outlined">leaderboard</span>Failure Report
        </a>
        <a href="#" id="pending" data-page="pending-reports.html" className={`menu-item ${activeItem === 'PendingReports' ? 'active' : ''}`} onClick={handleMenuItemClick('PendingReports')}>
          <span className="material-symbols-outlined">leaderboard</span>Pending Report
        </a>
        <a href="#" id="setting" className="menu-item">
          <span className="material-symbols-outlined">settings</span>Settings
        </a>
        <a href="#" id="logout" className="menu-item" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>Logout
        </a>
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;
