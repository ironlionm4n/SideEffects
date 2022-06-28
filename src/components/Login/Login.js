import React, { useContext, useEffect, useReducer, useRef } from 'react'
import AuthContext from '../../store/auth-context'
import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import Input from '../UI/Input'

// Can be created outside of the scope of the component function because none of the data inside Login Component will needed to be accessed, instead it will be passed in as arguments
const formReducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL_CHANGE': {
      return {
        emailValue: action.payload,
        emailValid: action.payload.includes('@'),
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValue.trim().length > 6,
        formValid: (state.emailValid && state.passwordValid) === true
      }
    }
    case 'INPUT_BLUR': {
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValue.includes('@'),
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValue.trim().length > 6,
        formValid: (state.emailValid && state.passwordValid) === true
      }
    }
    case 'PASSWORD_CHANGE': {
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValue.includes('@'),
        passwordValue: action.payload,
        passwordValid: action.payload.trim().length > 6,
        formValid: (state.emailValid && state.passwordValid) === true
      }
    }
    case 'FORM_VALIDITY': {
      return {
        ...state,
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
  const [formState, dispatchForm] = useReducer(formReducer, {
    emailValue: '',
    emailValid: false,
    passwordValue: '',
    passwordValid: false,
    formValid: false
  })
  console.log(formState)
  const context = useContext(AuthContext)
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  // Extracting a property from an object and assigning it an 'alias'
  const { emailValid: emailIsValid, passwordValid: passwordIsValid } = formState

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking Form Validity')
      dispatchForm({ type: 'FORM_VALIDITY' })
    }, 500)

    return () => {
      console.log('Form Validity')
      clearTimeout(identifier)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = event => {
    dispatchForm({ type: 'EMAIL_CHANGE', payload: event.target.value })
  }

  const passwordChangeHandler = event => {
    dispatchForm({ type: 'PASSWORD_CHANGE', payload: event.target.value })
  }

  const validateEmailHandler = () => {
    dispatchForm({ type: 'INPUT_BLUR' })
  }

  const validatePasswordHandler = () => {
    dispatchForm({ type: 'INPUT_BLUR' })
  }

  const submitHandler = event => {
    event.preventDefault()
    if (formState.formValid) {
      console.log(formState, "here")
      context.onLogin(formState.emailValue, formState.passwordValue)
    } else {
      console.log("here 2")
      if (formState.emailValid === false) {
        console.log("here 3")
        emailInputRef.current.focus()
      } else {
        console.log("here 4")
        passwordInputRef.current.focus()
      }
    }
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id='email'
          label='E-Mail'
          type='email'
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlue={validateEmailHandler}
          value={formState.emailValue}
        />
        <Input
          ref={passwordInputRef}
          id='password'
          label='Password'
          type='password'
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlue={validatePasswordHandler}
          value={formState.passwordValue}
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
