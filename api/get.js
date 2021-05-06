import axios from 'axios'
import * as web3 from './web3'
import keys from '../config/keys'

export const getSignedMessage = async () => {
  try {
    let ethAddress = await web3.getEthAddress()
    let chainId = await web3.getChainId()
    const { data: { result } } = await axios.get(keys.API_URL + '/api/auth', {
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
  } catch(err) {

  }
}

export const getMember = async ({params, store}) => {
  try {
    const { data: { result } } = await axios.get(keys.API_URL + '/api/member', {
      params: {
        ...params
      }
    })
    return {...result.apiMember, ...result.txMember}
  } catch (err) {    
    if (!store) return
    store.setShowToast({show:true, text:"Couldn't get member", reason:'error'})
  }
}

export const getMembers = async (params) => {

}

export const getPool = async (params) => {
  
}

export const getProtocol = async (params) => {
  
}

export const getAllocations = async (params) => {
  
}

export const getStakes = async (params) => {
  
}