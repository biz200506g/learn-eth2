import { ethers } from "ethers";

(async () => {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "newMessage",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newAdvertiser",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newAmount",
          type: "uint256",
        },
      ],
      name: "MessageUpdated",
      type: "event",
    },
    {
      inputs: [],
      name: "currentAdvertiser",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "currentAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getCurrentAd",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "message",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "newMessage",
          type: "string",
        },
      ],
      name: "updateMessage",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "updateOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

  let balance = 0;
  balance = await provider.getBalance('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
  console.log(`balance #19: ${balance}`);

  const contract = new ethers.Contract(contractAddress, abi, provider);
  const ownerData = await contract.owner();
  console.log(`owner is: ${ownerData}`);

  balance = await provider.getBalance('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
  console.log(`balance #19: ${balance}`);

  const adData = await contract.getCurrentAd();
  console.log(`message is: ${adData[0]}`);
  console.log(`advertiser is: ${adData[1]}`);
  console.log(`bid is: ${ethers.formatEther(adData[2])}`);

  balance = await provider.getBalance('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
  console.log(`balance #19: ${balance}`);
})();
