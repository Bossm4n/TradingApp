import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import User from "../interfaces/User";
import Transaction from "../interfaces/Transaction";

const Profile = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const loggedIn = JSON.parse(sessionStorage.getItem("active") || "false");

  useEffect(() => {
    if (!loggedIn) {
      // Redirect to "/invalid-page" if the user is not logged in
      navigate("/invalid-page");
    }

    const userData = sessionStorage.getItem("user");
    setUser(userData ? JSON.parse(userData) : null);

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

    fetchTransactions();
  }, [loggedIn, navigate, loading]);

  if (!loggedIn || user == null) {
    return null;
  }

  const getTransactions = async (userID: Number) => {
    await fetch(`http://localhost:8080/api/transaction/${userID}`)
      .then((response) => response.json())
      .then((transactionsJSON: Transaction[]) => {
        setTransactions(transactionsJSON);
      })
      .catch((error) => console.log("Error while fetching data: " + error));
  };

  const getTransactionsElements = (transactions: Transaction[] | null) => {
    if (transactions) {
      const allTransactionsComponents = transactions.map((transaction) => (
        <li key={transaction.transactionID}>
          {transaction.numOfAssets} stock
          {transaction.numOfAssets > 1 ? "s" : ""} of {transaction.assetName}{" "}
          bought for ${transaction.assetPrice.toFixed(2)} on{" "}
          {transaction.dateCreated}.
        </li>
      ));

      return <ul>{allTransactionsComponents}</ul>;
    }

    return <></>;
  };

  return (
    <div>
      <Navbar />
      Profile
      <div>
        Name: {user.firstName} {user.lastName}
      </div>
      <div>Email: {user.email}</div>
      <div>Current Balance: {user.balance.toString()}</div>
      <div>{getTransactionsElements(transactions)}</div>
    </div>
  );
};

export default Profile;
