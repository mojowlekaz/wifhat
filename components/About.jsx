import React from "react";
import Stake from "./Stake";

export default function About() {
  const content = [
    {
      text: (
        <div>
          Inspired by the outburst of Arbdoge AI, ZkWif Launchpad will set out
          to facilitate the launch of Erc20 Tokens, Token Sale, Token
          distribution in the form of an airdrop, providing a staking interface
          enabling staking of Erc20, Erc721 Assets on ZkSync.
        </div>
      ),
    },

    {
      text: (
        <div>
          ZkWifHat is built differently as the first meme token with native
          utility on the most performant L2 chain scaling Ethereum with ZK tech
          - ZkSync.
        </div>
      ),
    },
  ];

  return (
    <div className="bg-black h-full w-full gap-9 flex flex-col">
      <div className="px-4  pt-8 flex justify-center items-center">
        <h1 className="font-bold text-[32px] text-white">ABOUT</h1>
      </div>

      <div className="flex relative flex-row gap-20 justify-center items-center ">
        {content.map((texts, index) => (
          <div
            style={{ border: "1px solid #2E8F01" }}
            className="w-[441px] h-[240px] flex flex-shrink-0 justify-center items-center  bg-black bg-opacity-90 rounded-3xl shadow border "
          >
            <div key={index}>
              <p
                style={{ color: "#2E8F01" }}
                className=" text-center  text-[15px] font-medium "
              >
                {texts.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Stake />
    </div>
  );
}
