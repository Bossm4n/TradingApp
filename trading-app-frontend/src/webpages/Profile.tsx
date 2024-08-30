import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import User from "../interfaces/User";
import Transaction from "../interfaces/Transaction";
import "../css_files/profile.css"; // Import the CSS file

const Profile = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(50000); // Starting balance

  const navigate = useNavigate();
  const loggedIn = JSON.parse(sessionStorage.getItem("active") || "false");

  useEffect(() => {
    if (!loggedIn) {
      navigate("/invalid-page");
    }

    const userData = sessionStorage.getItem("user");
    setUser(userData ? JSON.parse(userData) : null);

    if (userData) {
      fetchTransactions(JSON.parse(userData).userID);
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (transactions) {
      let total = 50000;
      transactions.forEach((transaction) => {
        total -= transaction.assetPrice * transaction.numOfAssets;
      });
      setBalance(total);
    }
  }, [transactions]);

  const fetchTransactions = async (userID: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/transaction/${userID}`);
      if (response.ok) {
        const transactionsJSON: Transaction[] = await response.json();
        setTransactions(transactionsJSON);
      } else {
        console.error("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error while fetching transactions: " + error);
    }
  };

  const getTransactionsElements = (transactions: Transaction[] | null) => {
    if (transactions) {
      return (
        <ul className="transactions-list">
          {transactions.map((transaction) => (
            <li key={transaction.transactionID} className="transaction-item">
              <span className="transaction-quantity">
                {transaction.numOfAssets} stock{transaction.numOfAssets > 1 ? "s" : ""}
              </span>{" "}
              of <span className="transaction-name">{transaction.assetName}</span> bought for $
              <span className="transaction-price">{transaction.assetPrice.toFixed(2)}</span> on{" "}
              <span className="transaction-date">{transaction.dateCreated}</span>.
            </li>
          ))}
        </ul>
      );
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
          <strong>Current Balance:</strong> ${balance.toFixed(2)}
        </div>
      </div>
      <div className="profile-transactions">
        <h2>Transactions</h2>
        {getTransactionsElements(transactions)}
      </div>
    </div>
  );
};

export default Profile;
