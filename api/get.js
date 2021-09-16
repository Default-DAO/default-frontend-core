export const getDaos = async ({ params, store }) => {
  try {
    return {}
  } catch (err) {
    console.log("getDaos: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get DAOs", reason: 'error' })
  }
}

export const getOS = async ({ params, store }) => {
  try {
    return {}
  } catch (err) {
    console.log("getOS: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get DAO info", reason: 'error' })
  }
}

export const getEpoch = async ({ params, store }) => {
  try {
    return {}
  } catch (err) {
    console.log("getEpoch: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get epoch", reason: 'error' })
  }
}

export const getMember = async ({ params, store }) => {
  try {  
    return {}
  } catch (err) {
    console.log("getMember: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get member", reason: 'error' })
  }
}

export const getMembers = async ({ params, store }) => {
  try {    
    return []
  } catch (err) {
    console.log("getMembers: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get members. Please try again later", reason: 'error' })
  }
}

export const getStake = async ({ params, store }) => {
  try {
    return {}
  } catch(err) {
    console.log("getStakesHistory: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get stake info. Please try again later", reason: 'error' })
  }
}

export const getStakeHistory = async ({ params, store }) => {
  try {
    return {}
  } catch(err) {
    console.log("getStakesHistory: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get stake history. Please try again later", reason: 'error' })
  }
}

export const getEndorsementInfo = async ({ params, store }) => {
  try {    
    return {}
  } catch (err) {
    console.log("getRewards: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get endorsement info. Please try again later", reason: 'error' })
  }
}

export const getEndorsementsFrom = async ({ params, store }) => {
  try {    
    return {}
  } catch (err) {
    console.log("getRewardsTo: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get endorsements. Please try again later", reason: 'error' })
  }
}

export const getEndorsementsTo = async ({ params, store }) => {
  try {    
    return {}
  } catch (err) {
    console.log("getRewards: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get endorsements. Please try again later", reason: 'error' })
  }
}

export const getRewardInfo = async ({ params, store }) => {
  try {    
    return {}
  } catch (err) {
    console.log("getRewardInfo: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get reward info. Please try again later", reason: 'error' })
  }
}

export const getRewardsTo = async ({ params, store }) => {
  try {    
    return {}
  } catch (err) {
    console.log("getRewardsTo: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get rewards. Please try again later", reason: 'error' })
  }
}

export const getRewardsFrom = async ({ params, store }) => {
  try {    
    return {}
  } catch (err) {
    console.log("getRewards: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get rewards. Please try again later", reason: 'error' })
  }
}

export const getVaults = async({params, store}) => {
  try {
    return []
  } catch(err) {
    console.log("getVaults: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get vault. Please try again later", reason: 'error' })
  }
}

export const getVaultHistory = async({params, store}) => {
  try {
    return []
  } catch(err) {
    console.log("getVaultHistory: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get vault history. Please try again later", reason: 'error' })
  }
}

export const getToken = async({params, store}) => {
  try {
    return []
  } catch(err) {
    console.log("getToken: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get token. Please try again later", reason: 'error' })
  }
}

export const getTokenHistory = async({params, store}) => {
  try {
    return []
  } catch(err) {
    console.log("getTokenHistory: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get token history. Please try again later", reason: 'error' })
  }
}