const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BidBoardModule", (m) => {
  const bidboard = m.contract("BidBoard");

  return { bidboard };
});
