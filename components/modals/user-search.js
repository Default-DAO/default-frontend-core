import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import {mdiAccountQuestionOutline} from '@mdi/js';

import * as actions from '../../redux/actions';
import Modal from '../../reusable/modal'
import Text from '../../reusable/text'
import Form from '../../reusable/form'
import Table from '../../reusable/table'
import Card from '../../reusable/card'
import Avatar from '../../reusable/avatar'
import Button from '../../reusable/button'
import keys from '../../config/keys'

class SearchModal extends React.Component {
    constructor(props){
        super(props)

        this.state = {
          users: [...keys.DUMMY_USERS],
          searchText:"",
          selected: []
        }
    }

    renderCell(cell) {
      const {classes} = this.props
      let {selected} = this.state
      return <Card onClick={() => {
        let newSelected = [...selected]
        newSelected.push(cell)
        this.setState({selected: newSelected})
      }} className={clsx(classes.cell, selected.includes(cell) ? classes.selectedCell : "")}>
        <Avatar size={40}></Avatar>
        <Text margin="0px 0px 0px 15px" fontSize={20}>{cell.alias}</Text>
      </Card>
    }

    render() {
      const {classes, title, open, close, action} = this.props
      return(
        <Modal className={classes.modal} open={open} close={close}>
          <Text center type="paragraph" fontSize={24} fontWeight={600} >{title}</Text>
          {/* <Form 
            value={this.state.searchText} 
            onChange={searchText => this.setState({searchText})}
            placeholder="Search users"
          >
          </Form> */}
          <Table
            height="65vh"
            list={this.state.users}
            renderCell={value => this.renderCell(value)}
            text="We couldn't find users"
            subText="Please try again later"
            actionText="Close"
            action={close}
            icon={mdiAccountQuestionOutline}
          ></Table>
          {this.state.selected.length > 0 ? <Button 
            onClick={() => {
              action(this.state.selected)
              this.props.showAddStakeNetworkAction(false)
              this.props.showAddValueNetworkAction(false)
            }}
            margin="35px 0px 0px 0px" gradient width={150} height={40}>
              Add users
            </Button> : null }
        </Modal>
      )
    }
}

const useStyles = theme => ({
  modal: {
    padding: '40px 30px',
  },
  cell: {
    marginBottom: 20,
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    transition: '0.2s',
    cursor: 'pointer',
    padding: '20px 20px',
    '&:hover': {
      opacity: 0.8,
      transition: '0.2s'
    }
  },
  selectedCell: {
    opacity: 0.5,
    transform: 'scale(0.95)'
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SearchModal));