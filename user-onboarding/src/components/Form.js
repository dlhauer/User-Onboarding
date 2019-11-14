import React from 'react';
import { withFormik, Form, Field, setNestedObjectValues } from 'formik';

function UserForm({ values }) {
  
  return (  
    <div className='user-form'>
      <Form>
        <Field type='text' name='username' placeholder='username'/>
        <Field type='email' name='email' placeholder='email'/>
        <Field type='text' name='password' placeholder='password'/>
        <label>
          I haven't read the <a href='https://youtu.be/dQw4w9WgXcQ'>terms of service</a>, but I agree to them anyway.
          <Field as='checkbox' name='terms' checked={values.terms}/>
        </label>
        <button>Submit</button>
      </Form>
    </div>
  );
}

const FormikUserForm = withFormik( {
  mapPropsToValues({ username, email, password, terms }) {
    return {
      username: username || '',
      email: email || '',
      password: password || '',
      terms: terms || false,
    }
  }
})(UserForm);

export default FormikUserForm;