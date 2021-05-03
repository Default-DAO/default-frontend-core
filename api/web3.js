export const Web3 = require("web3")

const useWeb3 = () => {
  let instance
  if (window.ethereum) {
    try {
      instance = new Web3(window.ethereum)
    } catch(err) {
      console.log(err)
    }
  } else if (window.web3) {
    instance = new Web3(window.web3)
  }
  return instance
}

export const setUserAccount = async () => {
  let web3 = useWeb3()
  if (window && window.ethereum) {
    await window.ethereum.enable()
    web3.eth.getAccounts().then(accounts => {
      let account = accounts[0]
    })
  }
}

export const setUserBalance = async (fromAddress) => {
  await web3.eth.getBalance(fromAddress).then(value => {
    const credit = web3.utils.fromWei(value, 'ether')
  })
}

export const sendTransaction = async (amount, recepient) => {
  await web3.eth.sendTransaction({
    from: '', //address,
    to: recepient,
    value: web3.utils.toWei(amount, 'ether')
  })
}
