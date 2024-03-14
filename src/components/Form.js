import classes from '../styles/Form.module.css'
import React from 'react'

export default function Form({ children, className, ...rest }) {
  return (
    <form className={`${className} ${classes.form}`} action='#' {...rest}>
      {children}
    </form>
  )
}
