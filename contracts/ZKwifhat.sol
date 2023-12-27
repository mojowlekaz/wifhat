/*
 ________  ___  __    ___       __   ___  ________ ___  ___  ________  _________   
|\_____  \|\  \|\  \ |\  \     |\  \|\  \|\  _____\\  \|\  \|\   __  \|\___   ___\ 
 \|___/  /\ \  \/  /|\ \  \    \ \  \ \  \ \  \__/\ \  \\\  \ \  \|\  \|___ \  \_| 
     /  / /\ \   ___  \ \  \  __\ \  \ \  \ \   __\\ \   __  \ \   __  \   \ \  \  
    /  /_/__\ \  \\ \  \ \  \|\__\_\  \ \  \ \  \_| \ \  \ \  \ \  \ \  \   \ \  \ 
   |\________\ \__\\ \__\ \____________\ \__\ \__\   \ \__\ \__\ \__\ \__\   \ \__\
    \|_______|\|__| \|__|\|____________|\|__|\|__|    \|__|\|__|\|__|\|__|    \|__|
                                                                                                                                      
*/
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "./IZKwifhat.sol";
import "./ZkwifhatToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./ReentrancyGuard.sol";

contract ZkWifhat is ReentrancyGuard {
    address public owner;
    IERC20 public ZkWifhatToken;
    uint256 MinimumdevFee = 18400000000000000;
    uint256 airdropamount = 500000;
    uint256 referamount = 250000;
    bool ClaimActive = false;

    struct Userprofile {
        address upliner;
        address[] downliner;
        uint256 Refferalrewards;
    }
    address[] public TotalRefferal
    uint256 public  totalTokensClaimed


    mapping(address => bool) public userclaimStatus;
    mapping(address => Userprofile) public userProfiles;
    mapping(address => uint256) public totalTokensClaimedByUser;
    address private OpenMintZKSummon =
        address(0xcD6a42782d230D7c13A74ddec5dD140e55499Df9);
    address private zkAmazons =
        address(0x6CB60eEF90ff9E748b61D1729C9A7356a45b9cce);
    address private ZkMonsters =
        address(0xCBFd5A642A7e63fC455073acC61f9d84C6963137);
    address private ZkSpaceship =
        address(0xa1B11E431b456d0e0064E7cb65de77941870912b);
    address private ZkCastle =
        address(0xb94CB0320D91bF712a00B86c7F7C1eA20D105248);
    address private zkSyncGloryNFT =
        address(0xD6642B5a9C0b1C09730a1ce4a05A9A1e67B33AC5);

    event reffered(address indexed upliner, address indexed downliner);
    event Withdrawn(address indexed owner, uint256 amount);
    modifier Admin() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    constructor(address _zkwifhatToken) {
        ZkWifhatToken = IERC20(_zkwifhatToken);
        owner = msg.sender;
    }

    receive() external payable {}

    function setdevFee(uint256 newdevFee) public Admin returns (bool) {
        MinimumdevFee = newdevFee;
        return true;
    }

    function setClaimActive() external Admin returns (bool) {
        ClaimActive = true;
        return true;
    }

    function getChainId() public view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }

    function getDownliners(
        address user
    ) public view returns (address[] memory) {
        return userProfiles[user].downliner;
    }

    function Refer(address upline) public returns (bool) {
        require(upline != address(0), "Invalid Address");
        require(upline != msg.sender, "You cannot refer yourself");
        require(
            userclaimStatus[upline] == true,
            "Upline has not claimed tokens"
        );
        require(
            userProfiles[msg.sender].upliner == address(0),
            "You have already been referred"
        );

        bool hasNFT = hasAtLeastOneNFT(msg.sender);

        if (!hasNFT) {
            revert("No nfts");
        } else {
            userProfiles[msg.sender].upliner = upline;
            userProfiles[upline].downliner.push(msg.sender);
            userProfiles[upline].Refferalrewards += referamount;
             TotalRefferal.push(msg.sender)

        }
        emit reffered(upline, msg.sender);
        return true;
    }

    function ClaimReferalReward() external payable nonReentrant returns (bool) {
        require(msg.value == MinimumdevFee, "Insufficient funds");
        require(
            userProfiles[msg.sender].Refferalrewards > 0,
            "No refferal rewards available to claim"
        );
        if (userclaimStatus[msg.sender]) {
            require(
                ZkWifhatToken.balanceOf(address(this)) >
                    userProfiles[msg.sender].Refferalrewards,
                "insufficient token"
            );
            require(
                ZkWifhatToken.transfer(
                    msg.sender,
                    userProfiles[msg.sender].Refferalrewards
                ),
                "error in sending"
            );
            userProfiles[msg.sender].Refferalrewards = 0;
        }
        return true;
    }

    function claimAirdrop() external payable nonReentrant returns (bool) {
        require(ClaimActive, "Claiming is not live");
        require(msg.value == MinimumdevFee, "Insufficient funds");

        if (!userclaimStatus[msg.sender]) {
            bool hasNFT = hasAtLeastOneNFT(msg.sender);
            if (!hasNFT) {
                revert("No nfts");
            } else {
                require(
                    ZkWifhatToken.balanceOf(address(this)) > airdropamount,
                    "insufficient token"
                );
                require(
                    ZkWifhatToken.transfer(msg.sender, airdropamount),
                    "Error in sending the token"
                );
                totalTokensClaimedByUser[msg.sender] += airdropamount;
                totalTokensClaimed += airdropamount;
                userclaimStatus[msg.sender] = true;

            }
        } else {
            revert("Already claimed");
        }

        return true;
    }

    function hasAtLeastOneNFT(address user) internal view returns (bool) {
        return (IERC721(OpenMintZKSummon).balanceOf(user) > 0 ||
            IERC721(zkAmazons).balanceOf(user) > 0 ||
            IERC721(ZkMonsters).balanceOf(user) > 0 ||
            IERC721(ZkSpaceship).balanceOf(user) > 0 ||
            IERC721(ZkCastle).balanceOf(user) > 0 ||
            IERC721(zkSyncGloryNFT).balanceOf(user) > 0);
    }

    function withdrawAll() external Admin nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner).transfer(balance);
        emit Withdrawn(owner, balance);
    }

        function getTotalTokensClaimed() external view returns (uint256) {
        return totalTokensClaimed;
    }


    function getTotalrefferal() external view returns(address[] memory) {
        return TotalRefferal;
    }
}
