import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withStyles } from '@material-ui/core/styles';

import {showToastAction} from '../redux/actions';

class SetNetwork extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }

    render() {
        return(
            <div>
                
            </div>
        )
    }
}

const useStyles = theme => ({
    
});

function mapStateToProps({getUserReducer}) {
    return {getUserReducer};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
        {showToastAction, getUserResolveAction},
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SetNetwork));