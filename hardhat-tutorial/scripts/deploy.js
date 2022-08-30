//  FakeNFTMarketplace deployed to:  0xaDf3F7cBa7d1A687D63313E89Ad9cF0A2b3F807E
//  DegensDAO deployed to:  0xf325267F59bdE17d504721E5AF4642077c04CA6b
const { ethers } = require("hardhat");
const { DEGENS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
  await fakeNftMarketplace.deployed();

  console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

  // Now deploy the DegensDAO contract
  const DegensDAO = await ethers.getContractFactory("DegensDAO");
  const degensDAO = await DegensDAO.deploy(
    fakeNftMarketplace.address,
    DEGENS_NFT_CONTRACT_ADDRESS,
    {
      // This assumes your account has at least 1 ETH in it's account
      // Change this value as you want
      value: ethers.utils.parseEther("1"),
    }
  );
  await degensDAO.deployed();

  console.log("DegensDAO deployed to: ", degensDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });