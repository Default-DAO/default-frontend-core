import axios from 'axios'
import * as web3 from './ethers'
import keys from '../config/keys'

let http = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: false,
  headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});

export const getSignedMessage = async () => {
  try {    
    let ethAddress = await web3.getEthAddress()
    let chainId = await web3.getChainId()    
    const { data: { result } } = await http.get('/api/auth', {
      params: {
        ethAddress,
        chainId
      }
    })
    if (result.error) {
      throw result.errorCode;
    }
    let authMsg = result.authMsg;
    authMsg.domain.chainId = chainId

    const signature = await web3.getSignedMessage(ethAddress, authMsg)

    return { signature, ethAddress, chainId };
  } catch (err) {
    console.log("getSignedMessage: ", err)
    throw err
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
    store.setShowToast({ show: true, text: "Couldn't get allocations. Please try again later", reason: 'error' })
  }
}

export const getPool = async ({ params, store }) => {
  try {
    return {}
  } catch(err) {
    console.log("getPool: ", err)
  }
}

export const getMemberPool = async ({ params, store }) => {
  try {
    return {}
  } catch(err) {
    console.log("getMemberPool: ", err)
  }
}

export const getProtocol = async ({ params, store }) => {
  try {
    return {}
  } catch(err) {
    console.log("getProtocol: ", err)
  }
}

export const getAllocationsTo = async ({ params, store }) => {
  try {
    //params: ethAddress, page, epoch
    let { data: { result } } = await http.get('/api/txValueAllocation/to', {
      params: {
        ...params
      }
    })
    result = result ? result : {}
    
    let allocationsTo = []
    result.allocationsTo ? result.allocationsTo.map((to, i) => {
      const {alias, ethAddress} = to.toTxMember
      const weight = to.weight
      const points = to.points
      allocationsTo.push({
        ethAddress, alias, weight, points
      })
    }) : null

    const {allocationsToAmount} = result
    return {allocationsToAmount, allocationsTo}
  } catch (err) {
    console.log("getAllocationsTo: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get allocations. Please try again later", reason: 'error' })
  }
}

export const getAllocationsFrom = async ({ params, store }) => {
  try {
    //params: ethAddress, page, epoch
    let { data: { result } } = await http.get('/api/txValueAllocation/from', {
      params: {
        ...params
      }
    })
    result = result ? result : {}

    let allocationsFrom = []
    result.allocationsFrom ? result.allocationsFrom.map((from, i) => {
      const {alias, ethAddress} = from.fromTxMember
      const weight = from.weight
      const points = from.points
      allocationsFrom.push({
        ethAddress, alias, weight, points
      })
    }) : null

    const {allocationsFromAmount} = result
    return {allocationsFromAmount, allocationsFrom}
  } catch (err) {
    console.log("getAllocations: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get allocations. Please try again later", reason: 'error' })
  }
}

export const getMemberUsdcHistory = async({params, store}) => {
  try {
    
  } catch(err) {
    console.log("getMemberUsdcHistory: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get usdc history. Please try again later", reason: 'error' })
  }
}

export const getMemberDntHistory = async({params, store}) => {
  try {
    
  } catch(err) {
    console.log("getMemberDntHistory: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get dnt history. Please try again later", reason: 'error' })
  }
}