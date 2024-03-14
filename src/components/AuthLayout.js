import React from 'react'
import Illustration from './Illustration'

export default function AuthLayout({ children }) {
  return (
    <>
      <div class='column'>
        <Illustration />
        {children}
      </div>
    </>
  )
}
