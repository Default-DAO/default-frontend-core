import React, {Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import clsx from 'clsx';
 
import keys from '../config/keys'

//A pop up to ask users to login or signup
class ModalWrapper extends React.Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render() {
        const { classes, className, children, close, open } = this.props;
        return(
            <Modal 
                className={classes.modal}
                open={open ? true : false}
                onClose={() => close()}
            >
                <div className={clsx(classes.content, className ? className : '')}>
                    {children}                           
                </div>
            </Modal>
        )
    }
}

const useStyles = theme => ({
    modal: {
      zIndex: 999999
    },
    content: props => {
      const {width, height} = props 
      return {
        position: 'absolute',
        color: 'white',
        width: width ? width : 'auto',
        height: height ? height : 'auto',
        backgroundColor: keys.BACKGROUND_COLOR,
        boxShadow: theme.shadows[5],
        borderRadius: 30,
        outline: 'none',
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }    
    }
});

export default withStyles(useStyles)(ModalWrapper);