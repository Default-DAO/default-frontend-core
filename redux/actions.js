import axios from 'axios';
import keys from '../config/keys';

//Action that shows the status of the toast after user saves
export const showToastAction = (show, text, type) => {    
    if (!text) text = ''
    if (!type) type = 'success'
    return {
        type: keys.SHOW_TOAST,
        payload: {show, text, type}
    }
}

//Action that shows the status of the loading screen
export const isLoadingAction = (isLoading) => {        
    return {
        type: keys.IS_LOADING,
        payload: isLoading
    }
}

//Thunk middleware and action for getting user from the server
export const getUserAction = () => {
    return dispatch => {
        axios.get(process.env.APP_URL + '/api/user')
        .then(res => {            
            dispatch(getUserResolveAction(res.data))            
        }).catch(err => {
            console.log('Failed getting user: ',err)
        })
    }
}

export const getUserResolveAction = (user) => {
    return {
        type: keys.GET_USER,
        payload: user
    }
}


// POOL & PROTOCOL
export const getPoolAction = () => {
  return dispatch => {
      axios.get(process.env.APP_URL + '/api/pool')
      .then(res => {            
          dispatch(getPoolResolveAction(res.data))
      }).catch(err => {
          console.log('Failed getting user: ',err)
      })
  }
}

export const getPoolResolveAction = (user) => {
  return {
      type: keys.GET_POOL,
      payload: user
  }
}

export const getProtocolAction = () => {
  return dispatch => {
      axios.get(process.env.APP_URL + '/api/protocol')
      .then(res => {            
          dispatch(getProtocolResolveAction(res.data))            
      }).catch(err => {
          console.log('Failed getting user: ',err)
      })
  }
}

export const getProtocolResolveAction = (user) => {
  return {
      type: keys.GET_PROTOCOL,
      payload: user
  }
}


//LIQUIDITY
export const showAddLiquidityAction = (open) => {        
  return {
      type: keys.SHOW_ADD_LIQUIDITY,
      payload: open
  }
}

export const showSwapLiquidityAction = (open) => {        
  return {
      type: keys.SHOW_SWAP_LIQUIDITY,
      payload: open
  }
}

export const showWithdrawLiquidityAction = (open) => {        
  return {
      type: keys.SHOW_WITHDRAW_LIQUIDITY,
      payload: open
  }
}

export const showAddStakeNetworkAction = (open) => {        
  return {
      type: keys.SHOW_ADD_STAKE_NETWORK,
      payload: open
  }
}

export const showAddValueNetworkAction = (open) => {
  return {
      type: keys.SHOW_ADD_VALUE_NETWORK,
      payload: open
  }
}
