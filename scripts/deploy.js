const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const ChikaToken = await ethers.getContractFactory("ChikaToken");
  const token = await upgrades.deployProxy(ChikaToken, [deployer.address], {
    initializer: "initialize",
    kind: "transparent",
  });
  await token.waitForDeployment();

  const address = await token.getAddress();

  console.log("ChikaToken deployed.");

  const implAddress = await upgrades.erc1967.getImplementationAddress(address);
  const adminAddress = await upgrades.erc1967.getAdminAddress(address);

  console.log("Proxy:          ", address);
  console.log("Implementation: ", implAddress);
  console.log("ProxyAdmin:     ", adminAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
