const { ethers } = require("hardhat");

async function main() {
  console.log(
    `
 ________  ___  __    ___       __   ___  ________ ___  ___  ________  _________   
|\_____  \|\  \|\  \ |\  \     |\  \|\  \|\  _____\\  \|\  \|\   __  \|\___   ___\ 
 \|___/  /\ \  \/  /|\ \  \    \ \  \ \  \ \  \__/\ \  \\\  \ \  \|\  \|___ \  \_| 
     /  / /\ \   ___  \ \  \  __\ \  \ \  \ \   __\\ \   __  \ \   __  \   \ \  \  
    /  /_/__\ \  \\ \  \ \  \|\__\_\  \ \  \ \  \_| \ \  \ \  \ \  \ \  \   \ \  \ 
   |\________\ \__\\ \__\ \____________\ \__\ \__\   \ \__\ \__\ \__\ \__\   \ \__\
    \|_______|\|__| \|__|\|____________|\|__|\|__|    \|__|\|__|\|__|\|__|    \|__|
`
  );

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ZkWifhatToken contract
  const ZkwifhatToken = await ethers.getContractFactory("ZkwifhatToken");
  const zkwifhatToken = await ZkwifhatToken.deploy();
  await zkwifhatToken.deployed();

  console.log("ZkWifhatToken deployed to:", zkwifhatToken.address);

  // Deploy ZkWifhat contract
  const ZkWifhat = await ethers.getContractFactory("ZkWifhat");
  const zkWifhat = await ZkWifhat.deploy(zkwifhatToken.address);

  await zkWifhat.deployed();
  console.log("ZkWifhat Contract deployed to:", zkWifhat.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
