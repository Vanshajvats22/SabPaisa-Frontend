import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Sabpaisa from '../Assets/Group 35891 (1).svg';
import Logo2 from '../Assets/Group 46863.svg';
import './Login.css';
import API_URL from '../Config';

const LoginForm = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    const { email, password } = values;
    
    try {
      const response = await axios.post(API_URL.LOGIN, { email, password });
      
      if (response.status === 200) {
        const { access_token, refresh_token } = response.data;
        setAuth(true);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        console.log('Login successful:', response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert('Email or password is not valid');
        } else {
          alert('An error occurred. Please try again.');
        }
      } else {
        alert('An error occurred. Please try again.');
      }
      console.error('Login failed', error);
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email must be in a valid format'
      )
      .required('Required'),
    password: Yup.string()
      .required('Required')
  });

  return (
    <div className="login-container">
      <div className='left'>
        <div className='top'>
          <img src={Sabpaisa} alt='sabpaisa' />
        </div>
        <div className='middle'>
          <img src={Logo2} alt='login-img' />
        </div>
        <div className='bottom'>
          <h1>Login to Your Dashboard</h1>
          <p>One Payment Gateway for all your needs</p>
          <footer className='footer'>
            -------Need help? Contact us-------
            <a href='mailto:support@sabpaisa.in'>support@sabpaisa.in</a><span>011-47323323</span>
          </footer>
        </div>
      </div>
      <div className='right'>
        <div className="login-wrapper">
          <h1>Login </h1>
          <p>Login to your merchant account</p>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email ID *</label>
                  <Field type="email" name="email" placeholder="Enter your email" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <Field type="password" name="password" placeholder="Enter your password" />
                  <ErrorMessage name="password" component="div" className="error" />
                </div>

                <button type="submit" disabled={isSubmitting}>Login</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
