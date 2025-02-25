const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const INIT_MESSAGE = "Welcome to bid for this messsage board";
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("BidBoardModule", (m) => {
  //const initMessage = m.getParameter("_message", INIT_MESSAGE);
  //const initAmount = m.getParameter("_initAmount", ONE_GWEI);

  //During deployment, you can specify parameters in a JSON file that maps module IDs
  //with respective parameter names and values. This section will focus on retrieving
  //parameters, while the Defining parameters during deployment section explains how
  //to provide them.
  //To access these values, you can call m.getParameter providing the name for the
  //parameter as the first argument. You can also make your parameters optional by
  //providing a second argument to m.getParameter which will act as the default value
  //in case the parameter isn't provided. 
  
  const bidboard = m.contract("BidBoard", [INIT_MESSAGE, ONE_GWEI]);

  return { bidboard };
});
