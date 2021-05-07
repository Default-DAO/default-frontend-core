import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Card from '../reusable/card'
import Form from '../reusable/form'
import keys from '../config/keys'

const Weight = props => {

  const { classes, value, onChange, disabled } = props
  return (
    <Card className={classes.card} height={30}>
      <Form
        className={classes.form}
        placeholder="0"
        value={value ? value : ''}
        onChange={value => onChange(value)}
        center
        disabled={disabled ? disabled : false}
        number
        max={99}
      />
    </Card>
  )
}

const useStyles = theme => ({
  card: props => {
    return {
      background: props.value ? keys.GRADIENT : keys.DARK_GRAY,
      borderRadius: 13,
      padding: '22px 8px',
      maxWidth: 60,
      display: 'flex',
      alignItems: 'center'
    }
  },
  form: {
    fontWeight: 700,
  }
});

export default withStyles(useStyles)(Weight);