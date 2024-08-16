import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import Loginlogo from './Assets/data-analysis.png'
import Sabpaisa from '../Assets/Group 35891.png'
import Logo2 from '../Assets/Group 46863.png'
import './Login.css';


const LoginForm = ({ setAuth}) => {

  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    const { email , password } = values;
    
    try {
      // Simulating an API call
      // const response = await axios.post('http://localhost:4000/login', { username, password });
      if (email === 'Kartik@gmail.com' && password === 'Kartik@790') {
        setAuth(true);
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        navigate('/dashboard');
      } else {
        alert('Username or password is incorrect');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('An error occurred. Please try again.');
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email must be in a valid format')
  
    .required('Required'),
    password: Yup.string()
    .required('Required')
  });


  return (
    
    
    <div className="login-container">
      <div className='left'>
        <div className='top'>
          <img src={Sabpaisa} alt='sabpaisa'></img>
        </div>
        <div className='middle'>
          <img src={Logo2} alt='login-img'></img>
        </div>
        <div className='bottom'>
          <h1>Login to Your Dashboard</h1>
          <p>One Payment Gateway for all your needs</p>
          <footer className='footer'>-------Need help? Contact us------- 
            <a href='mailto:support@sabpaisa.in'>support@sabpaisa.in</a><span>011-47323323</span> </footer>
        </div>
      </div>
      <div className='right'><div className="login-wrapper">
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
                <Field type="email" name="email" placeholder="Enter your username" />
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
        
      </div></div>
      
     
    </div>
    
  );
};

export default LoginForm;