# Structure
#### /api
Api code for backend and web3 interactions
#### /components
Sub components for pages
#### /config
App level configurations such as keys
#### /pages
Main pages for the app routed to paths
#### /reusable
Reusable React components such as text, table, button, etc
#### /static
Static files such as images and video
#### /store
React context for app-level state management
#### /utils
Reusable functions

# /api
### web3
#### erc20.json
ERC20 abi for interacting with erc20 token smart contracts
#### web3.js
- getWeb3
- isMetamask
- isConnected
- handleAccountChange
- handleChainChange
- getChainId
- getEthAddress
- registerWallet
- requestPermission
- sendTransaction
- getSignedMessage

### restapi
All rest api functions use axios and accept { params, store } as parameters. 
"params" is the data to be sent to the backend and "store" is the React context store used to change the app level state, mostly to pop an error / success message. You must pass store from the React component because React context only works inside React functional components.
#### delete.js
#### get.js
- getSignedMessage
- getMember
- getMembers
- getPool
- getMemberPool
- getProtocol
- getAllocationsTo
- getAllocationsFrom
- getStakesTo
- getStakesFrom
- getNetwork

#### post.js
- registerMember
- addLiquidity
- swapLiquidity
- withdrawLiquidity
- stakeDnt
- delegateStakes
- allocateRewards

#### update.js
- updateMember

# /components
#### /liquidity
Popups for interacting with liquidity.
Contains adding liquidity, staking dnt, swapping, and withdrawing modals.
#### /main
App level components that determine the frame of the app. Contains header and layout
#### /main/layout.js
App level component that wraps all the child components after authentication. Also contains popups that can be turned on and off from anywhere in the app. Toast is not stored in this component because toast is also used in the registration page.
- Header
- Components
- AddLiquidity
- SwapLiquidity 
- WithdrawLiquidity
- Profile

#### /modals
Popups that are used throughout the app, such as epoch selector ond member search during stake / allocate
#### /profile
Profile popup that shows member details when a member is clicked.
#### /profile/liquidity.js
Component that shows member's liquidity information
#### /profile/stakes.js
Component that shows member's delegations information
#### /profile/rewards.js
Component that shows member's allocation information
#### loading.js
Full page loading view that shows while navigating to different page
#### register.js
Register page for unauthenticated members. Determining if a member is authenticated is handled in _app.js.

# /pages
#### _app.js
A next.js standard page that controls the app configurations AFTER the app reaches the browser. <br/>
_app.js renders layout.js, loading.js, or register.js. <br/>
_app.js renders toast.js for error handling. <br/>
_app.js makes sure the following:
- Checks if Metamask installed
- Checks for chain change
- Checks for Metamask account change
- Member is fetched before rendering layout.js
- Protocol is fetched before rendering layout.js

#### _document.js
A next.js standard page that controls the app configurations BEFORE the app reaches the browser (on the server). "window' variable is not accessible here. <br/>
All the configurations to the \<head> or \<body> tag goes here.

#### global-style.css
App level css that applies to all components. <br/>
Styles for the scoll bar is here.

#### index.js
Routes to https://default-dao.com and shows stake.js page.

#### network.js
Routes to https://default-dao.com/network

#### pool.js
Routes to https://default-dao.com/pool

#### reward.js
Routes to https://default-dao.com/reward

#### stake.js
Routes to https://default-dao.com/stake

# /reusable
All reusable components accept className as props to allow style customization <br/>

#### avatar.js
Round profile image for member that shows either the member's profile photo or a colored alphabet <br/>

props: 
- member: { alias, image }
- size
- margin

#### button.js
Standardized button for the app <br/>

props: 
- width
- height
- type: "primary" or "secondary". Secondary is hollow button
- gradient: Boolean whether to make button gradient or not
- margin
- onClick: Click function
- children: Child components to be rendered




