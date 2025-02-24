const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const INIT_MESSAGE = "Welcome to bid for this messsage board";
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("BidBoardModule", (m) => {
  const initMessage = m.getParameter("_message", INIT_MESSAGE);
  const initAmount = m.getParameter("_initAmount", ONE_GWEI);
  
  const bidboard = m.contract("BidBoard", [initMessage, initAmount]);

  return { bidboard };
});
