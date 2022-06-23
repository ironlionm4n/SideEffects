import React, { useState, useReducer } from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

// Can be created outside of the scope of the component function because none of the data inside Login Component will needed to be accessed, instead it will be passed in as arguments
const formReducer = (state, action) => {

  switch(action.type) {
    case "EMAIL_CHANGE": {
      return {
        emailValue: action.payload,
        emailValid: action.payload.includes('@'),
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValue.trim().length > 6,
        formValid: (state.emailValid && state.passwordValid) === true
      }
    }
    case "EMAIL_INPUT_BLUR": {
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValue.includes('@'),
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValue.trim().length > 6,
        formValid: (state.emailValid && state.passwordValid) === true

      }
    }
    case "PASSWORD_CHANGE": {
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValue.includes('@'),
        passwordValue: action.payload,
        passwordValid: action.payload.trim().length > 6,
        formValid: (state.emailValid && state.passwordValid) === true
      }
    }
    case "PASSWORD_INPUT_BLUR": {
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValue.includes('@'),
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValue.trim().length > 6,
        formValid: (state.emailValid && state.passwordValid) === true
      }
    }
    default: {
      return {
        emailValue: '',
        emailValid: false,
        passwordValue: '',
        passwordValid: false,
        formValid: false
      }
    }
  }


}

const Login = props => {
  const [enteredPassword, setEnteredPassword] = useState('')
  const [passwordIsValid, setPasswordIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false)

  const [formState, dispatchForm] = useReducer(formReducer, {
    emailValue: '',
    emailValid: false,
    passwordValue: '',
    passwordValid: false,
    formValid: false
  })

  const emailChangeHandler = event => {
    dispatchForm({type: 'EMAIL_CHANGE', payload: event.target.value})
  }

  const passwordChangeHandler = event => {
    dispatchForm({type: 'PASSWORD_CHANGE', payload: event.target.value})
  }

  const validateEmailHandler = () => {
    dispatchForm({type: 'EMAIL_INPUT_BLUR'})
  }

  const validatePasswordHandler = () => {
    dispatchForm({type: 'PASSWORD_INPUT_BLUR'})
  }

  const submitHandler = event => {
    event.preventDefault()
    props.onLogin(formState.emailValid, formState.passwordValid)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.emailValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={formState.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={formState.passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formState.formValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
