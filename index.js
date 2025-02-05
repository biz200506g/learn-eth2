import { ethers } from "ethers";

//# Node 21+ update: no longer need to use dotenv at all
//# call process.loadEnvFile, throw error if ./env is not found
//process.loadEnvFile();
//console.log(`show variable value from .env: ${process.env.HTTP_PROVIDER_URL}`);

(async () => {
    const provider = new ethers.JsonRpcProvider("https://ethereum-holesky.publicnode.com");
    //const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    //# Get the current nonce for a new transaction
    //let nonce = await provider.getTransactionCount(signer.address);
    let nonce = await provider.getTransactionCount("0x6cF2578E39C733829432f4a7a8AF1C9B6104edc0");
    console.log(`transaction nonce: ${nonce}`);

    const block = await provider.getBlock(3282259, true);
    console.log(`block nonce: ${block.nonce}`); // not used by proof-of-stake, should be zero
    console.log("------------------------------------------------");

    //# study block and transactions stored in the block
    console.log(`block: ${JSON.stringify(block, null, 2)}`);
    console.log(`transactions: ${JSON.stringify(block.prefetchedTransactions, null, 2)}`);
})();