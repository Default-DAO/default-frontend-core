const Ethers = require('./assets/scripts/ethers.js');
const axios = require('axios')

export async function initWeb3() {
  const ethereum = window.ethereum;
  const provider = Ethers.providers.Web3Provider(ethereum);

  if (provider) {
    // Get MetaMask account if connected
    ethereum.request({ method: 'eth_accounts' }).then(this.accountsChanged);

    // Detect account changes
    ethereum.on('accountsChanged', this.accountsChanged);

    // Detect chain changes
    ethereum.on('chainChanged', this.chainChanged);
  } else {
    console.error('No web3 provider.');
  }
}

export async function generateSignedMessage ({ getters, commit }) {
  // Get ethAddress, provider, and chainId
  const ethAddress = Ethers.utils.getAddress(getters.account);
  const provider = getters.provider;

  const chainId = getters.chainId || (await provider.getNetwork()).chainId;

  // Retrieve nonce from backend
  let authMsg;
  const urlParams = new URLSearchParams({ ethAddress });
  const { data: { result } } = await axios.get('/auth?' + urlParams);
  if (result.error) { throw result.errorCode; }

  authMsg = result.authMsg;
  authMsg.domain.chainId = chainId;

  const signature = await window.ethereum.request({
    method: 'eth_signTypedData_v4',
    params: [ethAddress, JSON.stringify(authMsg)],
  });

  return { signature, ethAddress, chainId };
}

export function connectWallet() {
  window.ethereum.request({ method: 'eth_requestAccounts' });
}
