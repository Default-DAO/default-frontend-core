import React, { useReducer, useContext, createContext } from 'react'
import keys from '../config/keys';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';

export const StoreContext = createContext()
const initialState = {
  web3: undefined,
  ethAddress: undefined,
  ethBalance: undefined,
  chainId: undefined,

  showProfile: { selectedTab: 0, selectedEpoch: 0, ethAddress: undefined, alias: '' },
  showToast: { show: false, text: '', reason: 'success' },
  showRegistration: false,
  isLoading: true,
  member: {},
  memberPool: {},
  protocol: {},

  showAddLiquidity: false,
  showStakeLiquidity: false,
  showSwapLiquidity: false,
  showWitdhrawLiquidity: false
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
    case keys.SHOW_PROFILE:
      return {
        ...state,
        showProfile: action.showProfile
      }
    case keys.SHOW_REGISTRATION:
      return {
        ...state,
        showRegistration: action.showRegistration
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
    case keys.MEMBER_POOL:
      return {
        ...state,
        memberPool: action.memberPool
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
    case keys.SHOW_STAKE_LIQUIDITY:
      return {
        ...state,
        showStakeLiquidity: action.showStakeLiquidity
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
    case keys.RESET:
      return {
        ...initialState,
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
    getMember: () => {
      let member = getLocalStorage(keys.MEMBER)
      if (member) {
        return member
      } else {
        return state.member
      }
    },
    memberPool: state.memberPool,
    getMemberPool: () => {
      let memberPool = getLocalStorage(keys.MEMBER_POOL)
      if (memberPool) {
        return memberPool
      } else {
        return state.memberPool
      }
    },
    protocol: state.protocol,
    getProtocol: () => {
      let protocol = getLocalStorage(keys.PROTOCOL)
      if (protocol) {
        return protocol
      } else {
        return state.protocol
      }
    },

    showToast: state.showToast,
    showProfile: state.showProfile,
    showRegistration: state.showRegistration,
    isLoading: state.isLoading,

    showAddLiquidity: state.showAddLiquidity,
    showStakeLiquidity: state.showStakeLiquidity,
    showSwapLiquidity: state.showSwapLiquidity,
    showWitdhrawLiquidity: state.showWitdhrawLiquidity,
    showStakeLiquidity: state.showStakeLiquidity,

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
        type: keys.CHAIN_ID,
        chainId
      })
    },

    setMember: member => {
      setLocalStorage(keys.MEMBER, member)
      dispatch({
        type: keys.MEMBER,
        member
      })
    },
    setMemberPool: pool => {
      setLocalStorage(keys.MEMBER_POOL, pool)
      dispatch({
        type: keys.MEMBER_POOL,
        pool
      })
    },
    setProtocol: protocol => {
      setLocalStorage(keys.PROTOCOL, protocol)
      dispatch({
        type: keys.PROTOCOL,
        protocol
      })
    },

    setShowToast: ({ show, text, reason }) => {
      if (!text) text = ''
      if (!reason) reason = 'success'
      dispatch({
        type: keys.SHOW_TOAST,
        showToast: {
          show, text, reason
        }
      })
    },
    setShowProfile: ({ selectedTab, selectedEpoch, ethAddress, alias }) => {
      if (!selectedEpoch) selectedEpoch = 0
      if (!selectedTab) selectedTab = 0
      dispatch({
        type: keys.SHOW_PROFILE,
        showProfile: {
          selectedTab, selectedEpoch, ethAddress, alias
        }
      })
    },
    setShowRegistration: showRegistration => {
      dispatch({
        type: keys.SHOW_REGISTRATION,
        showRegistration
      })
    },
    setIsLoading: isLoading => {
      dispatch({
        type: keys.IS_LOADING,
        isLoading
      })
    },

    setShowAddLiquidity: showAddLiquidity => {
      dispatch({
        type: keys.SHOW_ADD_LIQUIDITY,
        showAddLiquidity
      })
    },
    setShowStakeLiquidity: showStakeLiquidity => {
      dispatch({
        type: keys.SHOW_STAKE_LIQUIDITY,
        showStakeLiquidity
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

    reset: () => {
      setLocalStorage(keys.PROTOCOL, {})
      setLocalStorage(keys.MEMBER_POOL, {})
      setLocalStorage(keys.MEMBER, {})
      dispatch({
        type: keys.RESET
      })
    }
  }
}