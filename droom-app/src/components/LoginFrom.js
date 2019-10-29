import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup"
import axios from 'axios'

function LoginForm({ errors, touched }) {

    return (
        <div className="loginForm">
            <Form>
                <div>
                    {touched.username && errors.username && <p>{errors.username}</p>}
                    <Field 
                        type="username"
                        name="username"
                        placeholder="Username" />
                </div>
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field 
                        type="password" 
                        name="password" 
                        placeholder="Password" />
                </div>
                <button>Submit!</button>
            </Form>
        </div>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ username, password }) {
        return {
            username: username || "",
            password: password || ""
        };
    },
  
    validationSchema: Yup.object().shape({
        password: Yup.string()
            .min(6, "Password must be 6 characters or longer")
            .required("Password is required")
      }),

    handleSubmit(values) {
        console.log(values);
        
        axios.get('https://droomapi.herokuapp.com/api/sample/postings')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Server Error', error);
            })    
    }
})(LoginForm);
  
    export default FormikLoginForm;

/*Push Login btn

onClick function 


localstorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU3MjExNDQwMywiZXhwIjoxNTcyMjAwODAzfQ.e9wAmLlXpWKusdY_z6cl-7pMQn6yhMwe5DNLdLNq2Gk')
Push to next Route


create Var token (create in every component with an axios call)
const token = localstorage.getItem('token')

WHen axios.get 
axios.get(websiteaddress, token)


*/