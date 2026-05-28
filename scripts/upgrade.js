const { ethers, upgrades } = require("hardhat");
const { baseAddress, baseSepoliaAddress } = require("./const");

async function upgrade(address) {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const ChikaToken = await ethers.getContractFactory("ChikaToken");
  const token = await upgrades.upgradeProxy(address, ChikaToken);
  await token.waitForDeployment();

  console.log("ChikaToken upgraded.");

  const address = await token.getAddress();
  const implAddress = await upgrades.erc1967.getImplementationAddress(address);
  const adminAddress = await upgrades.erc1967.getAdminAddress(address);

  console.log("Proxy:          ", address);
  console.log("Implementation: ", implAddress);
  console.log("ProxyAdmin:     ", adminAddress);
}


async function main() {
  await upgrade(baseSepoliaAddress);
  // await upgrade(baseAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
