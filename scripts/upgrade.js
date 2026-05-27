const { ethers, upgrades } = require("hardhat");
const { baseSepoliaTokenAddress } = require("./const");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const ChikaToken = await ethers.getContractFactory("ChikaToken");
  const token = await upgrades.upgradeProxy(baseSepoliaTokenAddress, ChikaToken);
  await token.waitForDeployment();

  console.log("ChikaToken upgraded.");

  const address = await token.getAddress();
  const implAddress = await upgrades.erc1967.getImplementationAddress(baseSepoliaTokenAddress);
  const adminAddress = await upgrades.erc1967.getAdminAddress(baseSepoliaTokenAddress);

  console.log("Proxy:          ", address);
  console.log("Implementation: ", implAddress);
  console.log("ProxyAdmin:     ", adminAddress);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
