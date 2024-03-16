import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/App.css'
import AuthLayout from './AuthLayout'
import Layout from './Layout'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Signup from './pages/Signup'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route
              exact
              path='/signup'
              element={
                <PublicRoute>
                  <AuthLayout>
                    <Signup />
                  </AuthLayout>
                </PublicRoute>
              }
            />
            <Route
              exact
              path='/login'
              element={
                <PublicRoute>
                  <AuthLayout>
                    <Login />
                  </AuthLayout>
                </PublicRoute>
              }
            />
            <Route
              exact
              path='/quiz/:id'
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/result/:id'
              element={
                <PrivateRoute>
                  <Result />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  )
}
export default App
