import React from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';

import keys from '../config/keys'

const Form = (props) => {

  function handleChange(e) {
    e.stopPropagation()
    let value = e.target.value
    const { number, onChange, max } = props
    if (number) {
      if (max != undefined && Number(value) > max) return
      onChange(parseFloat(value))
    } else {
      onChange(value)
    }
  }

  const { classes, className, placeholder, label, value, disabled, number } = props
  return (
    <div className={classes.container}>
      {label ? <p className={classes.label}>{label}</p> : null}
      <input
        onClick={(e) => e.stopPropagation()}
        type={number ? 'number' : 'text'}
        className={clsx(classes.form, className ? className : '')}
        placeholder={placeholder}
        value={value || value == 0 ? value : ''}
        onChange={(e) => handleChange(e)}
        disabled={disabled ? disabled : false}
      />
    </div>
  )
}


const useStyles = theme => ({
  container: props => {

  },
  label: {
    color: keys.WHITE,
    opacity: 0.7,
    marginBottom: 3
  },
  form: props => {
    const { width, underline, margin, center } = props
    return {
      appearance: 'none',
      borderRadius: '0px',
      backgroundColor: 'rgba(0,0,0,0)',
      width: width ? width : '100%',
      borderWidth: underline ? `0px 0px 0.5px 0px` : 0,
      margin: margin ? margin : 0,
      borderStyle: `solid`,
      padding: `8px 0px 8px 0px`,
      textAlign: center ? 'center' : null,
      fontSize: 18,
      transition: '0.2s',
      color: keys.WHITE,
      '&:focus': {
        outline: 'none',
        opacity: 0.7,
        transition: '0.2s'
      },
      '&:placeholder': {
        fontSize: 18,
        opacity: 0.7
      }
    }
  }
});

export default withStyles(useStyles)(Form);