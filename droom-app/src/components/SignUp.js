import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const SignUp = ({ errors, touched }) => {

    return (
    <>
           <Form className="forms">
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
                  {touched.role && errors.role && <p className="error">{errors.role}</p>}
                  <Field component="select" name="role" 
                         type="select"
                         // value={value.role}
                         >
                             <option value="">Your role</option>
                             <option value="employee">Job Seeker</option>
                             <option value="employer">Company</option>
                  </Field> 
                  <button type="submit">
                         Submit
                  </button>
           </Form>
    </>
    )
}

export default withFormik({
    mapPropsToValues: (values) => {
           return {
                  username: values.username || '',
                  password: values.password || '',
                  role: values.role || '',
           }
    },
    validationSchema: yup.object().shape({
           username: yup.string().required("Username is required."),
           password: yup.string().required("Password is required."),
           role: yup.string().required("Role is required."),
    }),
    handleSubmit: (values, {setStatus, props}) => {
           
           axios.post('https://droomapi.herokuapp.com/api/sample/register', values)
           .then(response => {
                  setStatus(response.data)
                  console.log(response.data) 
                  props.setMembers(response.data)
                  values.role === 'employee' ? props.history.push('/employeeprofile') : props.history.push('/companyprofile')
           })
           .catch(err => {
                  console.log("Error:", err)
           })
    }
})(SignUp);