import React, { useState } from 'react';
import Sidebar from './Sidebar.js'
import Header from './Header.js';
import MainContent from './MainContent.js';
import TotalReports from './TotalReports.js'; // Import the component
import SuccessReports from './SucessReports.js'; // Import the component
import FailureReports from './FailureReports.js'; // Import the component
import PendingReports from './PendingReports.js'

import './Dashboard.css'


const Dashboard = () => {
  const [selectedField, setSelectedField] = useState('MainContent');

  //fetching the data from api

  

  // Function to render content based on the selected field

  const renderContent = () => {
    switch (selectedField) {
       
      case 'Dashboard':
        return <MainContent />; // Render TotalReports component

      case 'TotalReports':
        return <TotalReports />; // Render TotalReports component
      case 'SuccessReports':
        return <SuccessReports />; // Render SuccessReports component
      case 'FailureReports':
        return <FailureReports />; // Render FailureReports component
      case 'PendingReports':
          return <PendingReports />;   
      default:
        return <MainContent />; // Render main content by default
    }
  };



  return (
    <div className='box'>
      <div className='left-box'>
        <Sidebar setSelectedField={setSelectedField} />
      </div>
      <div className='main-box'>
        <Header />
        {renderContent()} {/* Render content based on the selected field */}
      </div>

    </div>
  );
};

export default Dashboard;