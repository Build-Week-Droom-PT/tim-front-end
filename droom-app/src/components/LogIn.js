import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const LogIn = ({ errors, touched }) => {

    return (
    <>
           <Form className="forms">
                 <h1>Droom</h1>
                 <h2>Welcome Back!</h2>
                  {touched.username && errors.username && <p className="error">{errors.username}</p>}
                  <Field name="username" 
                         type="text" 
                         placeholder="Username" 
                         /> 
                  {touched.password && errors.password && <p className="error">{errors.password}</p>}
                  <Field name="password" 
                         type="password" 
                         placeholder="Password" 
                         /> 
                  <button type="login">
                         Log In
                  </button>
           </Form>
    </>
    )
}

export default withFormik({
    mapPropsToValues: (values) => {
           return {
                  username: values.username || '',
                  password: values.password || ''
           }
    },
    validationSchema: yup.object().shape({
           username: yup.string().required("Username is required."),
           password: yup.string().required("Password is required.")
    }),
    handleSubmit: (values, {setStatus, props}) => {
           axios.post('https://droomapi.herokuapp.com/api/auth/login', values)
           .then(response => {
                  setStatus(response.data)
                  localStorage.setItem('token', response.data.token);
                  console.log("token" ,localStorage.getItem('token'))
                  props.history.push('/joblistings')
           })
           .catch(err => {
                  console.log("Error:", err)
           })
    }
})(LogIn);