import axios from 'axios'
import { getSignedMessage, getMember, getProtocol } from './get'
let http = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin' : '*'
    }
});

export const registerMember = async ({ params, store }) => {
  try {
    const sign = await getSignedMessage({store})
    if (!sign) return
    const { signature, ethAddress, chainId } = sign
    const { data: { result } } = await http.post('/api/member/claim', {
      signature,
      ethAddress,
      chainId,
      alias: params.alias,
    })

    let member
    if (result.error && result.errorCode == 'alreadyClaimed') {
      member = await getMember({
        params: {
          ethAddress
        }
      })      
    } else {
      member = result;
    }

    await getProtocol({
      params: {},
      store
    })
    
    member = member ? member : {}
    let apiMember = member.apiMember ? member.apiMember : {}
    let txMember = member.txMember ? member.txMember : {}
    
    store.setMember({...apiMember, ...txMember})
    store.setShowRegistration(false)
    store.setEthAddress(ethAddress)

    return {...member.apiMember, ...member.txMember}
  } catch (err) {
    console.log("registerMember: ", err)
    if (err == 'notWhitelisted') {
      return store.setShowToast({ show: true, text: 'Not whitelisted yet. Please contact support!', reason: 'error' })
    }
    store.setShowToast({ show: true, text: 'Unable to register member', reason: 'error' })
  }
}

export const addLiquidity = async ({ params, store }) => {
  try {
    const { signature, ethAddress, chainId } = await getSignedMessage()
    const { data: { result } } = await http.post('/api/ctPools/addLiquidity', {
      signature,
      ethAddress,
      chainId,
      ...params
    })

    if (result.error && result.errorCode == 'overLimit') {
      return store.setShowToast({ show: true, text: 'You have reached your limit this epoch!', reason: 'error' })
    }

    if (!result.error) {
      store.setShowToast({ show: true, text: 'Successfully added liquidity!', reason: 'success' })
    }
  } catch (err) {
    console.log("addLiquidity: ", err)
    store.setShowToast({ show: true, text: 'Unable to add liquidity', reason: 'error' })
  }
}

export const swapLiquidity = async ({ params, store }) => {

}

export const withdrawLiquidity = async ({ params, store }) => {

}

export const stakeDnt = async ({ params, store }) => {
  try {
    const { signature, ethAddress, chainId } = await getSignedMessage()
    const { data: { result } } = await http.post('/api/txStakeDelegation/stake', {
      signature,
      ethAddress,
      chainId,
      amount: parseFloat(params.amount)
    })

    if (result.error && result.errorCode == 'alreadyOccurred') {
      return store.setShowToast({ show: true, text: "You've already staked this epoch", reason: 'error' })
    }

    if (result.error && result.errorCode == 'overLimit') {
      return store.setShowToast({ show: true, text: "You don't have sufficient tokens", reason: 'error' })
    }

    if (!result.error) {
      store.setShowToast({ show: true, text: 'Successfully staked tokens!', reason: 'success' })
    }
  } catch (err) {
    console.log("stakeDnt: ", err)
    store.setShowToast({ show: true, text: 'Unable to stake DNT', reason: 'error' })
  }
}

export const delegateStakes = async ({ params, store }) => {
  try {
    const { signature, ethAddress, chainId } = await getSignedMessage()

    let delegations = [...params.delegations]
    for (let i = 0; i < delegations.length; i++) {
      let delegation = delegations[i]
      delegations[i] = {
        fromEthAddress: ethAddress,
        toEthAddress: delegation.ethAddress,
        weight: delegation.weight
      }
    }
    const { data: { result } } = await http.post('/api/txStakeDelegation/send', {
      signature,
      ethAddress,
      chainId,
      delegations
    })

    if (!result.error) {
      return store.setShowToast({ show: true, text: 'Successfully delegated stakes!', reason: 'success' })
    }
  } catch (err) {
    console.log("delegateStakes: ", err)
    store.setShowToast({ show: true, text: 'Unable to save delegations', reason: 'error' })
  }
}

export const allocateRewards = async ({ params, store }) => {
  try {
    const { signature, ethAddress, chainId } = await getSignedMessage()

    let allocations = [...params.allocations]
    for (let i = 0; i < allocations.length; i++) {
      let allocation = allocations[i]
      allocations[i] = {
        fromEthAddress: ethAddress,
        toEthAddress: allocation.ethAddress,
        weight: allocation.weight
      }
    }

    const { data: { result } } = await http.post('/api/txValueAllocation/send', {
      signature,
      ethAddress,
      chainId,
      allocations
    })

    if (!result.error) {
      store.setShowToast({ show: true, text: 'Successfully allocated rewards!', reason: 'success' })
    }
  } catch (err) {
    console.log("allocateRewards: ", err)
    store.setShowToast({ show: true, text: 'Unable to save rewards', reason: 'error' })
  }
}
