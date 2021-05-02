import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';

import {showToastAction} from '../redux/actions';
import keys from '../config/keys'

class Form extends React.Component {
  constructor(props){
      super(props)

      this.state = {
          
      }
  }

  handleChange(value) {
    const {number, onChange, max} = this.props
    if (number) {
      if (max != undefined && Number(value) > max) return
      onChange(parseFloat(value))
    } else {
      onChange(value)
    }
  }

  render() {
    const {classes, className, placeholder, label, value, disabled, number} = this.props
      return(
        <div className={classes.container}>
          {label ? <p className={classes.label}>{label}</p> : null}
          <input 
            type={number ? 'number' : 'text'}
            className={clsx(classes.form, className ? className : '')}
            placeholder={placeholder} 
            value={value || value == 0 ? value : ''}
            onChange={(e) => this.handleChange(e.target.value)}
            disabled={disabled ? disabled : false}
          />
        </div>
      )
  }
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
    const {width, underline, margin, center} = props
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

function mapDispatchToProps(dispatch){
  return bindActionCreators(
      {showToastAction},
      dispatch
  );
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(Form));