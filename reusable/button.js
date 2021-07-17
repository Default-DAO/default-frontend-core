import React from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';

import keys from '../config/keys'

const Button = (props) => {
  const { classes, className, onClick, children, secondary } = props
  let style = secondary ? classes.secondary : classes.primary
  return (
    <div className={clsx(style, className ? className : '')} onClick={onClick}>
      <b>{children}</b>
    </div>
  )
}

const useStyles = theme => ({
  primary: props => {
    const { width, height, margin } = props    
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: keys.GRADIENT,
      color: keys.WHITE,
      width: width ? width : 'auto',
      height: height ? height : 'auto',
      outline: 'none',
      borderRadius: 50,
      cursor: 'pointer',
      transition: '0.2s',
      fontWeight: 'bold',
      padding: 10,
      margin: margin ? margin : 0,
      '&:hover': {
        opacity: 0.9,
        transition: '0.2s'
      },
      '&:active': {
        opacity: 0.8,
        transition: '0.2s'
      }
    }
  },
  secondary: props => {
    const { width, height, margin } = props    
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: keys.PRIMARY_COLOR,
      width: width ? width : 'auto',
      height: height ? height : 'auto',      
      borderRadius: 50,
      border: `2px solid ${keys.PRIMARY_COLOR}`,
      cursor: 'pointer',
      transition: '0.2s',
      fontWeight: 'bold',
      padding: 10,
      margin: margin ? margin : 0,
      '&:hover': {
        opacity: 0.9,
        transition: '0.2s'
      },
      '&:active': {
        opacity: 0.8,
        transition: '0.2s'
      }
    }
  }
});

export default withStyles(useStyles)(Button);