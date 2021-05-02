import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';

import {showToastAction} from '../../redux/actions';
import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import TokenForm from '../../reusable/token-form'
import Button from '../../reusable/button'
import keys from '../../config/keys'

class WithdrawLiquidity extends React.Component {
    constructor(props){
        super(props)

        this.state = {
          value: '',
          selectedToken: 'usdc'
        }
    }

    render() {
      const {classes, open, close} = this.props
      return(
        <Modal width={400} className={classes.modal} open={open} close={close}>
          <Text margin='0px 0px 25px 0px' center type="paragraph" fontSize={24} fontWeight={600} >Withdraw Liquidity</Text>
          <TokenForm
            currencies={['usdc', 'dnt']}
            value={this.state.value}
            onValueChange={(value) => this.setState({value})}
            selectedToken={this.state.selectedToken}
            onSelectedTokenChange={(token) => this.setState({selectedToken:token})}
          />
          <Text className={classes.feeText} margin='14px 0px 0px 0px' center type="paragraph" fontSize={13} fontWeight={400} >
            Withdraw fee: 0.03%
          </Text>
          <Button 
            onClick={() => {}}
            margin="35px 0px 0px 0px" gradient width={200} height={50}>
              Withdraw!
            </Button>
        </Modal>
      )
    }
}

const useStyles = theme => ({
  modal: {
    padding: '40px 20px',
  },
  feeText: {
    opacity: 0.8
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(WithdrawLiquidity));