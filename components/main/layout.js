import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as actions from '../../redux/actions';
import Toast from '../../reusable/toast'
import Header from './header'
import UserSearch from '../modals/user-search'
import AddLiquidity from '../liquidity/add'
import SwapLiquidity from '../liquidity/swap'
import WithdrawLiquidity from '../liquidity/withdraw'

//layout to show topbar and navigation on every page
class Layout extends React.Component {   
    constructor(props) {
        super(props)
        
        this.state = {
            key: this.props.getUserReducer.key,
            navOpen: false
        };
    }

    componentDidMount() {
        //get user and save it to the reducer on app mount
        if (!this.props.getUserReducer.key) {            
            this.props.getUserAction();
        }
    }

    render() {
    const { classes, Component, route } = this.props;
    return (
        <div className={classes.root}>
            <Toast/>
            <CssBaseline />
            <Header 
                open={this.state.navOpen} 
                route={route} 
                closeNav={() => this.setState({navOpen: false})}
                startLoading={() => this.props.isLoadingAction(true)}
            />            
            <div className={classes.main}>
              {Component()}
            </div>
            <UserSearch
              open={this.props.showAddStakeNetworkReducer}
              close={() => this.props.showAddStakeNetworkAction(false)}
              title={'Add to stake network'}
              action={(selected) => {
                
                
              }}
            />
            <UserSearch
              open={this.props.showAddValueNetworkReducer}
              close={() => this.props.showAddValueNetworkAction(false)}
              title={'Add to value network'}
              action={(selected) => {
                
                
              }}
            />
            <AddLiquidity
              open={this.props.showAddLiquidityReducer}
              close={() => this.props.showAddLiquidityAction(false)}
            />
            <SwapLiquidity
              open={this.props.showSwapLiquidityReducer}
              close={() => this.props.showSwapLiquidityAction(false)}
            />
            <WithdrawLiquidity
              open={this.props.showWithdrawLiquidityReducer}
              close={() => this.props.showWithdrawLiquidityAction(false)}
            />
        </div>
    );
    }
}

const useStyles = theme => ({
    root: {
      display: 'flex',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'hidden'
    },
    main: {
      flex: 1
    }
})

function mapStateToProps(reducers) {
    return {...reducers};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
        {...actions},
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Layout));