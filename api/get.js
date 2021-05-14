import axios from 'axios'
import * as web3 from './web3'
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
    authMsg.domain.chainId = chainId;

    const signature = await web3.getSignedMessage(ethAddress, authMsg)

    return { signature, ethAddress, chainId };
  } catch (err) {
    console.log("getSignedMessage: ", err)
    throw err
  }
}

export const getMember = async ({ params, store }) => {
  try {
    let { data: { result } } = await http.get('/api/member', {
      params: {
        ...params
      }
    })

    result = result ? result : {}
    let apiMember = result.apiMember ? result.apiMember : {}
    let txMember = result.txMember ? result.txMember : {}
    let member = { ...apiMember, ...txMember }
    store.setMember(member)
    return member
  } catch (err) {
    console.log("getMember: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get member", reason: 'error' })
  }
}

export const getMembers = async ({ params, store }) => {
  try {
    const { data: { result } } = await http.get('/api/ctMember/getMembers', {
      params: {
        ...params
      }
    })

    return result.members ? result.members : []
  } catch (err) {
    console.log("getMembers: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get allocations. Please try again later", reason: 'error' })
  }
}

export const getPool = async ({ params, store }) => {
  try {
    const { data: { result } } = await http.get('/api/ctPools')
    return result ? result : {}
  } catch(err) {
    console.log("getPool: ", err)
  }
}

export const getMemberPool = async ({ params, store }) => {
  try {
    const { data: { result } } = await http.get('/api/ctPools/member', {
      params: {
        ...params
      }
    })
    return result ? result : {}
  } catch(err) {
    console.log("getMemberPool: ", err)
  }
}

export const getProtocol = async ({ params, store }) => {
  try {
    const { data: { result } } = await http.get('/api/ctProtocol')
    let protocol = result.protocol ? result.protocol : {}

    store.setProtocol(protocol)
    return protocol
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
      allocationsTo.push({
        ethAddress, alias, weight
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
      allocationsFrom.push({
        ethAddress, alias, weight
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

export const getStakesTo = async ({ params, store }) => {
  try {
    //params: ethAddress, page, epoch
    let { data: { result } } = await axios.get(process.env.API_URL + '/api/txStakeDelegation/to', {
      params: {
        ...params
      }
    })
    result = result ? result : {}

    let delegationsTo = []
    result.delegationsTo ? result.delegationsTo.map((to, i) => {
      const {alias, ethAddress} = to.toTxMember
      const weight = to.weight
      delegationsTo.push({
        ethAddress, alias, weight
      })
    }) : null

    const {delegationsToAmount} = result
    return {delegationsToAmount, delegationsTo}
  } catch (err) {
    console.log("getStakesTo: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get stakes. Please try again later", reason: 'error' })
  }
}

export const getStakesFrom = async ({ params, store }) => {
  try {
    //params: ethAddress, page, epoch
    let { data: { result } } = await axios.get(process.env.API_URL + '/api/txStakeDelegation/from', {
      params: {
        ...params
      }
    })
    result = result ? result : {}

    let delegationsFrom = []
    result.delegationsFrom ? result.delegationsFrom.map((from, i) => {
      const {alias, ethAddress} = from.fromTxMember
      const weight = from.weight
      delegationsFrom.push({
        ethAddress, alias, weight
      })
    }) : null

    const {delegationsFromAmount} = result
    return {delegationsFromAmount, delegationsFrom}
  } catch (err) {
    console.log("getStakesFrom: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get stakes. Please try again later", reason: 'error' })
  }
}