import React from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';

import keys from '../config/keys'

class Button extends React.Component {
  constructor(props){
      super(props)

      this.state = {
          
      }
  }

  render() {
    const {classes, className, onClick, children} = this.props
    return(
        <div className={clsx(classes.button, className ? className : '')} onClick={onClick}>
          <b>{children}</b>
        </div>
    )
  }
}

const useStyles = theme => ({
  button: props => {
    const {width, height, type, gradient, margin} = props
    let background = type =='secondary' ? keys.GRAY : keys.PRIMARY_COLOR
    background = gradient ? keys.GRADIENT : background
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background,
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
  }
});

export default withStyles(useStyles)(Button);