import classes from './ProfileForm.module.css';
import React, { useRef, useContext } from 'react';
import AuthContext from '../Store/Auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef()
  const authctx = useContext(AuthContext)
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authctx.token,
          password: enteredNewPassword,
          returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        history.replace('/');
      })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;