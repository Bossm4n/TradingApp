import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import User from "../interfaces/User";
import Transaction from "../interfaces/Transaction";
import SummedTransaction from "../interfaces/SummedTransaction";
import "../css_files/profile.css"; // Import the CSS file
import Portfolio from "./Portfolio";

const Profile = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summedTransactions, setSummedTransactions] = useState<
    SummedTransaction[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(50000); // Starting balance

  const navigate = useNavigate();
  const loggedIn = JSON.parse(sessionStorage.getItem("active") || "false");

  const fetchTransactions = async () => {
    try {
      if (user != null && user.userID) {
        await getTransactions(user.userID);
      }
    } catch (err) {
      console.error("Error getting transactions: " + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/invalid-page");
    }
    const userData = sessionStorage.getItem("user");
    setUser(userData ? JSON.parse(userData) : null);

    fetchTransactions();
  }, [loggedIn, navigate, loading]);

  // useEffect(() => {
  //   if (transactions) {
  //     let total = 50000;
  //     transactions.forEach((transaction) => {
  //       total -= transaction.assetPrice * transaction.numOfAssets;
  //     });
  //     setBalance(total);
  //   }
  // }, [transactions]);

  const getTransactions = async (userID: Number) => {
    await fetch(`http://13.60.231.205:8080/api/transaction/${userID}`)
      .then((response) => response.json())
      .then((transactionsJSON: Transaction[]) => {
        const allTransactionsSummedMap: Map<String, number> = new Map();

        for (const transaction of transactionsJSON) {
          const assetName = transaction.assetName;

          // Checks if the asset is not in the map
          if (!allTransactionsSummedMap.has(assetName)) {
            allTransactionsSummedMap.set(
              transaction.assetName,
              transaction.numOfAssets
            );
          }
          // If the asset is in the map it gets the current value then sets adds the new number of assets to it.
          else {
            const currAssets = allTransactionsSummedMap.get(assetName) || 0;
            allTransactionsSummedMap.set(
              transaction.assetName,
              transaction.numOfAssets + currAssets
            );
          }
        }

        const allTransactionsSummed: SummedTransaction[] = [];

        console.log(allTransactionsSummed);

        allTransactionsSummedMap.forEach((numOfAssets, assetName) => {
          allTransactionsSummed.push({
            assetName: assetName,
            numOfAssets: numOfAssets,
          });
        });

        console.log(allTransactionsSummed);

        setSummedTransactions(allTransactionsSummed);
        setTransactions(transactionsJSON);

        console.log(summedTransactions);
      })
      .catch((error) => {
        console.error("Error while fetching data: " + error);
      });
  };

  const getTransactionsElements = (transactions: Transaction[] | null) => {
    console.log("Transcations:", transactions);

    if (transactions) {
      return (
        <ul className="transactions-list">
          {transactions.map((transaction) => {
            const assetPrice = transaction.assetPrice.toFixed(2);

            return (
              <li key={transaction.transactionID} className="transaction-item">
                <span className="transaction-quantity">
                  {transaction.numOfAssets} stock
                  {transaction.numOfAssets > 1 ? "s" : ""}
                </span>{" "}
                of{" "}
                <span className="transaction-name">
                  {transaction.assetName}
                </span>{" "}
                {Number(assetPrice) > 0 ? "bought" : "sold"} for
                <span className="transaction-price">
                  {" "}
                  ${assetPrice}
                </span> on{" "}
                <span className="transaction-date">
                  {transaction.dateCreated}
                </span>
                .
              </li>
            );
          })}
        </ul>
      );
    }
  };

  const getSummedTransactionsElements = (
    summedTransactions: SummedTransaction[]
  ) => {
    console.log("Summed transcations:", summedTransactions);

    if (summedTransactions.length > 0) {
      console.log(summedTransactions);
      const allTransactionsComponents = summedTransactions.map(
        (currTransaction, index) => (
          <li key={index}>
            You have {currTransaction.numOfAssets} stock
            {currTransaction.numOfAssets != 1 ? "s" : ""} of{" "}
            {currTransaction.assetName}.
          </li>
        )
      );

      return <ul>{allTransactionsComponents}</ul>;
    }
    return null;
  };

  if (!loggedIn || !user) {
    return null;
  }

  return (
    <div className="profile-container">
      <Navbar />

      <div className="profile-info">
        <div className="profile-name">
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </div>
        <div className="profile-email">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="profile-balance">
          <strong>Current Balance:</strong> ${user.balance.toFixed(2)}
        </div>
      </div>

      <Portfolio summedElements={summedTransactions} balance={user.balance} />

      <div className="profile-transactions">
        <h2>Previous Transactions</h2>
        {getTransactionsElements(transactions)}
      </div>

      <div></div>
    </div>
  );
};

export default Profile;
