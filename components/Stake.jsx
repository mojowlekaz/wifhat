import Image from "next/image";
import React from "react";
import Footer from "./Footer";

export default function Stake() {
  const charts = [
    {
      img: "/heroasset/Group1.svg",
    },
    {
      img: "/heroasset/Group2.svg",
    },
  ];
  return (
    <div className="flex flex-col relative gap-3 justify-center bg-black h-full  items-center">
      <h1 className="text-white font-bold text-[20px]">
        Blast Off with Hyperscaling ZkRevolution
      </h1>
      <div
        style={{ border: "1px solid #38D3D3" }}
        className="w-[870px] h-[489px] px-10 pt-8 bg-black bg-opacity-90 rounded-3xl shadow border "
      >
        <h2 className="text-white">Your stake</h2>
        <br />
        <div className="w-full  h-16 bg-black bg-opacity-90 items-center rounded-lg shadow border border-teal-400">
          <div className="flex relative pt-5 px-5 justify-between items-center">
            <p className="text-white">100</p>
            <p className="text-white">ZKWF</p>
          </div>
        </div>
        <br />

        {charts.map((chart, index) => (
          <div key={index}>
            <Image height={1000} width={1000} src={chart.img} alt="chart" />
          </div>
        ))}
        <br />
        <button className="w-full h-16 bg-teal-400 rounded-lg shadow border border-teal-400">
          <p className="text-white text-[15px] font-bold items-center">
            Stake Now
          </p>
        </button>
      </div>
      <Footer />
    </div>
  );
}
