import { ethers } from 'ethers';

(async () => {
    process.loadEnvFile();
    const provider = new ethers.JsonRpcProvider(process.env.HTTP_PROVIDER_URL);
    //# account 01 private key
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    //# local 00/01, use 01
    const address = '0xE25583099BA105D9ec0A67f5Ae86D90e50036425'
    let balance = await provider.getBalance(address);
    console.log(`balance: ${balance}`);

    const transaction = await signer.sendTransaction({
        to: address,
        value: ethers.parseUnits('1', 'wei'),
        data: '0x60616263646566676869'
      });
    console.log(transaction);

    console.log(new Date());
    const before = balance;
    let i = 0;
    while (before == balance) {
        balance = await provider.getBalance(address);
        console.log(`balance ${i}: ${balance}`);
        i++;
    }
    console.log(new Date());
})();
