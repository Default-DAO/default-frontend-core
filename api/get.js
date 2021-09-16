import axios from 'axios'
import * as web3 from './web3'
import operatorAbi from '../abi/operator.json'
import membersAbi from '../abi/members.json'
import keys from '../config/keys'
const operatorAddress = '0x260aed4d82CFC5d4c91da6720dB3356a2F8b7A5f'  

export const getProtocol = async ({ params, store }) => {
  try {
    const w3 = web3.getWeb3();
    const operatorContract = new w3.eth.Contract(operatorAbi, operatorAddress);

    const epoch = await operatorContract.methods.currentEpoch().call()
    console.log(epoch)
    return epoch
  } catch(err) {
    console.log("getProtocol: ", err)
  }
}

export const getMember = async ({ params, store }) => {
  try {  
    const w3 = web3.getWeb3();
    const operatorContract = new w3.eth.Contract(operatorAbi, operatorAddress);

    let ethAddress = await web3.getEthAddress()

    let membersAddress = await operatorContract.methods.Members().call()
    let membersContract = new w3.eth.Contract(membersAbi, membersAddress);

    let isMember = await membersContract.methods.isMember(ethAddress).call()
    
    if (isMember) {
      const member = {
        ethAddress,
        alias: ethAddress
      }
      store.setMember(member)
      return member
    } else {
      throw new Error('not registered')
    }
  } catch (err) {
    console.log("getMember: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get member", reason: 'error' })
  }
}

export const getMembers = async ({ params, store }) => {
  try {    
    const w3 = web3.getWeb3();
    const operatorContract = new w3.eth.Contract(operatorAbi, operatorAddress);

    let membersAddress = await operatorContract.methods.Members().call()
    let membersContract = new w3.eth.Contract(membersAbi, membersAddress);

    let members = await membersContract.methods.getMembers().call()

    members = members.map(ethAddress => {
      return {
        ethAddress,
        alias: ethAddress
      }
    })

    return members

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

export const getAllocationsTo = async ({ params, store }) => {
  try {    
    return {
      allocationsToAmount: 0, 
      allocationsTo: []
    }
  } catch (err) {
    console.log("getAllocationsTo: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get allocations. Please try again later", reason: 'error' })
  }
}

export const getAllocationsFrom = async ({ params, store }) => {
  try {    
    return {
      allocationsFromAmount: 0,
      allocationsFrom: []
    }
  } catch (err) {
    console.log("getAllocations: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get allocations. Please try again later", reason: 'error' })
  }
}

export const getMemberUsdcHistory = async({params, store}) => {
  try {
    return []
  } catch(err) {
    console.log("getMemberUsdcHistory: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get usdc history. Please try again later", reason: 'error' })
  }
}

export const getMemberDntHistory = async({params, store}) => {
  try {
    return []
  } catch(err) {
    console.log("getMemberDntHistory: ", err)
    if (!store) return
    store.setShowToast({ show: true, text: "Couldn't get dnt history. Please try again later", reason: 'error' })
  }
}