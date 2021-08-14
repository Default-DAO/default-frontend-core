import axios from 'axios'
import { getMember, getProtocol } from './get'
import operatorAbi from '../abi/operator.json'
import membersAbi from '../abi/members.json'
const operatorAddress = '0x260aed4d82CFC5d4c91da6720dB3356a2F8b7A5f'  

export const registerMember = async ({ params, store }) => {
  try {
    var w3 = web3.getWeb3();
    let operatorContract = new w3.eth.Contract(operatorAbi, operatorAddress);

    let ethAddress = await web3.getEthAddress()
    
    let membersAddress = await operatorContract.methods.Members().call()
    let membersContract = new w3.eth.Contract(membersAbi, membersAddress);

    let registeredMember = await membersContract.methods.registerMember(ethAddress).call()
    console.log(registeredMember)
    // store.setMember({ 
    //   ethAddress: registeredMember
    // })

    return {}
  } catch (err) {
    console.log("registerMember: ", err)
    if (err == 'notWhitelisted') {
      return store.setShowToast({ show: true, text: 'Not whitelisted yet. Please contact support!', reason: 'error' })
    }
    store.setShowToast({ show: true, text: 'Unable to register member', reason: 'error' })
  }
}

export const checkAddLiquidity = async ({ params, store }) => {
  try {
    
  } catch (err) {
    console.log("addLiquidity: ", err)
    store.setShowToast({ show: true, text: 'Unable to add liquidity', reason: 'error' })
    return false
  }
}

export const swapLiquidity = async ({ params, store }) => {

}

export const withdrawLiquidity = async ({ params, store }) => {

}

export const allocateRewards = async ({ params, store }) => {
  try {

    if (false) {
      store.setShowToast({ show: true, text: 'Successfully allocated rewards!', reason: 'success' })
    }
  } catch (err) {
    console.log("allocateRewards: ", err)
    store.setShowToast({ show: true, text: 'Unable to save rewards', reason: 'error' })
  }
}
