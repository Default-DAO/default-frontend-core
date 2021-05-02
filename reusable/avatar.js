import React from 'react';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import keys from '../config/keys'
import clsx from 'clsx';

const pastelColors = [
  "#B0E0E6",
  "#00CED1",
  "#F0FFF0",
  "#BC8F8F",
  "#FFD700",
  "#FF69B4",
  "#DEB887",
  "#8FBC8F",
  "#ADFF2F",
  "#708090",
  "#556B2F"
]

class Avatar extends React.Component {
  constructor(props){
      super(props)

      this.state = {
        
      }
  }

  render() {
    const {classes} = this.props
    let user = this.props.getUserReducer
    if (user.image) {
      return <img className={clsx(classes.avatar)} src={user.image}></img>
    } else {
      let aliasLetter = 'Ð'
      if (user.alias) aliasLetter = user.alias[0]
      return <div className={clsx(classes.noImage, classes.avatar)}>{aliasLetter}</div>
    }
  }
}

const useStyles = theme => ({
  avatar: props => {
    const {size, margin} = props
    return {
      width: size ? size : 50,
      height: size ? size : 50,
      borderRadius: size ? size : 50 / 2,
      margin: margin ? margin : 0
    }
  },
  noImage: props => {
    const {size} = props
    let randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)]
    return {
      backgroundColor: randomColor,
      fontWeight: 700,
      fontSize: (size ? size : 50) / 2.5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: keys.WHITE,
      opacity: 0.9
    }
  },

});

function mapStateToProps({getUserReducer}) {
  return {getUserReducer};
}

export default connect(mapStateToProps, null)(withStyles(useStyles)(Avatar));