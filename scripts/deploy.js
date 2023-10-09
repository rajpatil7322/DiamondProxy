// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const accounts=await hre.ethers.getSigners();

  // Deploying Diamond Contract

  const diamond = await hre.ethers.deployContract("Diamond",[accounts[0].address]);


  await diamond.waitForDeployment();

  // Deploying the first facet which is FacetA

  const faceta=await hre.ethers.deployContract("FacetA");


  await faceta.waitForDeployment();

  // Deploying the first facet which is FacetB

  const facetb=await hre.ethers.deployContract("FacetB");


  await facetb.waitForDeployment();

  // Adding the FacetA to the diamond contract which will be our our first iteration..

  const tx=await diamond.connect(accounts[0]).diamondCut({facetAddress:faceta.target,functionSelectors:["0x1003e2d2","0x67e0badb"]});

  await tx.wait();

   // Adding the FacetB to the diamond contract which will be our our second iteration..

  const tx2=await diamond.connect(accounts[0]).diamondCut({facetAddress:facetb.target,functionSelectors:["0x27ee58a6"]});

  await tx2.wait();
 
  // Interacting with the diamond contract

  const proxyA=await hre.ethers.getContractAt("FacetA",diamond.target);

  await proxyA.waitForDeployment();

  const proxyB=await hre.ethers.getContractAt("FacetB",diamond.target);

  await proxyB.waitForDeployment();


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
