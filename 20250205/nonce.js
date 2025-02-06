import { ethers } from 'ethers';

//# Node 21+ update: no longer need to use dotenv at all
//# call process.loadEnvFile, throw error if ./env is not found
//process.loadEnvFile();
//console.log(`show variable value from .env: ${process.env.HTTP_PROVIDER_URL}`);

(async () => {
    const provider = new ethers.JsonRpcProvider('https://ethereum-holesky.publicnode.com');
    //const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    //# Get the current nonce for a new transaction
    //let nonce = await provider.getTransactionCount(signer.address);
    //# local 01 address
    let nonce = await provider.getTransactionCount('0x8943545177806ED17B9F23F0a21ee5948eCaa776');
    console.log(`transaction nonce: ${nonce}`);

    const block = await provider.getBlock(3282251, true);
    console.log(`block nonce: ${block.nonce}`); // not used by proof-of-stake, should be zero
    console.log("------------------------------------------------");

    //# study block and transactions stored in the block
    console.log(`block: ${JSON.stringify(block, null, 2)}`);
    console.log(`transactions: ${JSON.stringify(block.prefetchedTransactions, null, 2)}`);

    //# check balance
    let balance = await provider.getBalance('0x8943545177806ED17B9F23F0a21ee5948eCaa776');
    console.log(`balance 00: ${balance}`);
    balance = await provider.getBalance('0xE25583099BA105D9ec0A67f5Ae86D90e50036425');
    console.log(`balance 01: ${balance}`);
})();
