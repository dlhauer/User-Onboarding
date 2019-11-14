import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

function UserForm({ values, errors, touched }) {
  
  return (  
    <div >
      <Form className='user-form'>

        <Field className='input' type='text' name='username' placeholder='username'/>
        {touched.username && errors.username && (<p>Whoa, whoa, whoa, you can't just go using my website without a username, pal!</p>)}

        <Field className='input' type='email' name='email' placeholder='email'/>
        {touched.email && errors.email && (<p>Nah, nah, you best get an email in there real quick, brah.</p>)}

        <Field className='input' type='password' name='password' placeholder='password'/>
        {touched.password && errors.password && (<p>Fine, don't enter a password. You'll never be able to access my awesome website ever again!</p>)}

        <label>
          <Field className='input' type='checkbox' name='terms' checked={values.terms}/>
          I haven't read the <a href='https://youtu.be/dQw4w9WgXcQ'> terms of service</a>, but I agree to them anyway.
          {touched.terms && errors.terms && (<p>Can't finish if you don't accept them there terms.</p>)}
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
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    terms: Yup.boolean(true).required(),
  }),

})(UserForm);

export default FormikUserForm;