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
- to use vscode with hardhat, read https://codedamn.com/news/blockchain/hardhat-tutorial-guide
- install Solidity extension for vscode published by nomic foundation 

2025-02-18:
- study https://github.com/joshuanwankwo/mode_testnet/blob/main/bidboard/src/bidboard.sol
- compile and deploy on Remix IDE
