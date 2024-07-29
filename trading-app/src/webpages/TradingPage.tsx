import React, { Component } from "react";
import Navbar from "../components/Navbar";

interface TradingComponent {
  name: string;
}

const TradingPage = () => {
  // Function that gets all components for trading (e.g. fibonannci retracement)
  const getComponenets: () => TradingComponent[] = () => {
    const allComponents: TradingComponent[] = [];
    for (let i = 1; i < 7; i += 1) {
      const tempComponent: TradingComponent = { name: `Component ${i}` };
      allComponents.push(tempComponent);
    }

    return allComponents;
  };

  return (
    <div className="px-5">
      <Navbar />

      {/* Title */}
      <div>TradingPage</div>

      <div className="bg-slate-100 flex flex-row">
        {/* Loops through all trading componenets and then adds the to the list */}
        <ul className="w-36 bg-slate-50">
          {getComponenets().map((tradingComponent) => {
            return <li>{tradingComponent.name}</li>;
          })}
        </ul>

        {/* Contains all the live data */}
        <div>Trading</div>
      </div>
    </div>
  );
};

export default TradingPage;
