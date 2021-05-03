import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { mdiWalletGiftcard, mdiTrophyAward } from '@mdi/js';

import keys from '../config/keys'
import Text from '../reusable/text'
import Avatar from '../reusable/avatar'
import Card from '../reusable/card'
import Table from '../reusable/table'
import { useStoreApi } from '../store/provider'

const Network = props => {
  const store = useStoreApi()

  const [stakeNetwork, setStakeNetwork] = useState([])
  const [valueNetwork, setValueNetwork] = useState([...keys.DUMMY_USERS])

  function renderCell(cell) {
    const { classes } = props
    return <Card className={classes.cell}>
      <Avatar user={cell} size={40}></Avatar>
      <Text margin="0px 0px 0px 15px" fontSize={20}>{cell.alias}</Text>
    </Card>
  }

  const { classes } = props
  return (
    <div className={classes.network}>
      <div className={classes.left}>
        <span className={classes.textContainer}>
          <Text type="paragraph" fontSize={20} fontWeight={700}>Stake Network</Text>
          <AddIcon
            onClick={() => store.setShowAddStakeNetwork(true)}
            className={classes.icon}
            fontSize="small"
          />
        </span>
        <Table
          text='Your stake network is empty!'
          list={stakeNetwork}
          renderCell={value => renderCell(value)}
          icon={mdiWalletGiftcard}
          action={() => store.setShowAddStakeNetwork(true)}
        />
      </div>
      <div className={classes.right}>
        <span className={classes.textContainer}>
          <Text type="paragraph" fontSize={20} fontWeight={700}>Value Network</Text>
          <AddIcon
            onClick={() => store.setShowAddValueNetwork(true)}
            className={classes.icon}
            fontSize="small"
          />
        </span>
        <Table
          text='Your value network is empty!'
          list={valueNetwork}
          renderCell={value => renderCell(value)}
          icon={mdiTrophyAward}
          action={() => store.setShowAddValueNetwork(true)}
        />
      </div>
    </div>
  )
}

const useStyles = theme => ({
  network: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    overflowY: 'hidden',
    padding: '40px 200px',
  },
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 20px',
  },
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 20px',
  },
  cell: {
    marginBottom: 20,
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    transition: '0.2s',
    cursor: 'pointer',
    padding: '17px 20px',
    '&:hover': {
      opacity: 0.8,
      transition: '0.2s'
    }
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  icon: {
    color: keys.WHITE,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7
    }
  },
});

export default withStyles(useStyles)(Network);