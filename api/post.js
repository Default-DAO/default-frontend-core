export const registerMember = async ({ params, store }) => {
  try {
    
  } catch (err) {
    console.log("registerMember: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to register member', reason: 'error' })
  }
}

//stake
export const mintEndorsements = async ({ params, store }) => {
  try {
    
  } catch (err) {
    console.log("mintEndorsements: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to mint endorsements', reason: 'error' })
  }
}

//reclaim stake
export const reclaimEndorsements = async ({ params, store }) => {
  try {
    
  } catch (err) {
    console.log("reclaimEndorsements: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to reclaim endorsements', reason: 'error' })
  }
}

export const giveEndorsement = async ({ params, store }) => {
  try {
    
  } catch (err) {
    console.log("giveEndorsement: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to give endorsement', reason: 'error' })
  }
}

export const withdrawEndorsement = async ({ params, store }) => {
  try {
    
  } catch (err) {
    console.log("withdrawEndorsement: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to withdraw endorsement', reason: 'error' })
  }
}

export const addLiquidity = async ({ params, store }) => {
  try {
    
  } catch (err) {
    console.log("addLiquidity: ", err)
    store.setShowToast({ show: true, text: 'Unable to add liquidity', reason: 'error' })
    return false
  }
}

export const withdrawLiquidity = async ({ params, store }) => {
  try {
    
  } catch (err) {
    console.log("withdrawLiquidity: ", err)
    store.setShowToast({ show: true, text: 'Unable to withdraw liquidity', reason: 'error' })
    return false
  }
}

//for later version
export const swapLiquidity = async ({ params, store }) => {
  try {

  } catch (err) {
    console.log("swapLiquidity: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to swap liquidity', reason: 'error' })
  }
}

export const registerPeerRewards = async ({ params, store }) => {
  try {

  } catch (err) {
    console.log("registerPeerRewards: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to register rewards', reason: 'error' })
  }
}

export const registerMining = async ({ params, store }) => {
  try {

  } catch (err) {
    console.log("registerMining: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to register for mining', reason: 'error' })
  }
}

export const claimPeerRewards = async ({ params, store }) => {
  try {
    
  } catch (err) {
    console.log("claimPeerRewards: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to claim peer rewards', reason: 'error' })
  }
}

export const claimMiningRewards = async ({ params, store }) => {
  try {

  } catch (err) {
    console.log("claimMiningRewards: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to claim mining rewards', reason: 'error' })
  }
}

export const saveAllocation = async ({ params, store }) => {
  try {

  } catch (err) {
    console.log("saveAllocation: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to save allocations', reason: 'error' })
  }
}


export const configureAllocation = async ({ params, store }) => {
  try {

  } catch (err) {
    console.log("configureAllocation: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: 'Unable to commit allocations', reason: 'error' })
  }
}
