const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const CHIKA_ADDRESS = "0x06a8290Bbbe82953150551d8697cB87c1A6a2b3F";

  const ChikaToken = await ethers.getContractFactory("ChikaToken");
  const token = await upgrades.upgradeProxy(CHIKA_ADDRESS, ChikaToken);
  await token.waitForDeployment();

  console.log("ChikaToken upgraded");

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
