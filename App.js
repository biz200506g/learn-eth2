import React, { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";

const abi = [
  {
    inputs: [
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_initAmount",
        "type": "uint256"
      }
    ],
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

const App = () => {
  const [currentAd, setCurrentAd] = useState("Hello World!");
  const [currentBid, setCurrentBid] = useState(0);
  const [advertiser, setAdvertiser] = useState("0x0");
  const [newAd, setNewAd] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [status, setStatus] = useState("normal");

  //const [provider, setProvider] = useState(null);
  const hardhat_localnode = 'http://127.0.0.1:8545';
  const kurtosis_localnet = 'http://127.0.0.1:32769';

  const hardhat_localnode_signer = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';
  const kurtosis_localnet_signer = '0x7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856';

  const hardhat_localnode_contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const kurtosis_localnet_contractAddress = "0xb4B46bdAA835F8E4b4d8e208B6559cD267851051";

  const which_local = 'k';

  const local_rpc = (which_local == 'h')
    ? hardhat_localnode
    : kurtosis_localnet;
  const local_signer = (which_local == 'h')
    ? hardhat_localnode_signer
    : kurtosis_localnet_signer;
  const contractAddress = (which_local == 'h')
    ? hardhat_localnode_contractAddress
    : kurtosis_localnet_contractAddress;

  const provider = window.ethereum
    ? new ethers.BrowserProvider(window.ethereum) // assumes Metamask or similar is injected in the browser
    : new ethers.JsonRpcProvider(local_rpc); // no metamask, use local
  
  const signer = window.ethereum
    ? provider.getSigner() // assumes Metamask or similar is injected in the browser
    : new ethers.Wallet(local_signer, provider);
      // no metamask, use local account

  const contract = new ethers.Contract(contractAddress, abi, provider);

  const sleep = async (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const running = [];
const delay = 50; //in millisecond
let ticket = 0;

  const submitBid = async () => {
    const contractWithSigner = contract.connect(await signer);
    try {
      const tx = await contractWithSigner.updateMessage(newAd, {
        value: ethers.parseEther(bidAmount),
      });
      setStatus("Transaction sent, waiting for confirmation...");
      await tx.wait();
      setStatus("Transaction confirmed.");
    } catch (err) {
      console.error(err);
      setStatus("Error sending transaction: " + err.message);
    }
    console.log(`Submit "${newAd}" done ---------------------`);
  };

  async function fetchCurrentAd() {
    try {
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const contract = new ethers.Contract(contractAddress, abi, provider);
      const adData = await contract.getCurrentAd();
      setCurrentAd(adData[0]);
      setAdvertiser(adData[1]);
      setCurrentBid(ethers.formatEther(adData[2]));
      console.log(`Fetched at ${Date.now()}: ${adData[0]}`);
      setStatus("Current ad retrieved.");
    } catch (error) {
      console.error('Error fetching current ad:', error);
      setStatus("Error fetching current ad: " + error.message);
    }
  }
  
  useEffect(() => {
    const setupEventListener = async () => {
      const myTicket = ticket++;
      running.push(myTicket);
      console.log(`setupEventListener ticket = ${myTicket} in [${running.join()}]`);
            for (let i = 0; i < 10; i++) {
          if (myTicket == running[0])
              break;
          await sleep(delay);
          console.log(`setup ${myTicket}: ${delay}ms - ${i+1}`)
      }

      if (myTicket != running[0]) {
        console.log(`setup ${myTicket}: not my turn in [${running.join()}]`);
        const index = running.indexOf(myTicket);
        if (index > -1)
            running.splice(index,1);
        console.log(`setup ${myTicket} is removed: [${running.join()}]`);
        return;
      }

      await contract.on(
        "MessageUpdated",
        (newMessage, newAdvertiser, newAmount, event) => {
          // Update your state variables here
          setCurrentAd(newMessage);
          setCurrentBid(ethers.formatEther(newAmount));
          setAdvertiser(newAdvertiser);
          console.log(`received MessageUpdated event: ${newMessage}`);
        }
      )

      if (myTicket == running[0])
        console.log(`setup ${running.shift()} is done and removed: [${running.join()}]`);
      else
        console.log(`setup ${myTicket} is done but missing: [${running.join()}]`);
    };

    setupEventListener();
    fetchCurrentAd();

    // Cleanup the event listener
    return () => {
      //useEffect is called twice in startup, and removeAllListener at 1st run 
      //seems to even remove the listener at 2nd run
      //using async await cannot solve the issue, seems unmount & remount are
      //running in parallel
      
      //idle too long, listener gets empty event message
      //will try kurtosis local node
      //react re-compile and re-render will unmount using old code, install new code,
      //and then remount, so that unmount should have enough time to complete before
      //mount again

      //useEffect (1st run) is called, before its end, unmount is called
      //useEffect (2nd run) is called before 1st run mount and unmount are finished
      //
      //https://sentry.io/answers/react-useeffect-running-twice
      //since react 18+, mount, unmount and mount again are always performed during
      //startup in development to trigger bugs. in production, only mount once.
      //
      //add queuing for setup and cleanup, looks ok

      const cleanupEventListener = async () => {
        const myTicket = ticket++;
        running.push(myTicket);
        console.log(`cleanupEventListener ticket = ${myTicket} in [${running.join()}]`);
        for (let i = 0; i < 10; i++) {
            if (myTicket == running[0])
                break;
            await sleep(delay);
            console.log(`cleanup ${myTicket}: ${delay}ms - ${i+1}`);
        }

        if (myTicket != running[0]) {
          console.log(`cleanup ${myTicket}: not my turn in [${running.join()}]`);
          const index = running.indexOf(myTicket);
          if (index > -1)
              running.splice(index,1);
          console.log(`cleanup ${myTicket} is removed: [${running.join()}]`);
          return;
        }

        await contract.removeAllListeners("MessageUpdated");

        if (myTicket == running[0])
          console.log(`cleanup ${running.shift()} is done and removed: [${running.join()}]`);
        else
          console.log(`cleanup ${myTicket} is done but missing: [${running.join()}]`);
      }

      cleanupEventListener();
    }
  }, []);

  //fetchCurrentAd();
  // every typing in input box will change state (setNewAd or setBidAmount
  // state change will trigger re-render which will run this function body again
  // don't put non-declarative code not to be run on each rendering in this body

  return (
    <div className="app">
      {/* Landing Section */}
      <section className="landing">
        <h1>BidBoard</h1>
        <p>Status: {status}</p>
      </section>

      <div className="container">
        {/* Bid Section */}
        <section className="bid-section">
          <input
            type="text"
            value={newAd}
            onChange={(e) => setNewAd(e.target.value)}
            placeholder="Enter your advert message"
          />
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Enter your bid amount"
          />
          <button onClick={submitBid}>Submit Bid</button>
        </section>

        {/* Advert Display Section */}
        <section className="advert-display">
          <div className="current-ad">"{currentAd}"</div>
          <div className="card-details">
            <div className="current-bid">
              Current Bid: <br />
              {currentBid} ETH <br /><br />
            </div>
            <div className="advertiser">
              Advertiser: <br />
              {advertiser} <br /><br />
            </div>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <footer>
        <a
          href="https://github.com/gee-biz"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
        {/* Add more links as needed */}
      </footer>
    </div>
  );
};

export default App;
