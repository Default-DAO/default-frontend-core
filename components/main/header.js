import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';

import keys from '../../config/keys'
import Button from '../../reusable/button'
import Avatar from '../../reusable/avatar'
import Text from '../../reusable/text'
import { useStoreApi } from '../../store/provider'

const routes = [
  {
    route: '/pool',
    text: "Pool"
  },
  {
    route: '/dnt',
    text: "DNT"
  },
  {
    route: '/stake',
    text: "Elect"
  },
  {
    route: '/reward',
    text: "Reward"
  },
  {
    route: '/network',
    text: "History"
  },
  {
    route: '/proposals',
    text: "Proposals"
  }
]

const Header = (props) => {
  const store = useStoreApi()

  function renderLogo() {
    const { classes } = props
    return (
      <p className={classes.logo}>Ð</p>
    )
  }

  function menuSelected(route) {
    return route == props.route
  }

  function renderMenu() {
    const { classes } = props
    return (
      <div className={classes.links}>
        {routes.map(navItem => {
          const { route, text } = navItem
          return (
            <a
              className={!menuSelected(route) ? classes.link : clsx(classes.link, classes.linkSelected)}
              key={route} href={route} passhref='true'>
              {text}
            </a>
          )
        })}
      </div>
    );
  }

  function renderProfile() {
    const { classes } = props
    let member = store.getMember()
    let protocol = store.getProtocol()
    return (
      <div className={classes.profile}>
        <Button
          gradient
          height={30}
          width={50}
          margin='0px 0px 0px 14px'
          onClick={() => {
            // store.setShowAddLiquidity(true)
          }}
        >Ð</Button>
        <Text
          fontSize={14}
          fontWeight={700}
          margin='0px 0px 0px 14px'
        >Epoch {protocol.epochNumber}</Text>
        <span className={classes.memberProfile} onClick={() => {
          store.setShowProfile({
            ethAddress: member.ethAddress,
            alias: member.alias,
            selectedEpoch: protocol.epochNumber
          })
        }}>
          <Avatar
            member={member}
            size={30}
            margin='0px 0px 0px 14px'
          ></Avatar>
          <Text
            fontSize={14}
            fontWeight={700}
            margin='0px 0px 0px 8px'
          >@{member.alias}</Text>
        </span>
      </div>
    )
  }


  const { classes } = props;

  return (
    <div className={classes.header}>
      <div className={classes.left}>
        {renderLogo()}
        {renderMenu()}
      </div>
      <div className={classes.right}>
        {renderProfile()}
      </div>
    </div>
  )

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
    alignItems: 'center',
  },
  memberProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.2s',
    '&:hover': {
      opacity: 0.8,
      transition: '0.2s'
    }
  }
})

export default withStyles(useStyles)(Header);