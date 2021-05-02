import keys from '../config/keys';

//Reducer that shows the status of the toast after user saves
export const showToastReducer = (state = {show:false, text:'', type: 'success'}, action) => {
    switch (action.type) {
        case keys.SHOW_TOAST:
            state = action.payload
            return state;        
        default:            
            return state;
    }
}

//Reducer that shows the status of the loading screen
export const isLoadingReducer = (state = false, action) => {    
    switch (action.type) {
        case keys.IS_LOADING:
            state = action.payload
            return state;        
        default:            
            return state;
    }
}

export const getUserReducer = (state = {}, action) => {
    switch(action.type) {
        case keys.GET_USER:
            state = action.payload
            return state;
        default:
            return state;
    }
}

//PROTOCOL & POOL
export const getPoolReducer = (state = {}, action) => {
  switch(action.type) {
      case keys.GET_POOL:
          state = action.payload
          return state;
      default:
          return state;
  }
}

export const getProtocolReducer = (state = {}, action) => {
  switch(action.type) {
      case keys.GET_PROTOCOL:
          state = action.payload
          return state;
      default:
          return state;
  }
}



//LIQUIDITY
export const showAddLiquidityReducer = (state = false, action) => {    
  switch (action.type) {
      case keys.SHOW_ADD_LIQUIDITY:
          state = action.payload
          return state;        
      default:            
          return state;
  }
}

export const showSwapLiquidityReducer = (state = false, action) => {
  switch(action.type) {
      case keys.SHOW_SWAP_LIQUIDITY:
          state = action.payload
          return state;
      default:
          return state;
  }
}

export const showWithdrawLiquidityReducer = (state = false, action) => {
  switch(action.type) {
      case keys.SHOW_WITHDRAW_LIQUIDITY:
          state = action.payload
          return state;
      default:
          return state;
  }
}

export const showAddStakeNetworkReducer = (state = false, action) => {
  switch(action.type) {
      case keys.SHOW_ADD_STAKE_NETWORK:
          state = action.payload
          return state;
      default:
          return state;
  }
}

export const showAddValueNetworkReducer = (state = false, action) => {
  switch(action.type) {
      case keys.SHOW_ADD_VALUE_NETWORK:
          state = action.payload
          return state;
      default:
          return state;
  }
}