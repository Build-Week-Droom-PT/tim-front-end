import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const CreateCompanyProfile = ({ errors, touched, status }) => {

    return (
        <Form className='forms'>
            <h2 className='title'>Set Up Company Profile</h2>
            
            <Field type='text' name='company_name' placeholder='Company Name' />
            {touched.company_name && errors.company_name && <p className='error'>{errors.company_name}</p>}
            
            <Field type='textarea' name='about_us' placeholder='About Us' />
            {touched.about_us && errors.about_us && <p className='error'>{errors.about_us}</p>}
            
            <button type='submit'>Submit</button>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: (values) => {
        return {
            company_name: values.company_name || '',
            about_us: values.about_us || ''
        }
    },

    validationSchema: yup.object().shape({
        company_name: yup.string().required('Company name is required'),
        about_us: yup.string().required('Description is required')
    }),

    handleSubmit: (values, { setStatus, props }) => {
        axios.post('https://droomapi.herokuapp.com/api/sample/employers', values)
            .then((res) => {
                setStatus(res.data)
                props.setNewCompany(res.data)
                props.history.push('/newjob')
            })
            .catch((err) => {
                console.log('Error:', err)
            })
    }
})(CreateCompanyProfile)