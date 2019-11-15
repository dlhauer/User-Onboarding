import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function UserForm({ values, errors, touched, status }) {

  const [users, setUsers] = useState([]);

  useEffect( () => {
    status && setUsers( users => [...users, status])
  }, [status])
  
  return (  
    <div >
      <Form className='user-form'>

        <Field className='input' type='text' name='username' placeholder='username'/>
        {touched.username && errors.username && (<p>Whoa, whoa, whoa, you can't just go using my website without a username, pal!</p>)}

        <Field className='input' type='email' name='email' placeholder='email'/>
        {touched.email && errors.email && (<p>Nah, nah, you best get an email in there real quick, brah.</p>) || values.email === 'waffle@syrup.com' && (<p>Nope, that email is already taken</p>)}

        <Field className='input' type='password' name='password' placeholder='password'/>
        {touched.password && errors.password && (<p>Fine, don't enter a password. You'll never be able to access my awesome website ever again!</p>)}

        <label>
          <Field className='check-box' type='checkbox' name='terms' checked={values.terms}/>
          <p>I haven't read the <a href='https://youtu.be/Qw4w9WgXcQ'> terms of service</a>, but I agree to them anyway.</p>
          {touched.terms && errors.terms && (<p>Can't finish if you don't accept them there terms.</p>)}
        </label>
        <button>Submit</button>

        {users.map( user => (
          <ul>
            <li>username: {user.username}</li>
            <li>email: {user.email}</li>
            <li>password: {user.password}</li>
            {/* <li>terms: {user.terms}</li> */}
          </ul>
        ))}
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
    terms: Yup.boolean([true]).required(),
  }),
  handleSubmit(values, { setStatus, resetForm} ) {
    axios
      .post('https://reqres.in/api/users', values)
      .then( response => {
        setStatus(response.data)
        console.log(response);
      })
      .catch(err => console.log(err.response))
      .finally(resetForm())
  }
})(UserForm);

export default FormikUserForm;