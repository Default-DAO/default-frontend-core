import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { 
    isLoadingReducer, 
    showToastReducer, 
    getUserReducer,

    getPoolReducer,
    getProtocolReducer,
    showAddLiquidityReducer,
    showSwapLiquidityReducer,
    showWithdrawLiquidityReducer,
    showAddStakeNetworkReducer,
    showAddValueNetworkReducer
} from './reducers';

const reducer = combineReducers({ 
    isLoadingReducer, 
    showToastReducer,
    getUserReducer,

    getPoolReducer,
    getProtocolReducer,
    showAddLiquidityReducer,
    showSwapLiquidityReducer,
    showWithdrawLiquidityReducer,
    showAddStakeNetworkReducer,
    showAddValueNetworkReducer
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

export default store;