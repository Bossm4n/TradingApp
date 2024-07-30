import React from "react";
import Navbar from "../components/Navbar";

interface Stock {
  name: string;
  StockID: number;
  prices?: [];
}

const stocks: Stock[] = [
  { name: "apple", StockID: 1 },
  { name: "google", StockID: 2 },
  { name: "facebook", StockID: 3 },
  { name: "microsoft", StockID: 4 },
  { name: "nvdia", StockID: 5 },
  { name: "amazon", StockID: 6 },
  { name: "tesla", StockID: 7 },
  { name: "jpmorgan", StockID: 8 },
  { name: "visa", StockID: 9 },
  { name: "mastercard", StockID: 10 },
];

const Search = () => {
  const getStocksList: () => Stock[] = () => {
    // Handle getting stocks

    return stocks;
  };

  return (
    <div>
      <Navbar />
      <div>Search</div>
      <ul>
        {getStocksList().map((currentStock) => {
          return <li>{currentStock.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Search;
