import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

import Button from '../../reusable/button'
import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import Avatar from '../../reusable/avatar'
import { useStoreApi } from '../../store/provider'
import keys from '../../config/keys'
import Stakes from './stakes'
import Rewards from './rewards'
import Liquidity from './liquidity'
import EpochSelector from '../modals/epoch-selector'

const Profile = props => {
  const { classes } = props

  const store = useStoreApi()
  const { getMember, showProfile, setShowProfile } = store
  const { selectedTab, selectedEpoch, ethAddress, alias } = showProfile
  const [epochSelectorOpen, setEpochSelectorOpen] = useState(false)

  function close() {
    setShowProfile({})
  }

  function handleTab(e, value) {
    setShowProfile({ ...showProfile, selectedTab: value })
  }

  function setSelectedEpoch(epoch) {
    setShowProfile({ ...showProfile, selectedEpoch: epoch })
  }

  function renderHeader() {
    return <span className={classes.headerContainer}>
      <Avatar
        member={{
          alias, ethAddress
        }}
        size={40}
        margin='0px 0px 0px 14px'
      ></Avatar>
      <Text
        fontSize={20}
        fontWeight={700}
        margin='0px 0px 0px 14px'
      >
        @{alias}
      </Text>
    </span>
  }

  function renderTabs() {
    return <span className={classes.tabContainer}>
      <Tabs
        classes={{
          indicator: classes.tab,
        }}
        value={selectedTab} onChange={handleTab}>
        <Tab label="Stakes" id="stakes" />
        <Tab label="Rewards" id="rewards" />
        <Tab label="Liquidity" id="liquidity" />
      </Tabs>
      {selectedTab != 2 ? <Button
        onClick={() => setEpochSelectorOpen(true)}
        type="secondary" className={classes.epochButton} width={110}>
        Epoch {selectedEpoch}
      </Button> : null}
    </span>
  }

  function renderContent() {
    switch (selectedTab) {
      case (0):
        return <Stakes ethAddress={ethAddress} selectedEpoch={selectedEpoch} />
      case (1):
        return <Rewards ethAddress={ethAddress} selectedEpoch={selectedEpoch} />
      case (2):
        return <Liquidity ethAddress={ethAddress} selectedEpoch={selectedEpoch} />
      default:
        return null
    }
  }

  return (
    <Modal className={classes.modal} open={ethAddress ? true : false} close={close}>
      {renderHeader()}
      {renderTabs()}
      <br />
      {renderContent()}
      <EpochSelector
        open={epochSelectorOpen}
        close={() => setEpochSelectorOpen(false)}
        title={'Select epoch'}
        action={(selected) => {
          setSelectedEpoch(selected)
          setEpochSelectorOpen(false)
        }}
      />
    </Modal>
  )
}

const useStyles = theme => ({
  modal: {
    padding: '30px 20px',
    height: '90vh',
    width: '80vw'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px'
  },
  tabContainer: {
    width: '100%',
    padding: '0px 40px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  epochButton: {
    fontWeight: 700,
    fontSize: 15,
    padding: '8px 10px'
  },
  tab: {
    backgroundColor: keys.PRIMARY_COLOR,
    height: 1
  }
});

export default withStyles(useStyles)(Profile);