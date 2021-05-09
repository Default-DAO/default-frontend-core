export const isMetamask = () => {
  return (window.ethereum && window.ethereum.isMetaMask)
}

export const isConnected = () => {
  return window.isConnected()
}

export const handleAccountChange = (callback) => {
  window.ethereum.on('accountsChanged', (accounts) => {
    // Handle the new accounts, or lack thereof.
    // "accounts" will always be an array, but it can be empty.
    callback(accounts[0])
  });
}

export const handleChainChange = (callback) => {
  window.ethereum.on('chainChanged', (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    chainId = parseInt(chainId, 16); // hex to int
    callback(chainId)
  });
}

export const getChainId = async (callback) => {
  try {
    let chainId = await window.ethereum.request({ method: 'eth_chainId' })
    if (callback) callback(chainId)
    return chainId
  } catch (err) {
    console.log(err)
  }
}

export const getEthAddress = async () => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  let account = accounts[0]
  return account
}

export const registerWallet = async () => {
  if (!isMetamask()) return

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  } catch (err) {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.log('Please connect to MetaMask.');
    } else {
      console.error(error);
    }
  }

  return await getEthAddress()
}

export const requestPermission = async () => {
  try {
    let permissions = await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }],
    })

    const didGetPermission = permissions.find(
      (permission) => permission.parentCapability === 'eth_accounts'
    );
    return didGetPermission
  } catch (error) {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.log('Permissions needed to continue.');
    } else {
      console.error(error);
    }
  }
}

export const addTokenToMetamask = async () => {
  try {
    let success = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
          symbol: 'FOO',
          decimals: 18,
          image: 'https://foo.io/token-image.svg',
        },
      },
    });
    return success
  } catch (err) {
    console.log(err)
  }
}

export const setMemberBalance = async (address) => {
  try {
    let balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [
        address,
        "latest"
      ]
    });
    return balance
  } catch (err) {
    console.log(err)
  }
}

export const sendTransaction = async ({ from, to, gas, gasPrice, value }) => {
  try {
    let transactionHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from,
          to,
          gas,
          gasPrice,
          value
        },
      ],
    })
    return transactionHash
  } catch (err) {
    console.log(err)
  }
}

export const getSignedMessage = async (ethAddress, authMsg) => {
  try {
    return await window.ethereum.request({
      method: 'eth_signTypedData_v4',
      params: [ethAddress, JSON.stringify(authMsg)],
    });
  } catch (err) {
    console.log(err)
  }
}