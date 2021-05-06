import React, { useReducer, useContext, createContext } from 'react'
import keys from '../config/keys';

export const StoreContext = createContext()
const initialState = {
  web3: undefined,
  ethAddress: undefined,
  ethBalance: undefined,
  chainId: undefined,

  showToast: { show: false, text: '', reason: 'success' },
  isLoading: false,
  member: {},
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
    case keys.WEB_3:
      return {
        ...state,
        web3: action.web3
      }
    case keys.ETH_ADDRESS:
      return {
        ...state,
        ethAddress: action.ethAddress
      }
    case keys.CHAIN_ID:
      return {
        ...state,
        chainId: action.chainId
      }
    case keys.ETH_BALANCE:
      return {
        ...state,
        ethBalance: action.ethBalance
      }
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
    case keys.MEMBER:
      return {
        ...state,
        member: action.member
      }
    case keys.POOL:
      return {
        ...state,
        pool: action.pool
      }
    case keys.PROTOCOL:
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
    web3: state.web3,
    ethAddress: state.ethAddress,
    ethBalance: state.ethBalance,
    chainId: state.chainId,

    member: state.member,
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

    setWeb3: web3 => {
      dispatch({
        type: keys.WEB_3,
        web3
      })
    },
    setEthAddress: ethAddress => {
      dispatch({
        type: keys.ETH_ADDRESS,
        ethAddress
      })
    },
    setEthBalance: ethBalance => {
      dispatch({
        type: keys.ETH_BALANCE,
        ethBalance
      })
    },
    setChainId: chainId => {
      dispatch({
        type: keys.ETH_BALANCE,
        chainId
      })
    },

    setMember: member => {
      dispatch({
        type: keys.MEMBER,
        member
      })
    },
    setShowToast: ({show, text, reason}) => {
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
        type: keys.POOL,
        pool
      })
    },
    setProtocol: protocol => {
      dispatch({
        type: keys.PROTOCOL,
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