const hre = require("hardhat");

async function main() {
    const lock = await hre.ethers.deployContract("FacetA");
    console.log(lock)
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });