import axios from 'axios'
import { getSignedMessage, getMember, getProtocol } from './get'
let http = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

export const registerMember = async ({ params, store }) => {
  try {
    const sign = await getSignedMessage({ store })
    if (!sign) return
    const { signature, ethAddress, chainId } = sign
    
    // member = member ? member : {}

    store.setMember({ ...apiMember, ...txMember })
    store.setShowRegistration(false)
    store.setEthAddress(ethAddress)

    return { ...member.apiMember, ...member.txMember }
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
