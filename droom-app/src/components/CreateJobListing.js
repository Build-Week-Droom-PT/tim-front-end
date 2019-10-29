import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const CreateJobListing = ({ errors, touched, status }) => {

    return (
        <Form className='forms'>
            <h2 className='title new-job'>Create New Job</h2>
            
            <Field type='text' name='position' placeholder='Position Title' />
            {touched.position && errors.position && <p className='error'>{errors.position}</p>}
            
            <Field type='textarea' name='req_skills' placeholder='Required Skills' />
            {touched.req_skills && errors.req_skills && <p className='error'>{errors.req_skills}</p>}

            <Field type='textarea' name='bonus_skills' placeholder='Bonus Skills' />
            {touched.bonus_skills && errors.bonus_skills && <p className='error'>{errors.bonus_skills}</p>}
            
            <button type='submit'>Submit</button>

        </Form>
    )
}

export default withFormik({
    mapPropsToValues: (values) => {
        console.log(values)
        return {
            position: values.position || '',
            req_skills: values.req_skills || '',
            bonus_skills: values.bonus_skills || '',
            company: values.companies.id,
        
        }
    },

    validationSchema: yup.object().shape({
        position: yup.string().required('Position title is required'),
        req_skills: yup.string().required('Skills are required'),
        bonus_skills: yup.string()
    }),

    handleSubmit: (values, { setStatus, props }) => {
        // console.log(values);
        axios.post('https://droomapi.herokuapp.com/api/sample/postings', values)
            .then((res) => {
                setStatus(res.data)
                console.log(res)
                props.history.push('/joblistings')
            })
            .catch((err) => {
                console.log('Error:', err)
            })
    }
})(CreateJobListing)