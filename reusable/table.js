import React from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';

import NoContent from './no-content'
import Spinner from './spinner'
const Table = props => {
  const { classes, className, text, subText, actionText, action, icon, list } = props

  function renderEmptyTable() {
    if (list == undefined) {
      return <span className={classes.loadingContainer}>
        <Spinner size={30}/>
      </span>
    }

    if (!list || list.length <= 0) {
      return <NoContent
        text={text}
        subText={subText}
        actionText={actionText}
        icon={icon}
        action={action}
      />
    }
  }

  function handleScroll(e) {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && props.onScroll) {
      props.onScroll()
    }
  }

  return (
    <div onScroll={handleScroll} className={clsx(classes.table, className ? className : '')}>
      {renderEmptyTable()}
      {list ? list.map((object, index) => {
        return <span key={index}>
          {props.renderCell(object, index)}
        </span>
      }) : null}
    </div>
  )
}

const useStyles = theme => ({
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  table: props => {
    const { height, width } = props
    return {
      height: height ? height : '75vh',
      width: width ? width : 400,
      overflowY: 'auto',
      overflowX: 'hidden',
      marginTop: 20,
      borderRadius: 15
    }
  }
});

export default withStyles(useStyles)(Table);