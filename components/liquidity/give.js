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

class StakeReward extends React.Component {
    constructor(props){
        super(props)

        this.state = {
          value: ''
        }
    }

    render() {
      const {classes, open, close, configurations, title, label, buttonLabel} = this.props
      return(
        <Modal width={400} className={classes.modal} open={open} close={close}>
          <Text margin='0px 0px 25px 0px' center type="paragraph" fontSize={24} fontWeight={600} >{title}</Text>
          <TokenForm
            currencies={['dnt']}
            value={this.state.value}
            onValueChange={(value) => this.setState({value})}
            selectedToken="dnt"
            onSelectedTokenChange={() => {}}
            label={label}
          />
          <Button 
            onClick={() => {}}
            margin="35px 0px 0px 0px" gradient width={200} height={50}>
              {buttonLabel}
            </Button>
        </Modal>
      )
    }
}

const useStyles = theme => ({
  modal: {
    padding: '40px 20px',
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(StakeReward));