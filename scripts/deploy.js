const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const ChikaToken = await ethers.getContractFactory("ChikaToken");
  const token = await upgrades.deployProxy(ChikaToken, [deployer.address]);
  await token.waitForDeployment();

  const address = await token.getAddress();
  const supply = await token.totalSupply();

  // 0xb0797fBD74044ae9F7E867370EAbd2930A94Ee1d
  console.log("ChikaToken deployed to:", address);
  console.log("Total supply:", ethers.formatEther(supply), "CHIKA");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
