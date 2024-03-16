import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PublicRoute({ children }) {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (currentUser?.email) {
      navigate('/')
    }
  }, [currentUser, navigate])

  return children
}
