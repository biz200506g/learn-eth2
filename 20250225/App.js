import React, { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
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

const App = () => {
  const [currentAd, setCurrentAd] = useState("Hello World!");
  const [currentBid, setCurrentBid] = useState(0);
  const [advertiser, setAdvertiser] = useState("0x0");
  const [newAd, setNewAd] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [provider, setProvider] = useState(null);
  const [status, setStatus] = useState("normal");
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const submitBid = async () => {
    const signer = window.ethereum
      ? provider.getSigner() // Assumes Metamask or similar is injected in the browser
      : new ethers.Wallet('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e', provider);
        // no metamask, use local account #19

    const contractWithSigner = contract.connect(await signer);
    try {
      const tx = await contractWithSigner.updateMessage(newAd, {
        value: ethers.parseEther(bidAmount),
      });
      setStatus("Transaction sent, waiting for confirmation...");
      await tx.wait();
      setStatus("Transaction confirmed!");
    } catch (err) {
      console.error(err);
      setStatus("Error: " + err.message);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.ethereum) {
        setProvider(new ethers.BrowserProvider(window.ethereum));
        // getCurrentAd()
      } else {
        //console.error("Please install MetaMask!");
        console.log("Metamask is not available, assume local provider");
        setProvider(new ethers.JsonRpcProvider('http://127.0.0.1:8545'));
      }
    }
  }, []);

  async function fetchCurrentAd() {
    try {
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const contract = new ethers.Contract(contractAddress, abi, provider);
      const adData = await contract.getCurrentAd();
      setCurrentAd(adData[0]);
      setAdvertiser(adData[1]);
      setCurrentBid(ethers.formatEther(adData[2]));
      console.log(adData[0]);
    } catch (error) {
      console.error('Error fetching current ad:', error);
    }
  }
  

  useEffect(() => {
    fetchCurrentAd();
  }, []);
  

  useEffect(() => {
    const setupEventListener = async () => {
      /* if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider); */
        const provider = window.ethereum
          ? new ethers.BrowserProvider(window.ethereum)
          : new ethers.JsonRpcProvider('http://127.0.0.1:8545');
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        contract.on(
          "MessageUpdated",
          (newMessage, newAdvertiser, newAmount) => {
            // Update your state variables here
            setCurrentAd(newMessage);
            setCurrentBid(ethers.formatEther(newAmount));
            setAdvertiser(newAdvertiser);
          }
        );
        // contract.getEvent
        console.log("in setupEventListener - Provider:", provider); // Debug line
      /* } else {
        console.error("Ethereum provider is not available");
      } */
    };

    setupEventListener();

    // Cleanup the event listener
    return () => {
      /* if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider); */
        contract.removeAllListeners("MessageUpdated");
      /* } */
    };
  }, []);

  fetchCurrentAd();

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
