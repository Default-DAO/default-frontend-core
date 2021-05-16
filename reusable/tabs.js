import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Tabs = props => {
  const { classes, tabs } = props
  return (
    <Tabs
      value={props.value} onChange={props.handleChange} aria-label="tab-bar">
      {tabs.map((tab, i) => {
        return <Tab label={tab} id={i} />
      })}
    </Tabs>
  )
}

const useStyles = theme => ({
  tabs: props => {
    const { height, width } = props
    return {
      height: height ? height : '75vh',
      width: width ? width : 400,
      overflowY: 'auto',
      marginTop: 20,
      borderRadius: 15
    }
  }
});

export default withStyles(useStyles)(Tabs);