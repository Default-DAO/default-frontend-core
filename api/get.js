import axios from 'axios'
import * as web3 from './web3'
import keys from '../config/keys'

export const getSignedMessage = async () => {
  try {
    let ethAddress = await web3.getEthAddress()
    let chainId = await web3.getChainId()
    const { data: { result } } = await axios.get(process.env.API_URL + '/api/auth', {
      params: {
        ethAddress,
        chainId
      }
    })
    if (result.error) {
      throw result.errorCode;
    }
    let authMsg = result.authMsg;
    authMsg.domain.chainId = chainId;

    const signature = await web3.getSignedMessage(ethAddress, authMsg)

    return { signature, ethAddress, chainId };
  } catch (err) {

  }
}

export const getMember = async ({ params, store }) => {
  try {
    const { data: { result } } = await axios.get(process.env.API_URL + '/api/member', {
      params: {
        ...params
      }
    })
    console.log({ ...result.apiMember, ...result.txMember })
    return { ...result.apiMember, ...result.txMember }
  } catch (err) {
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get member", reason: 'error' })
  }
}

export const getMembers = async ({ params, store }) => {
  try {
    //page
    const { data: { result } } = await axios.get(process.env.API_URL + '/api/ctMember/getMembers', {
      params: {
        ...params
      }
    })

    // result : {
    //   members,
    //   error
    // }
    return result.members
  } catch (err) {
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get allocations. Please try again later", reason: 'error' })
  }
}

export const getPool = async ({ params, store }) => {
  try {
    const { data: { result } } = await axios.get(process.env.API_URL + '/api/ctPools')
    return result
  } catch(err) {

  }
}

export const getMemberPool = async ({ params, store }) => {
  try {
    const { data: { result } } = await axios.get(process.env.API_URL + '/api/ctPools/member', {
      params: {
        ...params
      }
    })
    return result
  } catch(err) {

  }
}

export const getProtocol = async ({ params, store }) => {
  try {
    const { data: { result } } = await axios.get(process.env.API_URL + '/api/ctProtocol')
    console.log("RE: ", result)
    store.setProtocol(result.protocol)
    return result.protocol
  } catch(err) {

  }
}

export const getAllocations = async ({ params, store }) => {
  try {
    //params: ethAddress, page, epoch
    const { data: { result } } = await axios.get(process.env.API_URL + '/api/txValueAllocation', {
      params: {
        ...params
      }
    })
    
    let allocationsTo = []
    result.allocationsTo.map((to, i) => {
      const {alias, ethAddress} = to.toTxMember
      const weight = to.weight
      allocationsTo.push({
        ethAddress, alias, weight
      })
    })

    let allocationsFrom = []
    result.allocationsFrom.map((from, i) => {
      const {alias, ethAddress} = from.fromTxMember
      const weight = from.weight
      allocationsFrom.push({
        ethAddress, alias, weight
      })
    })

    const {allocationsToAmount, allocationsFromAmount} = result
    return {allocationsToAmount, allocationsFromAmount, allocationsTo, allocationsFrom}
  } catch (err) {
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get allocations. Please try again later", reason: 'error' })
  }
}

export const getStakes = async ({ params, store }) => {
  try {
    //params: ethAddress, page, epoch
    const { data: { result } } = await axios.get(process.env.API_URL + '/api/txStakeDelegation', {
      params: {
        ...params
      }
    })
    
    let delegationsTo = []
    result.delegationsTo.map((to, i) => {
      const {alias, ethAddress} = to.toTxMember
      const weight = to.weight
      delegationsTo.push({
        ethAddress, alias, weight
      })
    })

    let delegationsFrom = []
    result.delegationsFrom.map((from, i) => {
      const {alias, ethAddress} = from.fromTxMember
      const weight = from.weight
      delegationsFrom.push({
        ethAddress, alias, weight
      })
    })

    const {delegationsToAmount, delegationsFromAmount} = result
    return {delegationsToAmount, delegationsFromAmount, delegationsTo, delegationsFrom}
  } catch (err) {
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get stakes. Please try again later", reason: 'error' })
  }
}