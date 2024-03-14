import React from 'react'
import { Link } from 'react-router-dom'
import classes from '../../styles/Signup.module.css'
import Button from '../Button'
import Checkbox from '../Checkbox'
import Form from '../Form'
import TextInput from './../TextInput'

export default function Signup() {
  return (
    <>
      <Form className={`${classes.signup}`}>
        <h1>Create An Account</h1>
        <TextInput type='text' placeholder='Enter A Name' icon='person' />
        <TextInput
          type='text'
          placeholder='Enter A Email'
          icon='alternate_email'
        />
        <TextInput type='password' placeholder='Enter A Password' icon='lock' />
        <TextInput
          type='password'
          placeholder='Confirm Password'
          icon='lock_clock'
        />

        <Checkbox text='I agree to the Terms &amp Conditions' />

        <Button>
          <span>Submit Now</span>
        </Button>

        <div className='info'>
          Already have an account? <Link to='/login'>Login</Link> instead.
        </div>
      </Form>
    </>
  )
}
