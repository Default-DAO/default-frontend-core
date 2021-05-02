import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Form from './form'
import Text from './text'
import Button from './button'
import Card from './card'
import Popover from './popover'
import keys from '../config/keys'

const Tokens = [
  {
    token: 'dnt',
    symbol: 'Ð',
    name: 'DNT',
    icon: ''
  },
  {
    token: 'usdc',
    symbol: '$',
    name: 'USDC',
    icon: ''
  }
]

class TokenForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
          tokenSelector: false
        }
    }

    renderToken(token) {
      const {classes} = this.props
      const tokenImage = `../static/token/${token}.svg`
      return (
        <span className={classes.tokenContainer}>
          <img className={classes.token} src={tokenImage}/>
          <Text className={classes.tokenText} type="paragraph">{token.toUpperCase()}</Text>
        </span>
      )
    }

    renderTokenSelector() {
      const {classes, onSelectedTokenChange, currencies} = this.props
      return (
        <div className={classes.tokenSelector}>
          {currencies.map(t => {
            return <span 
              onClick={() => {
                this.setState({tokenSelector: false})
                onSelectedTokenChange(t)
              }}
              className={classes.tokenSelectorItem}>
              {this.renderToken(t)}
            </span>
          })}
        </div>
      )
    }

    getSymbol(token) {
      let symbol = ''
      Tokens.forEach(t => {
        if (t.token == token) {
          symbol = t.symbol
        }
      })
      return symbol
    }

    render() {
      let {classes,label, value, onValueChange, balance, selectedToken, currencies} = this.props

      let symbol = this.getSymbol(selectedToken) + " "

      return(
        <Card width={'100%'} className={classes.card}>
          <span className={classes.labelContainer}>
            <Text>
              {label ? label : 'Tokens'}
            </Text>
            <Text>
              Balance: {balance ? balance : symbol + 0.0}
            </Text>
          </span>
          <div className={classes.formContainer}>
            <Form
              value={value}
              className={classes.form}
              placeholder={0.0}
              onChange={(value) => {
                onValueChange(value)
              }}
              number
            ></Form>
            <Popover 
              customOpen={this.state.tokenSelector}
              customClose={() => this.setState({tokenSelector: false})}
              transformHorizontal="right"
              anchorHorizontal="right"
              customSelector={(onClick) => {
              return <Button
                className={classes.button}
                onClick={(event) => {
                  onClick(event)
                  this.setState({tokenSelector: true})
                }}
                height={35}
              >
                {this.renderToken(selectedToken)}
              </Button>
            }}>
              {this.renderTokenSelector()}
            </Popover>
          </div>
        </Card>
      )
    }
}

const useStyles = theme => ({
  card: {
    padding: '20px 30px',
    borderRadius: 17
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    fontSize: 25,
    fontWeight: 600,
    paddingRight: 30
  },
  button: {
    padding: '5px 0px',
    background: keys.GRAY,
  },
  tokenContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  token: {
    width: 25,
    height: 25,
    marginRight: 7
  },
  tokenText: {
    fontSize: 18,
    fontWeight: 600,
  },
  tokenSelector: {
    width: 100,
    // padding: 20,
    borderRadius: 10,
    backgroundColor: keys.BACKGROUND_COLOR,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  tokenSelectorItem: {
    margin: 10,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.5
    }
  }
});

export default withStyles(useStyles)(TokenForm);