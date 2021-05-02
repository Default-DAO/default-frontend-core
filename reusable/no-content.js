import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@mdi/react'

import Button from './button';
import Text from './text';

import {getUserAction, showToastAction, isLoadingAction} from '../redux/actions';
import keys from '../config/keys'

class NoContent extends React.Component {   
    constructor(props) {
        super(props)
    }

    render() {
        const { classes, icon, text, subText, actionText, action, footerText, isLoading } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    {icon ? <Icon path={icon}
                        size={1.5}
                        color={keys.WHITE}
                        className={classes.icon}
                    /> : null}
                    <div className={classes.mainText}>
                        <Text type="paragraph" fontWeight={500} fontSize={18}>
                          {text ? text : 'There is nothing here'}
                        </Text>
                        {subText ? <Text type="paragraph" fontSize={12}>
                          {subText}
                        </Text> : null}
                    </div>
                    <Button 
                        disabled={isLoading ? isLoading : false}
                        onClick={action} 
                        gradient
                        width={150}
                        height={40}
                    >
                        {actionText ? actionText : 'Add'}
                    </Button>
                    <p className={classes.subText}>
                        {footerText}
                    </p>  
                </div>
            </div>
        );
    }
}

const useStyles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    icon: {
        width: 100,
        marginBottom: 20,
        userDrag: 'none',
        userSelect: 'none',
        opacity: 0.8
    },
    mainText: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 30,
        opacity: 0.8
    },
    h2: {
        fontSize: 30,
        fontWeight: 300,
        margin: '0px 0px 10px 0px'
    },
    p: {
        fontSize: 16,
        fontWeight: 300,
        margin: 0
    },
    button: {
        margin: '0px 10px 0px 10px',
        color: 'white'
    },
    subText: {
        fontSize: 9,
        fontWeight: 200,
        marginTop: 50,
        color: 'gray'
    }
})

function mapStateToProps({routerReducer, isLoadingReducer, showToastReducer, getUserReducer}) {
    return {routerReducer, isLoadingReducer, showToastReducer, getUserReducer};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
        {getUserAction, showToastAction, isLoadingAction},
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(NoContent));