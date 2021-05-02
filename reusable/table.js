import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withStyles } from '@material-ui/core/styles';

import {showToastAction} from '../redux/actions';
import NoContent from './no-content'

class Table extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }

    renderEmptyTable() {
      const {text, subText, actionText, action, icon} = this.props
      if (!this.props.list || this.props.list.length <= 0) {
        return <NoContent
          text={text}
          subText={subText}
          actionText={actionText}
          icon={icon}
          action={action}
        />
      }
    }
    
    render() {
      const {classes} = this.props
      return(
        <div className={classes.table}>
          {this.renderEmptyTable()}
          {this.props.list.map((object, index) => {
            return <span key={index}>
              {this.props.renderCell(object, index)}
            </span>
          })}
        </div>
      )
    }
}

const useStyles = theme => ({
  table: props => {
    const {height, width} = props
    return {
      height: height ? height : '75vh',
      width: width ? width : 400,
      overflowY: 'auto',
      paddingRight: 10,
      marginTop: 20,
      borderRadius: 15
    }
  }
});

function mapDispatchToProps(dispatch){
    return bindActionCreators(
        {showToastAction},
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(Table));