import React from 'react'
import { Link } from 'react-router-dom'
import classes from '../../styles/Login.module.css'
import Button from '../Button'
import Form from '../Form'
import TextInput from './../TextInput'

export default function Login() {
  return (
    <>
      <Form className={`${classes.login}`}>
        <h1>Login to your account</h1>
        <TextInput
          type='text'
          placeholder='Enter A Email'
          icon='alternate_email'
        />
        <TextInput type='password' placeholder='Enter A Password' icon='lock' />
        <Button>
          <span>Submit Now</span>
        </Button>
        <div class='info'>
          Don't have an account? <Link to='/signup'>Signup</Link> instead.
        </div>
      </Form>
    </>
  )
}
