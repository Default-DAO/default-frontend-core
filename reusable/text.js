import React from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';

import keys from '../config/keys'

class Text extends React.Component {
  constructor(props){
      super(props)

      this.state = {
          
      }
  }

  renderText() {
    const {classes, type, children, className} = this.props

    switch(type) {
      case('heading'):
        return <h1 className={clsx(classes.text, className ? className : '')}>{children}</h1>
      case('subheading'):
        return <h2 className={clsx(classes.text, className ? className : '')}>{children}</h2>
      case('paragraph'):
        return <p className={clsx(classes.text, className ? className : '')}>{children}</p>
      default:
        return <p className={clsx(classes.text, className ? className : '')}>{children}</p>
    }
  }

  render() {
      return(
          this.renderText()
      )
  }
}

const useStyles = theme => ({
  text: props => {
    const {fade, fontSize, fontWeight, margin, center} = props
    let color = fade ? 'gray' : 'white'
    return {
      fontSize: fontSize ? fontSize : null,
      fontWeight: fontWeight ? fontWeight: 300,
      color,
      margin: margin ? margin : 0,
      textAlign: center ? 'center' : null
    }
  }
});

export default withStyles(useStyles)(Text);