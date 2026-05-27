const { ethers } = require("hardhat");
const { baseSepoliaTokenAddress } = require("./const");

const address = baseSepoliaTokenAddress;

async function getToken() {
  const ChikaToken = await ethers.getContractFactory("ChikaToken");
  return ChikaToken.attach(address);
}

// 查询总供应量
async function getTotalSupply() {
  const token = await getToken();
  const value = await token.totalSupply();
  console.log("Total supply:", ethers.formatEther(value), "CHIKA");
}

// 查询指定地址余额
async function getBalance(walletAddress) {
  const token = await getToken();
  const value = await token.balanceOf(walletAddress);
  console.log(`Balance of ${walletAddress}:`, ethers.formatEther(value), "CHIKA");
}

// Mint 代币
async function mintToken(toAddress, amount) {
  const [owner] = await ethers.getSigners();
  const token = (await getToken()).connect(owner);

  const mintAmount = ethers.parseEther(amount.toString());

  // 检查是否超过最大供应量
  const totalSupply = await token.totalSupply();
  const maxSupply = await token.MAX_SUPPLY();
  if (totalSupply + mintAmount > maxSupply) {
    console.error("超过最大供应量 20,000,000 CHIKA");
    return;
  }

  console.log(`正在 mint ${amount} CHIKA 到 ${toAddress}...`);
  const tx = await token.mint(toAddress, mintAmount);
  await tx.wait();
  console.log("Mint 成功，交易哈希:", tx.hash);
}

async function transfer(toAddress, amount) {
  const [signer] = await ethers.getSigners();
  const token = (await getToken()).connect(signer);
  const transferAmount = ethers.parseEther(amount.toString());

  // 检查余额是否足够
  const balance = await token.balanceOf(signer.address);
  if (balance < transferAmount) {
    console.error(`余额不足，当前余额: ${ethers.formatEther(balance)} CHIKA`);
    return;
  }

  console.log(`正在转账 ${amount} CHIKA 到 ${toAddress}...`);
  const tx = await token.transfer(toAddress, transferAmount);
  await tx.wait();
  console.log("转账成功，交易哈希:", tx.hash);

  const fromBalance = await token.balanceOf(signer.address);
  const toBalance = await token.balanceOf(toAddress);
  console.log(`转出方余额: ${ethers.formatEther(fromBalance)} CHIKA`);
  console.log(`接收方余额: ${ethers.formatEther(toBalance)} CHIKA`);
}




async function main() {
  const [owner] = await ethers.getSigners();

  /*
  await getTotalSupply();
  await getBalance(owner.address);
  // Mint 100,0000 CHIKA 到 owner
  await mintToken(owner.address, 100 * 10000);
  // Mint 后再次查询
  await getTotalSupply();
  await getBalance(owner.address);
  */

  //await transfer("0xD70a27A537c2864Ec71f853807B4253db2213d6b", 100000);
  //await getBalance(owner.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });