import React, { useReducer, useContext, createContext } from 'react'
import keys from '../config/keys';

const StoreContext = createContext()
const initialState = {
  showToast: { show: false, text: '', reason: 'success' },
  isLoading: false,
  user: {},
  pool: {},
  protocol: {},

  showAddLiquidity: false,
  showSwapLiquidity: false,
  showWitdhrawLiquidity: false,
  showStakeLiquidity: false,
  showAddStakeNetwork: false,
  showAddValueNetwork: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case keys.SHOW_TOAST:
      return {
        ...state,
        showToast: action.showToast
      }
    case keys.IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case keys.GET_USER:
      return {
        ...state,
        user: action.user
      }
    case keys.GET_POOL:
      return {
        ...state,
        pool: action.pool
      }
    case keys.GET_PROTOCOL:
      return {
        ...state,
        protocol: action.protocol
      }
      
    case keys.SHOW_ADD_LIQUIDITY:
      return {
        ...state,
        showAddLiquidity: action.showAddLiquidity
      }
    case keys.SHOW_SWAP_LIQUIDITY:
      return {
        ...state,
        showSwapLiquidity: action.showSwapLiquidity
      }
    case keys.SHOW_WITHDRAW_LIQUIDITY:
      return {
        ...state,
        showWitdhrawLiquidity: action.showWitdhrawLiquidity
      }
    case keys.SHOW_ADD_STAKE_NETWORK:
      return {
        ...state,
        showAddStakeNetwork: action.showAddStakeNetwork
      }
    case keys.SHOW_ADD_VALUE_NETWORK:
      return {
        ...state,
        showAddValueNetwork: action.showAddValueNetwork
      }
    default:
      return {
        ...state
      }
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);

export const useStoreApi = () => {
  const { state, dispatch } = useStore()
  if (!state) return {}
  return {
    user: state.user,
    showToast: state.showToast,
    isLoading: state.isLoading,
    pool: state.pool,
    protocol: state.protocol,

    showAddLiquidity: state.showAddLiquidity,
    showSwapLiquidity: state.showSwapLiquidity,
    showWitdhrawLiquidity: state.showWitdhrawLiquidity,
    showStakeLiquidity: state.showStakeLiquidity,
    showAddStakeNetwork: state.showAddStakeNetwork,
    showAddValueNetwork: state.showAddValueNetwork,

    setUser: user => {
      dispatch({
        type: keys.GET_USER,
        user
      })
    },
    setShowToast: (show, text, reason) => {
      if (!text) text = ''
      if (!reason) reason = 'success'
      dispatch({
        type: keys.SHOW_TOAST,
        showToast: {
          show, text, reason
        }
      })
    },
    setIsLoading: isLoading => {
      dispatch({
        type: keys.IS_LOADING,
        isLoading
      })
    },
    setPool: pool => {
      dispatch({
        type: keys.GET_POOL,
        pool
      })
    },
    setProtocol: protocol => {
      dispatch({
        type: keys.GET_PROTOCOL,
        protocol
      })
    },

    setShowAddLiquidity: showAddLiquidity => {
      dispatch({
        type: keys.SHOW_ADD_LIQUIDITY,
        showAddLiquidity
      })
    },
    setShowSwapLiquidity: showSwapLiquidity => {
      dispatch({
        type: keys.SHOW_SWAP_LIQUIDITY,
        showSwapLiquidity
      })
    },
    setShowWitdhrawLiquidity: showWitdhrawLiquidity => {
      dispatch({
        type: keys.SHOW_WITHDRAW_LIQUIDITY,
        showWitdhrawLiquidity
      })
    },
    setShowAddStakeNetwork: showAddStakeNetwork => {
      dispatch({
        type: keys.SHOW_ADD_STAKE_NETWORK,
        showAddStakeNetwork
      })
    },
    setShowAddValueNetwork: showAddValueNetwork => {
      dispatch({
        type: keys.SHOW_ADD_VALUE_NETWORK,
        showAddValueNetwork
      })
    }
  }
}