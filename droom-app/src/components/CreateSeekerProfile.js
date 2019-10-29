import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const CreateProfile = ({ errors, touched }) => {

    return (
        <Form className='setProfile'>
            <h1 className='title'>Set Up Employee Profile</h1>
            
            <Field className='field' type='text' name='name' placeholder='Full Name' />
            {touched.name && errors.name && <p className='error'>{errors.name}</p>}
            
            <Field className='field' type='text' name='email' placeholder='Email' />
            {touched.email && errors.email && <p className='error'>{errors.email}</p>}
            
            <Field className='field' type='text' name='phone_number' placeholder='Phone Number' />
            {touched.phone_number && errors.phone_number && <p className='error'>{errors.phone_number}</p>}

            <Field className='field' type='text' name='job_title' placeholder='Current Job Title' />
            {touched.job_title && errors.job_title && <p className='error'>{errors.job_title}</p>}
            
            <Field className='field' type='textarea' name='skills' placeholder='Skills' />
            {touched.skills && errors.skills && <p className='error'>{errors.skills}</p>}

            <button type='submit'>SUBMIT</button>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: (values) => {
        return {
            name: values.name || '',
            email: values.email || '',
            phone_number: values.phone_number || '',
            job_title: values.job_title || '',
            skills: values.skills || ''
          
    
        }
    },

    validationSchema: yup.object().shape({
        name: yup.string().required('*Name is required'),
        email: yup.string().email().required('*Email is required'),
        phone_number: yup.number().min(9).required('*Phone number is required'),
        job_title: yup.string().required('*Current job title is required'),
        skills: yup.string().required('*Skills are required')
    }),

    handleSubmit: (values, { setStatus, props }) => {
        console.log(values)
        axios.post('https://droomapi.herokuapp.com/api/sample/prospects', values)
            .then((res) => {
                setStatus(res.data)
                console.log(res)
                props.setProspects(res.data)
                props.history.push('./joblistings')
            })
            .catch((err) => {
                console.log('Error:', err)
            })
    }
})(CreateProfile)