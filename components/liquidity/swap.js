import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withStyles } from '@material-ui/core/styles';
import {mdiArrowDown} from '@mdi/js';
import Icon from '@mdi/react'

import {showToastAction} from '../../redux/actions';
import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import TokenForm from '../../reusable/token-form'
import Button from '../../reusable/button'
import keys from '../../config/keys'

class SwapLiquidity extends React.Component {
    constructor(props){
        super(props)

        this.state = {
          from: 'usdc',
          to: 'dnt',
          fromValue: '',
          toValue: ''
        }
    }

    handleSwitch(token, direction) {
      if (direction == 'from') {
        if (token == 'usdc') {
          this.setState({from: 'usdc', to: 'dnt', fromValue: '', toValue: ''})
        } else {
          this.setState({from: 'dnt', to: 'usdc', fromValue: '', toValue: ''})
        }
      } else {
        if (token == 'usdc') {
          this.setState({from: 'dnt', to: 'usdc', fromValue: '', toValue: ''})
        } else {
          this.setState({from: 'usdc', to: 'dnt', fromValue: '', toValue: ''})
        }
      }
    }

    render() {
      const {classes, open, close} = this.props
      const {from, to, fromValue, toValue} = this.state
      return(
        <Modal width={400} className={classes.modal} open={open} close={close}>
          <Text margin='0px 0px 25px 0px' center type="paragraph" fontSize={24} fontWeight={600} >Swap Liquidity</Text>
          <TokenForm
            currencies={['dnt', 'usdc']}
            value={fromValue}
            onValueChange={(value) => this.setState({fromValue: value})}
            selectedToken={from}
            onSelectedTokenChange={(token) => this.handleSwitch(token, 'from')}
            label="From"
          />
          <Icon path={mdiArrowDown}
              size={0.7}
              color={keys.WHITE}
              className={classes.icon}
          />
          <TokenForm
            currencies={['dnt', 'usdc']}
            value={toValue}
            onValueChange={(value) => this.setState({toValue: value})}
            selectedToken={to}
            onSelectedTokenChange={(token) => this.handleSwitch(token, 'to')}
            label="To"
          />
          <Button 
            onClick={() => {}}
            margin="35px 0px 0px 0px" gradient width={200} height={50}>
              Swap!
            </Button>
        </Modal>
      )
    }
}

const useStyles = theme => ({
  modal: {
    padding: '40px 20px',
  },
  icon: {
    margin: '10px 0px',
    color: keys.PRIMARY_COLOR
  }
});

function mapStateToProps({getUserReducer}) {
    return {getUserReducer};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
        {showToastAction},
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SwapLiquidity));