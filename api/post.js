import axios from 'axios'
import keys from '../config/keys'
import { getSignedMessage, getMember } from './get'

export const registerMember = async ({ params, store }) => {
  try {
    const { signature, ethAddress, chainId } = await getSignedMessage()
    const { data: { result } } = await axios.post(process.env.API_URL + '/api/member/claim', {
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
      await getProtocol({
        params: {},
        store
      })
    } else {
      member = result;
    }

    store.setMember(member)
    store.setEthAddress(ethAddress)
    localStorage.setItem(keys.MEMBER, JSON.stringify(member))
    return member
  } catch (err) {
    store.setShowToast({ show: true, text: 'Unable to register member', reason: 'error' })
  }
}

export const addLiquidity = async ({ params, store }) => {
  try {
    const { signature, ethAddress, chainId } = await getSignedMessage()
    const { data: { result } } = await axios.post(process.env.API_URL + '/api/ctPools/addLiquidity', {
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
    console.log("ERR: ", err)
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
    const { data: { result } } = await axios.post(process.env.API_URL + '/api/txStakeDelegation/stake', {
      signature,
      ethAddress,
      chainId,
      amountDnt: parseFloat(params.amountDnt)
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
    const { data: { result } } = await axios.post(process.env.API_URL + '/api/txStakeDelegation/send', {
      signature,
      ethAddress,
      chainId,
      delegations
    })

    if (!result.error) {
      return store.setShowToast({ show: true, text: 'Successfully delegated stakes!', reason: 'success' })
    }
  } catch (err) {
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

    const { data: { result } } = await axios.post(process.env.API_URL + '/api/txValueAllocation/send', {
      signature,
      ethAddress,
      chainId,
      allocations
    })

    if (!result.error) {
      store.setShowToast({ show: true, text: 'Successfully allocated rewards!', reason: 'success' })
    }
  } catch (err) {
    store.setShowToast({ show: true, text: 'Unable to save rewards', reason: 'error' })
  }
}
