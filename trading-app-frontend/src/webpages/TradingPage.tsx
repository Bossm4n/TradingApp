import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { get } from "http";

interface TradingComponent {
  name: string;
}

interface Stock {
  name: string;
  stockID: number;
  prices: StockAtPrice[];
}

interface StockAtPrice {
  time: string;
  price: number;
}

const apple: Stock = {
  name: "apple",
  stockID: 1,
  prices: [
    // Format is DD/mm/YYYY:hh:MM:ss
    { time: "01/01/2000:00:00:00", price: 1 },
    { time: "01/02/2000:00:00:00", price: 2 },
    { time: "01/03/2000:00:00:00", price: 3 },
    { time: "01/04/2000:00:00:00", price: 4 },
    { time: "01/05/2000:00:00:00", price: 5 },
    { time: "01/06/2000:00:00:00", price: 6 },
    { time: "01/07/2000:00:00:00", price: 7 },
    { time: "01/08/2000:00:00:00", price: 8 },
    { time: "01/09/2000:00:00:00", price: 9 },
    { time: "01/10/2000:00:00:00", price: 10 },
    { time: "01/11/2000:00:00:00", price: 11 },
    { time: "01/12/2000:00:00:00", price: 12 },
    { time: "01/13/2000:00:00:00", price: 13 },
    { time: "01/14/2000:00:00:00", price: 14 },
    { time: "01/15/2000:00:00:00", price: 15 },
    { time: "01/16/2000:00:00:00", price: 16 },
    { time: "01/17/2000:00:00:00", price: 17 },
    { time: "01/18/2000:00:00:00", price: 18 },
    { time: "01/19/2000:00:00:00", price: 19 },
    { time: "01/20/2000:00:00:00", price: 20 },
  ],
};

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

  const getStock: (ID: number) => Stock = (ID: number) => {
    // DO STOCK STUFF

    return apple;
  };

  return (
    <div className="">
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
        <div>
          <div>Trading</div>
          <ul>
            {getStock(1).prices.map((stockAtPrice: StockAtPrice) => {
              const date = stockAtPrice.time.slice(0, 10);
              const stockPrice = stockAtPrice.time.slice(11);
              return (
                <li>
                  The {getStock(1).name} stock cost {stockAtPrice.price} on{" "}
                  {date} at {stockPrice}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TradingPage;
