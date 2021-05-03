import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
const shortid = require('shortid')

import { withStyles } from '@material-ui/core/styles';

import keys from '../config/keys'
import { useStoreApi } from '../store/provider'

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

const Avatar = (props) => {
  const { classes, user } = props
  if (user.image) {
    return <img className={clsx(classes.avatar)} src={user.image}></img>
  } else {
    let aliasLetter = 'Ð'
    if (user.alias) aliasLetter = user.alias[0]
    return <div className={clsx(classes.noImage, classes.avatar)}>{aliasLetter}</div>
  }
}

const hashStr = (str, range) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);
      hash += charCode;
  }
  
  return hash % range;
}

const useStyles = theme => ({
  avatar: props => {
    const { size, margin } = props
    return {
      width: size ? size : 50,
      height: size ? size : 50,
      borderRadius: size ? size : 50 / 2,
      margin: margin ? margin : 0
    }
  },
  noImage: props => {
    let { size, user } = props
    if (!user) user = {}
    if (!user.alias) user.alias = shortid.generate()

    let randomColor = pastelColors[ hashStr(user.alias, pastelColors.length) ]
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

export default withStyles(useStyles)(Avatar);