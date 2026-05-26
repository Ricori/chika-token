const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const CHIKA_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const ChikaToken = await ethers.getContractFactory("ChikaToken");
  const token = await upgrades.upgradeProxy(CHIKA_ADDRESS, ChikaToken);
  await token.waitForDeployment();

  console.log("ChikaToken upgraded");

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
