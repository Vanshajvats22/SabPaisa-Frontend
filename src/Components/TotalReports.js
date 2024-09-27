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

  // Fetch the data initially when the component is mounted
  useEffect(() => {
    fetchTransactions(initialValues, 1); // Fetch transactions for the first page on mount
  }, []);

  // Function to fetch data from the backend using POST method
  const fetchTransactions = async (values, page) => {
    const token = localStorage.getItem('refresh_token'); // Retrieve token from localStorage

    const postData = {
      txn_id: values.txn_id,
      paid_start_date: values.paid_start_date,
      paid_end_date: values.paid_end_date,
      pg_pay_mode: values.pg_pay_mode,
      status: values.status,
    };

    try {
      const response = await axios.post(API_URL.TRANSACTION_TOTAL_REPORTS, postData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      // Assuming response.data is the list of transactions
      const data = response.data;
      if (Array.isArray(data)) {
        console.log('Data is an array');
      } else {
        console.log('Data is not an array');
      }

      // Get headers from the keys of the first item in the array
      const transactions = Array.isArray(data) ? data : [];
      const headers = transactions.length > 0 ? Object.keys(transactions[0]) : [];

      setTransactions(transactions || []);
      setHeaders(headers || []); // Set headers from API response
      setTotalPages(Math.ceil(transactions.length / recordsPerPage));
      setCurrentPage(page); // Set current page
      setDisplayedTransactions(getPaginatedData(transactions, page)); // Update displayed data
      setError(null); // Clear any previous error

    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('No transactions found matching the provided filters.');
      } else {
        setError('Error fetching transactions');
      }
      console.error('Error fetching transactions:', error);
      
      setTransactions([]); // Clear transactions on error
      setDisplayedTransactions([]);
    }
  };

  const getPaginatedData = (transactions, page) => {
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return transactions.slice(startIndex, endIndex);
  };

  // Handle search form submission
  const handleSearch = (values) => {
    fetchTransactions(values, 1); // Reset to the first page on new search
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Update the displayed data based on the current page
    setDisplayedTransactions(getPaginatedData(transactions, pageNumber));
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
                    {errors.txn_id && touched.txn_id ? (
                      <div className="error">{errors.txn_id}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="paid_start_date">From Date</label>
                    <Field
                      type="date"
                      id="paid_start_date"
                      name="paid_start_date"
                      placeholder="DD-MM-YYYY"
                    />
                    {errors.paid_start_date && touched.paid_start_date ? (
                      <div className="error">{errors.paid_start_date}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="paid_end_date">To Date</label>
                    <Field
                      type="date"
                      id="paid_end_date"
                      name="paid_end_date"
                      placeholder="DD-MM-YYYY"
                    />
                    {errors.paid_end_date && touched.paid_end_date ? (
                      <div className="error">{errors.paid_end_date}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="pg_pay_mode">Payment Mode</label>
                    <Field
                      as="select"
                      id="pg_pay_mode"
                      name="pg_pay_mode"
                    >
                      <option value="">Select An Option</option>
                      <option value="STATE BANK OF INDIA">STATE BANK OF INDIA</option>
                      <option value="HDFC">HDFC</option>
                      <option value="BOB">BOB</option>
                    </Field>
                    {errors.pg_pay_mode && touched.pg_pay_mode ? (
                      <div className="error">{errors.pg_pay_mode}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <Field as="select" id="status" name="status">
                      <option value="">Select An Option</option>
                      <option value="SUCCESS">SUCCESS</option>
                      <option value="FAILED">FAILED</option>
                      <option value="PENDING">PENDING</option>
                    </Field>
                    {errors.status && touched.status ? (
                      <div className="error">{errors.status}</div>
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
                    {headers.length ? (
                      headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))
                    ) : (
                      <th>No data available</th>
                    )}
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

            {/* Error message */}
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </section>
    </div>
  );
}
