import React from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';

import keys from '../config/keys'

const Card = (props) => {
  const { onClick, classes, children, className } = props
  return (
    <div onClick={onClick} className={clsx(classes.card, className ? className : '')}>
      {children}
    </div>
  )
}

const useStyles = theme => ({
  card: props => {
    const { width, height, margin, gradient } = props
    return {
      background: gradient ? keys.GRADIENT : keys.GRAY,
      padding: 30,
      width: width ? width : 'auto',
      height: height ? height : 'auto',
      borderRadius: 30,
      margin: margin ? margin : 0
    }
  }
});

export default withStyles(useStyles)(Card);