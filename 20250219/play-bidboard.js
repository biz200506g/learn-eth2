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
  const signer = new ethers.Wallet('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e', provider);

  let balance = 0;
  balance = await provider.getBalance('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
  console.log(`balance #19: ${balance}`);

  const contract = new ethers.Contract(contractAddress, abi, provider);
  const ownerData = await contract.owner();
  console.log(`owner is: ${ownerData}`);

  balance = await provider.getBalance('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
  console.log(`balance #19: ${balance}`);

  const contractWithSigner = contract.connect(signer);
  const tx = await contractWithSigner.updateMessage('hello from #19', {
    value: ethers.parseEther('0.002'),
  });
  console.log("Transaction sent, waiting for confirmation...");
  await tx.wait();
  console.log("Transaction confirmed!");

  balance = await provider.getBalance('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
  console.log(`balance #19: ${balance}`);

  const adData = await contract.getCurrentAd();
  console.log(`message is: ${adData[0]}`);
  console.log(`advertiser is: ${adData[1]}`);
  console.log(`bid is: ${ethers.formatEther(adData[2])}`);
})();

/* ---------------------------------------------------------------------
const App = () => {
  const [currentAd, setCurrentAd] = useState("Hello World!");
  const [currentBid, setCurrentBid] = useState(0);
  const [advertiser, setAdvertiser] = useState("0x0");
  const [newAd, setNewAd] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [provider, setProvider] = useState(null);
  const [status, setStatus] = useState("");
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const submitBid = async () => {
    const signer = provider.getSigner(); // Assumes Metamask or similar is injected in the browser
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
        console.error("Please install MetaMask!");
      }
    }
  }, []);

  async function fetchCurrentAd() {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
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
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        contract.on(
          "MessageUpdated",
          (newMessage, newAdvertiser, newAmount, event) => {
            // Update your state variables here
            setCurrentAd(newMessage);
            setCurrentBid(ethers.formatEther(newAmount));
            setAdvertiser(newAdvertiser);
          }
        );
        // contract.getEvent
        console.log("Provider:", provider); // Debug line
      } else {
        console.error("Ethereum provider is not available");
      }
    };

    setupEventListener();

    // Cleanup the event listener
    return () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        contract.removeAllListeners("MessageUpdated");
      }
    };
  }, []);


--------------------------------------------------------------------- */
