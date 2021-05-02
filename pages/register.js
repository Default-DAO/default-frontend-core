import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withStyles } from '@material-ui/core/styles';

import {getUserAction, showToastAction, isLoadingAction} from '../redux/actions';
import keys from '../config/keys'
import Button from '../reusable/button'
import Form from '../reusable/form'
import Text from '../reusable/text'


class Register extends React.Component {
  constructor(props){
      super(props)

      this.state = {
          alias: ''
      }
  }

  render() {
      const {classes} = this.props
      return(
          <div className={classes.register}>
            <span className={classes.registerContainer}>
              <Text className={classes.logo} type='heading' fontSize={100} fontWeight={700}>Ðefault</Text>
              {/* <Text className={classes.subtext} type='heading' fontSize={12} fontWeight={100}>Not a company. A network</Text> */}
              <Form 
                value={this.state.alias}
                center
                className={classes.form}
                onChange={(text) => {
                  if (text.length > 0 && text[0] != '@') {
                    text = '@' + text
                  }
                  this.setState({alias:text})
                }}
                width={280} 
                placeholder="Enter your alias"></Form><br/>
              <Button gradient width={300} height={40}>
                Register
              </Button>
            </span>
          </div>
      )
  }
}

const useStyles = theme => ({
  register: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    marginBottom: 120,
  },
  subtext: {
    opacity: 0.8,
  },
  form: {
    fontSize: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Register));