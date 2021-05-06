import axios from 'axios'
import keys from '../config/keys'
import { getSignedMessage, getMember } from './get'

export const registerMember = async ({ store }) => {
  try {
    const { signature, ethAddress, chainId } = await getSignedMessage()
    const { data: { result } } = await axios.post(keys.API_URL + '/api/member/claim', {
      signature,
      ethAddress,
      chainId
    })

    let member
    if (result.error && result.errorCode == 'alreadyClaimed') {
      member = await getMember({params: { 
        ethAddress 
      }})
    } else {
      member = result;
    }

    store.setMember(member)
    store.setEthAddress(ethAddress)
    localStorage.setItem(keys.MEMBER, JSON.stringify(member))
    return member
  } catch (err) {
    store.setShowToast({show: true, text: 'Unable to register member', reason:'error'})
  }
}

export const addLiquidity = async (params) => {

}

export const swapLiquidity = async (params) => {

}

export const withdrawLiquidity = async (params) => {

}

export const stakeDnt = async (params) => {

}

export const delegateStake = async (params) => {

}

export const allocateReward = async (params) => {

}
