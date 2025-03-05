2025-02-04: 
- to get free tokens for testing, read https://developers.moralis.com/faucets/#listFaucets
- use Holesky Faucet https://holesky-faucet.pk910.de/ because it does not require passport xyz or eth on mainnet
- create MetaMask wallet, add the Holesky as custom network, use the account address to mine at Holesky Faucet

2025-02-05:  \
**Block Nonce**
- https://www.investopedia.com/terms/n/nonce.asp
- a number that miners use to attempt to generate a valid hash to produce a new block in the proof-of-work mining

**Transaction Nonce**
- https://www.quicknode.com/guides/ethereum-development/transactions/how-to-manage-nonces-with-ethereum-transactions
- a number contained within your transaction payload that keeps track of the number of transactions your address has sent, and this value makes sure that transactions sent from your address are executed in order and cannot be replayed

2025-02-06: 
- https://ethereum.org/en/developers/docs/transactions/
- transaction.data's first 4 bytes may specify a contract's method to call
- otherwise, transaction.data is "user data" for the Transfer, and etherscan uses [Transfer *] as Method
- if transaction.data is null, etherscan uses [Transfer] as Method

2025-02-09:
- Truffle Suite abd Ganache has been sunset since 2024-02-26, and Consensys AG offered support to moigrate to hardhat, see https://github.com/trufflesuite/truffle
- to use vscode with hardhat, read https://codedamn.com/news/blockchain/hardhat-tutorial-guide
- install Solidity extension for vscode published by nomic foundation
- need to use "npx hardhat" commands in a terminal to compile, test and deploy
- Remix IDE is much more user-friendly

2025-02-18:
- study https://github.com/joshuanwankwo/mode_testnet/blob/main/bidboard/src/bidboard.sol
- compile and deploy on Remix IDE

2025-02-19:
- study https://hardhat.org/ignition/docs/getting-started
- create the ignition deployment js file
- deploy the contract to hardhat local node
- study https://github.com/joshuanwankwo/mode_testnet/blob/main/bidboard-ui/src/App.js
- create a js program importing ethers.js to interact with the contract on local node

2025-02-24:
- add parameters to constructor
- modify ignition deployment js to pass arguments to constructor

2025-02-25:
- download https://github.com/joshuanwankwo/mode_testnet/blob/main/bidboard-ui
- modify App.js to work with local node without metamask
- modify index.css to fit my taste

2025-03-02:
- react 18+ runs mount, unmount and mount again during startup in development, so add qeueing for setup and cleanup listener
- add kurtosis localnet network data to hardhat.config.js to allow deployment to localnet
- add configuration data to App.js to allow the use of both hardhat local node and kurtosis localnet

2025-03-05:
- study https://www.rareskills.io/learn-solidity
- ERC20 token is a smart contract and uses "mapping" to store the balance associated with an address
- the smart contract for USDC, an ERC20 token: https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
