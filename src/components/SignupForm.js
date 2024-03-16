import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextInput from '../components/TextInput'
import { useAuth } from '../contexts/AuthContext'
import Button from './Button'
import Checkbox from './Checkbox'
import Form from './Form'

export default function SignupForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agree, setAgree] = useState('')

  const [error, setError] = useState()
  const [loading, setLoading] = useState()
  const { signup } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (password !== confirmPassword) {
      return setError('Password Dont match')
    }

    try {
      setError('')
      setLoading('true')
      await signup(email, password, username)
      navigate('/')
    } catch (error) {
      console.log(error)
      setLoading(true)
      setError('Failed TO Create Account')
    }
  }

  return (
    <Form style={{ height: '500px' }} onSubmit={handleSubmit}>
      <TextInput
        type='text'
        placeholder='Enter A Name'
        icon='person'
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        type='text'
        placeholder='Enter A Email'
        icon='alternate_email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type='password'
        placeholder='Enter A Password'
        icon='lock'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        type='password'
        placeholder='Confirm Password'
        icon='lock_clock'
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Checkbox
        text='I agree to the Terms &amp Conditions'
        required
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
      />

      <Button disabled={loading} type='submit'>
        <span>Submit Now</span>
      </Button>

      {error && <p className='error'>{error}</p>}

      <div className='info'>
        Already have an account? <Link to='/login'>Login</Link> instead.
      </div>
    </Form>
  )
}
