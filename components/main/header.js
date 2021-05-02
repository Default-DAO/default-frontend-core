import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';

import * as actions from '../../redux/actions';
import keys from '../../config/keys'
import Button from '../../reusable/button'
import Avatar from '../../reusable/avatar'
import Text from '../../reusable/text'

const routes = [
  {
    route: '/pool',
    text: "Pool"
  },
  {
    route: '/network',
    text: "Network"
  },
  {
    route: '/stake',
    text: "Stake"
  },
  {
    route: '/reward',
    text: "Reward"
  }
]

class Header extends React.Component {    
  constructor(props) {
    super(props)

    this.state = {            
      isDesktop: true,
      clickedRoute: '',
    }
  }
  
  renderLogo() {
    const {classes} = this.props
    return (
        <p className={classes.logo}>Ð</p>
    )
  }

  //handle click of a menu item through redirect
  handleClick(route) {
    this.setState({clickedRoute: route})
  }

  menuSelected(route) {
    //have the menu turn gray when clicked. 
    const {clickedRoute} = this.state
    // Otherwise, make the menu that matches the router selected
    if (clickedRoute != '') return route == clickedRoute        
    return route == this.props.route
  }

	renderMenu() {
    const {classes} = this.props
    return (
        <div className={classes.links}>
            {routes.map(navItem => {
                const {route, text} = navItem
                return (
                    <a 
                      className={!this.menuSelected(route) ? classes.link : clsx(classes.link, classes.linkSelected)}
                      key={route} href={route} passhref='true'>
                        {text}
                    </a>
                )
            })}
            <a 
              className={classes.link}
              onClick={() => this.props.showAddLiquidityAction(true)}
            >
                Add
            </a>
            <a 
              className={classes.link}
              onClick={() => this.props.showSwapLiquidityAction(true)}
            >
                Swap
            </a>
        </div>
    ); 
  } 

	renderProfile() {
		const {classes} = this.props
		return (
			<div className={classes.profile}>
        <Button
          gradient
          height={30}
          width={50}
          margin='0px 0px 0px 14px'
          onClick={() => this.props.showAddLiquidityAction(true)}
        >Ð</Button>
        <Text
          fontSize={14}
          fontWeight={700}
          margin='0px 0px 0px 14px'
        >Epoch 1</Text>
        <Avatar
          size={30}
          margin='0px 0px 0px 14px'
        ></Avatar>
        <Text
          fontSize={14}
          fontWeight={700}
          margin='0px 0px 0px 8px'
        >@scottsgc</Text>
			</div>
		)
	}

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.header}>
              <div className={classes.left}>
                {this.renderLogo()}
                {this.renderMenu()}
              </div>
              <div className={classes.right}>
                {this.renderProfile()}
              </div>
            </div>
        )
    }
}

const useStyles = theme => ({
	header: {
    height: 60,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 1px 0 rgba(179,179,179,0.1)',
  },
  left: {
    marginLeft: 30,
    display: 'flex',
    flexDirection: 'row'
  },
  logo: {
    margin: 0,
    color: keys.WHITE,
    fontSize: 40,
    fontWeight: 700
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 30
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '0px 10px 0px 10px',
    transition: '0.2s',
    color: keys.WHITE,
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
      transition: '0.2s'
    }
  },
  linkSelected: {
    fontWeight: 600,
    borderBottom: `1px solid ${keys.PRIMARY_COLOR}`,
  },
  right: {
    marginRight: 30,
    display: 'flex',
    flexDirection: 'row'
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

function mapDispatchToProps(dispatch){
    return bindActionCreators(
        {...actions},
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(Header));