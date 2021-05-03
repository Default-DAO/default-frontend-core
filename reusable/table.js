import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import NoContent from './no-content'

const Table = props => {

  function renderEmptyTable() {
    const { text, subText, actionText, action, icon } = props
    if (!props.list || props.list.length <= 0) {
      return <NoContent
        text={text}
        subText={subText}
        actionText={actionText}
        icon={icon}
        action={action}
      />
    }
  }

  const { classes } = props
  return (
    <div className={classes.table}>
      {renderEmptyTable()}
      {props.list.map((object, index) => {
        return <span key={index}>
          {props.renderCell(object, index)}
        </span>
      })}
    </div>
  )
}

const useStyles = theme => ({
  table: props => {
    const { height, width } = props
    return {
      height: height ? height : '75vh',
      width: width ? width : 400,
      overflowY: 'auto',
      paddingRight: 10,
      marginTop: 20,
      borderRadius: 15
    }
  }
});

export default withStyles(useStyles)(Table);