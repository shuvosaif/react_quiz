import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Form from '../components/Form'
import TextInput from '../components/TextInput'
import { useAuth } from '../contexts/AuthContext'

export default function LoginForm() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [error, setError] = useState()
  const [loading, setLoading] = useState()

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading('true')
      await login(email, password)
      navigate('/')
    } catch (error) {
      console.log(error)
      setLoading(true)
      setError('Failed TO login')
    }
  }

  return (
    <Form style={{ height: '330px' }} onSubmit={handleSubmit}>
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
      <Button disabled={loading} type='submit'>
        <span>Submit Now</span>
      </Button>

      {error && <p className='error'>{error}</p>}
      <div class='info'>
        Don't have an account? <Link to='/signup'>Signup</Link> instead.
      </div>
    </Form>
  )
}
