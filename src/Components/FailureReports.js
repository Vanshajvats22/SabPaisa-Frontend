import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API calls
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import './Sucess.css';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  fromDate: Yup.date().required('From Date is required').nullable(),
  toDate: Yup.date().required('To Date is required').nullable().min(Yup.ref('fromDate'), 'To Date cannot be before From Date'),
  transactionType: Yup.string().required('Transaction Type is required'),
  status: Yup.string().required('Status is required'),
});

export default function FailureReports() {
  const [transactions, setTransactions] = useState([]);

  // Function to fetch data from the backend
  const fetchTransactions = async (values) => {
    try {
      // Replace with your API endpoint
      const response = await axios.get('/api/transactions', { params: values });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Handle form submission
  const handleSearch = (values) => {
    fetchTransactions(values);
  };

  // Function to handle table filtering
  const filterTable = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#transactionTable tbody tr');
    rows.forEach(row => {
      const cells = row.getElementsByTagName('td');
      let showRow = false;
      for (let cell of cells) {
        if (cell.textContent.toLowerCase().includes(filterValue)) {
          showRow = true;
          break;
        }
      }
      row.style.display = showRow ? '' : 'none';
    });
  };

  // Example functions for exporting and printing (implement as needed)
  const copyTable = () => { /* Copy table data logic */ };
  const exportToExcel = () => { /* Export to Excel logic */ };
  const exportToPDF = () => { /* Export to PDF logic */ };
  const printTable = () => { /* Print table logic */ };

  return (
    <div className="container">
     
     <div className='titleHeading'>Failure - Reports</div>

      <section className="dashboard" id="sections">
        <div className="states">
          <div className="transaction-filters">
            <h2>Transaction Search Filters</h2>
            <Formik
              initialValues={{
                name: '',
                fromDate: '',
                toDate: '',
                transactionType: '',
                status: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSearch}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">Filter By Name</label>
                    <Field as="select" id="name" name="name">
                      <option value="">Select An Option</option>
                      {/* Add more options as needed */}
                    </Field>
                    {errors.name && touched.name ? (
                      <div className="error">{errors.name}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="fromDate">From Date</label>
                    <Field
                      type="date"
                      id="fromDate"
                      name="fromDate"
                      placeholder="DD-MM-YYYY"
                    />
                    {errors.fromDate && touched.fromDate ? (
                      <div className="error">{errors.fromDate}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="toDate">To Date</label>
                    <Field
                      type="date"
                      id="toDate"
                      name="toDate"
                      placeholder="DD-MM-YYYY"
                    />
                    {errors.toDate && touched.toDate ? (
                      <div className="error">{errors.toDate}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="transactionType">Transaction Type</label>
                    <Field as="select" id="transactionType" name="transactionType">
                      <option value="">Select An Option</option>
                      {/* Add more options as needed */}
                    </Field>
                    {errors.transactionType && touched.transactionType ? (
                      <div className="error">{errors.transactionType}</div>
                    ) : null}
                  </div>
                  
                  <button type="submit" id="search-btn">
                    Search
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="client-transactions">
            <h2>Client Transactions</h2>
            <div className='clintbuttonInput'>
            <div className="clint_buttons">
              <button onClick={copyTable}>Copy</button>
              <button onClick={exportToExcel}>Excel</button>
              <button onClick={exportToPDF}>PDF</button>
              <button onClick={printTable}>Print</button>
            </div>
            <div className='clintInput'>
            <input
              type="text"
              id="filter"
              onKeyUp={filterTable}
              placeholder="Filter Results"
            />
            </div>
            </div>
            <table id="transactionTable">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Application ID</th>
                  <th>Paid Amount</th>
                  <th>Txn Id</th>
                  <th>Txn Date</th>
                  <th>Settlement Amount</th>
                  <th>Settlement Date</th>
                  <th>Settlement By</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length ? (
                  transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{transaction.applicationId}</td>
                      <td>{transaction.paidAmount}</td>
                      <td>{transaction.txnId}</td>
                      <td>{transaction.txnDate}</td>
                      <td>{transaction.settlementAmount}</td>
                      <td>{transaction.settlementDate}</td>
                      <td>{transaction.settlementBy}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8}>No data available in table</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
