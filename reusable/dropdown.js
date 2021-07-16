import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Dropdown = (props) => {
  const { classes, label, onChange, options, value } = this.props
  function renderOptions(options, value, onChange) {
    return (
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputProps={{
          name: 'selector',
          id: 'selector',
        }}
      >
        {options.map((option, i) => {
          return <MenuItem
            key={i}
            value={option.value ? option.value : option}>
            {option.name ? option.name : option}
          </MenuItem>
        })}
      </Select>
    )
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      {renderOptions(options, value, onChange)}
    </FormControl>
  )
}

const useStyles = theme => ({
  formControl: {
    marginBottom: 18,
    width: '100%'
  }
})

export default withStyles(useStyles)(Dropdown)