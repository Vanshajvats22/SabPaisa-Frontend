import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReportChart } from './ReportDetails'; // Named export
// import DealsDetails from './DealsDetails';
import Icon1 from '../Assets/Group 3.png'
import Icon2 from '../Assets/Icon (1).png'
import Icon3 from '../Assets/Icon.png'
import Icon4 from '../Assets/Icon (2).png'
import './MainContent.css'


const MainContent = () => {

  // for fetching the data from api
  const [reportData, setReportData] = useState({
    totalReports: 100,
    successReports: 70,
    failureReports: 20,
    pendingReports: 10
  });

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get('https://your-backend-api.com/reports/today');
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, []);





  // Handle form submission
  const handleSubmit = (values) => {
    console.log('Selected Date Range:', values.dateRange);
  };




  return (
    <div className="MainContent">
       
     
      
        <section className="dashboard" id="sections">

          <div className="stats">


            <div className="stat-item" id="total-reports">
              <div className='up'>

                <div className='leftside'>
                  <span className="stat-title">Total Reports</span>
                  <span className="stat-value">{reportData.totalReports}</span>
                </div>

                <div className='righyside'>
                  <i>
                    <img src={Icon4} alt='img'></img>
                  </i>
                </div>

              </div>
              <div className='down'>
                <span className="stat-changeup">Last 24 Hours</span>
              </div>
            </div>


            <div className="stat-item" id="sucess-reports">
              <div className='up'>

                <div className='leftside'>
                  <span className="stat-title">Sucess Reports</span>
                  <span className="stat-value">{reportData.successReports}</span>
                </div>

                <div className='righyside'>
                  <i>
                    <img src={Icon1} alt='img'></img>
                  </i>
                </div>

              </div>
              <div className='down'>
                <span className="stat-changeup">Last 24 Hours</span>
              </div>
            </div>



            <div className="stat-item" id="failure-reports">
              <div className='up'>

                <div className='leftside'>
                  <span className="stat-title">Failure Reports</span>
                  <span className="stat-value">{reportData.failureReports}</span>
                </div>

                <div className='righyside'>
                  <i>
                    <img src={Icon3} alt='img'></img>
                  </i>
                </div>

              </div>
              <div className='down'>
                <span className="stat-changeup">Last 24 Hours</span>
              </div>
            </div>


            <div className="stat-item" id="pending-reports">
              <div className='up'>

                <div className='leftside'>
                  <span className="stat-title">Pending Reports</span>
                  <span className="stat-value">{reportData.pendingReports}</span>
                </div>

                <div className='righyside'>
                  <i>
                    <img src={Icon2} alt='img'></img>
                  </i>
                </div>

              </div>
              <div className='down'>
                <span className="stat-changeup">Last 24 Hours</span>
              </div>
            </div>


          </div>


          <div className="report-details">
            <ReportChart />
          </div>


          <div className="deals-details">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Location</th>
                  <th>Date - Time</th>
                  <th>Piece</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Apple Watch</td>
                  <td>6096 Marjolaine Landing</td>
                  <td>12.09.2019 - 12:53 PM</td>
                  <td>423</td>
                  <td>$34,295</td>
                  <td>Delivered</td>
                </tr>
              </tbody>
            </table>
          </div>

        </section>
      
    </div>
  );
}

export default MainContent;
