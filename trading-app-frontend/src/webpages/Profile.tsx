import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import User from "../interfaces/User";
import Transaction from "../interfaces/Transaction";
import SummedTransaction from "../interfaces/SummedTransaction";

const Profile = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summedTransactions, setSummedTransactions] = useState<
    SummedTransaction[]
  >([]);
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

  if (loading) {
    return <div>Loading</div>;
  }

  if (!loggedIn || user == null) {
    return null;
  }

  const getTransactions = async (userID: Number) => {
    await fetch(`http://localhost:8080/api/transaction/${userID}`)
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

        allTransactionsSummedMap.forEach((numOfAssets, assetName) => {
          allTransactionsSummed.push({
            assetName: assetName,
            numOfAssets: numOfAssets,
          });
        });

        setSummedTransactions(allTransactionsSummed);
        setTransactions(transactionsJSON);
      })
      .catch((error) => console.log("Error while fetching data: " + error));
  };

  const getSummedTransactionsElements = (
    summedTransactions: SummedTransaction[]
  ) => {
    if (summedTransactions.length > 0) {
      const allTransactionsComponents = summedTransactions.map(
        (transaction, index) => (
          <li key={index}>
            You have {transaction.numOfAssets} stock
            {transaction.numOfAssets != 1 ? "s" : ""} of {transaction.assetName}
            .
          </li>
        )
      );

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
      <div>{getSummedTransactionsElements(transactions)}</div>
    </div>
  );
};

export default Profile;
