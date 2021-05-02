import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import {mdiWalletGiftcard, mdiTrophyAward} from '@mdi/js';

import * as actions from '../redux/actions';
import keys from '../config/keys'
import Text from '../reusable/text'
import Avatar from '../reusable/avatar'
import Card from '../reusable/card'
import Table from '../reusable/table'

class Network extends React.Component {
  constructor(props){
      super(props)

      this.state = {
        stakeNetwork: [],
        valueNetwork: [...keys.DUMMY_USERS]
      }
  }

  renderCell(cell) {
    const {classes} = this.props
    return <Card className={classes.cell}>
      <Avatar size={40}></Avatar>
      <Text margin="0px 0px 0px 15px" fontSize={20}>{cell.alias}</Text>
    </Card>
  }

  render() {
      const {classes} = this.props
      return(
          <div className={classes.network}>
            <div className={classes.left}>
              <span className={classes.textContainer}>
                <Text type="paragraph" fontSize={20} fontWeight={700}>Stake Network</Text>
                <AddIcon 
                  onClick={() => this.props.showAddStakeNetworkAction(true)} 
                  className={classes.icon} 
                  fontSize="small" 
                />
              </span>
              <Table
                text='Your stake network is empty!'
                list={this.state.stakeNetwork}
                renderCell={value => this.renderCell(value)}
                icon={mdiWalletGiftcard}
                action={() => this.props.showAddStakeNetworkAction(true)}
              />
            </div>
            <div className={classes.right}>
              <span className={classes.textContainer}>
                <Text type="paragraph" fontSize={20} fontWeight={700}>Value Network</Text>
                <AddIcon 
                  onClick={() => this.props.showAddValueNetworkAction(true)} 
                  className={classes.icon} 
                  fontSize="small" 
                />
              </span>
              <Table
                text='Your value network is empty!'
                list={this.state.valueNetwork}
                renderCell={value => this.renderCell(value)}
                icon={mdiTrophyAward}
                action={() => this.props.showAddValueNetworkAction(true)}
              />
            </div>
          </div>
      )
  }
}

const useStyles = theme => ({
  network: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    overflowY: 'hidden',
    padding: '40px 200px',
  },
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 20px',
  },
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 20px',
  },
  cell: {
    marginBottom: 20,
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    transition: '0.2s',
    cursor: 'pointer',
    padding: '17px 20px',
    '&:hover': {
      opacity: 0.8,
      transition: '0.2s'
    }
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  icon: {
    color: keys.WHITE,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7
    }
  },
});

function mapStateToProps({getUserReducer}) {
  return {getUserReducer};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
      {...actions},
      dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Network));