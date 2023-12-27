import Image from "next/image";
import React from "react";

export default function Hero() {
  const socials = [
    {
      img: "/heroasset/X.svg",
    },
    {
      img: "/heroasset/discord.svg",
    },
    {
      img: "/heroasset/telegram.svg",
    },

    {
      img: "/heroasset/goggle.svg",
    },
  ];
  return (
    <div className="relative h-full bg-02124d">
      <div className="flex flex-col py-20  justify-center items-center">
        <h1 className="text-white  font-bold text-[64px]">
          Zk-Native MEME LAUCHPAD
        </h1>
        <div className="">
          <p className="text-[20px] font-[400] text-white items-center justify-center ">
            Simple and secure to LAUNCH ,STAKE and AIRDROP MEME Tokens
          </p>
        </div>
        <br />
        <div className="flex justify-center relative gap-10 items-center">
          <button className="w-60 h-16 text-[20px] bg-teal-400 font-bold rounded-lg shadow border border-black">
            Use App
          </button>

          <button
            style={{ color: "#38D3D3" }}
            className="w-60 h-16 font-bold text-[20px]  bg-black rounded-lg shadow border border-teal-400"
          >
            Airdrop
          </button>
        </div>

        <br />
        <br />
        <p style={{ color: "#D9D9D9" }} className="">
          Follow us on
        </p>
        <div className="flex flex-row relative gap-2">
          {socials.map((social, index) => (
            <div key={index}>
              <img src={social.img} alt="socials" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
