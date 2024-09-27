import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import './Total-reports.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination } from 'react-bootstrap';
import API_URL from '../Config';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  txn_id: Yup.string().optional(),
  paid_start_date: Yup.date().nullable(),
  paid_end_date: Yup.date().nullable().min(Yup.ref('paid_start_date'), 'To Date cannot be before From Date'),
  pg_pay_mode: Yup.string(),
  status: Yup.string(),
});

export default function TotalReports() {
  const [transactions, setTransactions] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [recordsPerPage] = useState(20); // Number of records per page
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [error, setError] = useState(null);

  const initialValues = {
    txn_id: '',
    paid_start_date: '',
    paid_end_date: '',
    pg_pay_mode: '',
    status: '', 
  };

  useEffect(() => {
    fetchTransactions(initialValues, currentPage);
  }, []);

  // Function to fetch data from the backend using POST method
  const fetchTransactions = async (values, page) => {
    const token = localStorage.getItem('refresh_token'); // Retrieve token from localStorage

    const postData = {
      txn_id: values.txn_id,
      paid_start_date: values.paid_start_date,
      paid_end_date: values.paid_end_date,
      pg_pay_mode: values.pg_pay_mode,
      status: values.status, // Use the status filter value
    };

    try {
      const response = await axios.post(API_URL.TRANSACTION_TOTAL_REPORTS, postData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      // Log the entire response for debugging
      console.log("Full API Response:", response.data);

      // Check if response.data is an array
      const transactionsData = Array.isArray(response.data) ? response.data : [];
      console.log("Transactions Data:", transactionsData);

      // Get headers from the keys of the first item in the array
      const headersData = transactionsData.length > 0 ? Object.keys(transactionsData[0]) : [];

      console.log("Headers Data:", headersData);

      // Filter transactions to only include successful ones
      const filteredTransactions = transactionsData.filter(transaction => transaction.status === 'FAILED');

      setTransactions(filteredTransactions);
      setHeaders(headersData || []); // Set headers from API response
      setTotalPages(Math.ceil(filteredTransactions.length / recordsPerPage));
      setCurrentPage(page); // Set current page
      setDisplayedTransactions(getPaginatedData(filteredTransactions, page)); // Update displayed data
      setError(null); // Clear any previous error

    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('No transactions found matching the provided filters.');
      } else {
        setError('Error fetching transactions');
      }
      console.error('Error fetching transactions:', error);
      setTransactions([]); // Clear transactions on error
    }
  };

  const getPaginatedData = (transactions, page) => {
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return transactions.slice(startIndex, endIndex);
  };

  // Handle form submission
  const handleSearch = (values) => {
    fetchTransactions(values, 1); // Reset to the first page on new search
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setDisplayedTransactions(getPaginatedData(transactions, pageNumber)); // Update displayed transactions
  };

  // Function to handle table filtering
  const filterTable = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#transactionTable tbody tr');
    rows.forEach(row => {
      const cells = row.getElementsByTagName('td');
      let showRow = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filterValue));
      row.style.display = showRow ? '' : 'none';
    });
  };

  // Error message
  const errorMessage = error && <div className="error-message">{error}</div>;

  return (
    <div className="MainContent">
      <section className="dashboard" id="sections">
        <div className='titleHeading'>Total - Reports</div>

        <div className="states">
          <div className="transaction-filters">
            <h2>Transaction Search Filters</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSearch}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="txn_id">Transaction ID</label>
                    <Field
                      type="text"
                      id="txn_id"
                      name="txn_id"
                      placeholder="Transaction ID"
                    />
                    {errors.txn_id && touched.txn_id && <div className="error">{errors.txn_id}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="paid_start_date">From Date</label>
                    <Field
                      type="date"
                      id="paid_start_date"
                      name="paid_start_date"
                    />
                    {errors.paid_start_date && touched.paid_start_date && <div className="error">{errors.paid_start_date}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="paid_end_date">To Date</label>
                    <Field
                      type="date"
                      id="paid_end_date"
                      name="paid_end_date"
                    />
                    {errors.paid_end_date && touched.paid_end_date && <div className="error">{errors.paid_end_date}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="pg_pay_mode">Payment Mode</label>
                    <Field as="select" id="pg_pay_mode" name="pg_pay_mode">
                      <option value="">Select An Option</option>
                      <option value="STATE BANK OF INDIA">STATE BANK OF INDIA</option>
                      <option value="HDFC">HDFC</option>
                      <option value="BOB">BOB</option>
                    </Field>
                    {errors.pg_pay_mode && touched.pg_pay_mode && <div className="error">{errors.pg_pay_mode}</div>}
                  </div>
                  <button type="submit" id="search-btn">Search</button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="client-transactions">
            <h2>Client Transactions</h2>

            <div className='clintbuttonInput'>
              <div className="clint_buttons">
                <button onClick={() => {}}>Copy</button>
                <button onClick={() => {}}>Excel</button>
                <button onClick={() => {}}>PDF</button>
                <button onClick={() => {}}>Print</button>
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

            <div className="table-responsive">
              <table id="transactionTable" className="table">
                <thead>
                  <tr>
                    {headers.length ? headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    )) : <th>No data available</th>}
                  </tr>
                </thead>
                <tbody>
                  {displayedTransactions.length ? (
                    displayedTransactions.map((transaction, rowindex) => (
                      <tr key={rowindex}>
                        {headers.map((header, cellIndex) => (
                          <td key={cellIndex}>{transaction[header] !== null ? transaction[header].toString() : 'N/A'}</td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={headers.length}>No data available in table</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination>
              <Pagination.Prev
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }).map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>

            {/* Error message display */}
            {errorMessage}

          </div>
        </div>
      </section>
    </div>
  );
}
