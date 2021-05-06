import { withStyles } from '@material-ui/core/styles';

import React from 'react';
import Spinner from '../reusable/spinner'

const Loading = props => {
    return (
      <span className={props.classes.container}>
        <Spinner size={50}/>
      </span>
    );
}

const useStyles = theme => ({
  container: {
    height: '100vh',
    width: '100wh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default withStyles(useStyles)(Loading);