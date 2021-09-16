import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { mdiWalletGiftcard, mdiTrophyAward } from '@mdi/js';

import keys from '../config/keys'
import Text from '../reusable/text'
import Avatar from '../reusable/avatar'
import Card from '../reusable/card'
import Table from '../reusable/table'
import Weight from '../reusable/weight'
import Button from '../reusable/button'
import MemberSearch from '../components/modals/member-search'
import { useStoreApi } from '../store/provider'
import { format, round } from '../utils/money'

const Endorse = props => {
  const store = useStoreApi()
  const { getMember, getEpoch, setShowProfile, setShowToast } = store

  const [selectedEpoch, setSelectedEpoch] = useState(getEpoch().epoch)
  const [showMemberSearch, setShowMemberSearch] = useState(false)  

  useEffect(() => {
    
  }, [])

  function includes(array, cell) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].ethAddress == cell.ethAddress) return true
    }
    return false
  }

  function handleCellClick(cell) {
    const { ethAddress, alias } = cell
    setShowProfile({
      selectedTab: 0,
      selectedEpoch,
      ethAddress,
      alias
    })
  }

  const { classes } = props
  return (
    <div>
      <MemberSearch
        selected={[]}
        open={showMemberSearch}
        close={() => setShowMemberSearch(false)}
        title={'Choose people to reward'}
        action={(selected) => {
          let newSelected = []
          for (let i = 0; i < selected.length; i++) {
            if (selected[i].weight == undefined) selected[i].weight = 0
            if (!includes(newSelected, selected[i])) {
              newSelected.push(selected[i])
            }
          }
          setShowMemberSearch(false)
        }}
      />
    </div>
  )
}

const useStyles = theme => ({
  
});

export default withStyles(useStyles)(Endorse);