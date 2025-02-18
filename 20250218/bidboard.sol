// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract BidBoard {
    // public state variables have auto-generated getter
    string public message; // getter is this.message()
    address public currentAdvertiser; // getter is this.currentAdvertiser()
    uint public currentAmount; // getter is this.currentAmount()
    address payable public owner; // getter is this.owner()

    // the indexed parameters for logged events will allow you to search for
    // these events using the indexed parameters as filters
    event MessageUpdated(
        string newMessage,
        address indexed newAdvertiser,
        uint newAmount
    );

    // constructor sets owner
    // other state variables remain empty or zero
    constructor() {
        owner = payable(msg.sender); // Set the contract deployer as the owner
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _; // target function body is executed here
    }

    // updateMessage sets message, currectAdvertiser, CurrentAmount
    // owner remains unchanged and the owner receives the msg.value
    function updateMessage(string calldata newMessage) external payable {
        require(
            msg.value > currentAmount,
            "Must send more Ether than the previous amount!"
        );

        message = newMessage;
        currentAdvertiser = msg.sender;
        currentAmount = msg.value;

        // Transfer the received Ether to the owner's address
        owner.transfer(msg.value);

        emit MessageUpdated(newMessage, msg.sender, msg.value);
    }

    // getCurrentAd reads out message, currentAdvertiser, currentAmount
    function getCurrentAd() external view returns (string memory, address, uint) {
        return (message, currentAdvertiser, currentAmount);
    }

    // updateOwner allows current owner to set new owner
    function updateOwner(address payable newOwner) external onlyOwner {
        owner = newOwner;
    }
}
