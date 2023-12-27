// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC721Interface {
    // ERC721 Metadata
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function tokenURI(uint256 tokenId) external view returns (string memory);

    // ERC721 Ownership Functions
    function balanceOf(address owner) external view returns (uint256 balance);

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function transferFrom(address from, address to, uint256 tokenId) external;

    function approve(address to, uint256 tokenId) external;

    function setApprovalForAll(address operator, bool approved) external;

    function getApproved(
        uint256 tokenId
    ) external view returns (address operator);

    function isApprovedForAll(
        address owner,
        address operator
    ) external view returns (bool);

    // ERC721 Minting/Burning Functions
    function mint(address to, uint256 tokenId) external;

    function burn(uint256 tokenId) external;
}
