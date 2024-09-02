import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import Navbar from "../components/Navbar";
import SearchBar from "./search_bar";
import "../css_files/trading_page.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
);

interface StockData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

interface User {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  DOB: string;
  balance: number;
  name: string;
  dob: string;
}

const generateRandomStockData = (
  symbol: string,
  basePrice: number = 100,
  volatility: number = 2,
  days: number = 100
): StockData[] => {
  const stockData: StockData[] = [];
  let currentPrice: number = basePrice;

  for (let i = 0; i < days; i++) {
    const changePercent: number = (Math.random() * 2 - 1) * volatility;
    currentPrice = parseFloat(
      (currentPrice * (1 + changePercent / 100)).toFixed(2)
    );

    const open = currentPrice;
    const close = parseFloat(
      (
        currentPrice *
        (1 + ((Math.random() * 2 - 1) * volatility) / 100)
      ).toFixed(2)
    );
    const high = parseFloat(
      (currentPrice * (1 + (Math.random() * volatility) / 100)).toFixed(2)
    );
    const low = parseFloat(
      (currentPrice * (1 - (Math.random() * volatility) / 100)).toFixed(2)
    );
    const volume = Math.floor(Math.random() * 1000000) + 100000;

    stockData.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      open,
      close,
      high,
      low,
      volume,
    });
  }

  return stockData.reverse(); // Return in chronological order
};

const styles: { [key: string]: React.CSSProperties } = {
  scrollableContainer: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    padding: "10px 0",
  },
  horizontalList: {
    display: "flex",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  listItem: {
    marginRight: "20px",
    padding: "15px",
    minWidth: "150px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
  },
  selectedListItem: {
    backgroundColor: "blue",
    color: "white",
  },
  chartContainer: {
    marginTop: "20px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  errorMessage: {
    color: "red",
    fontSize: "16px",
    margin: "10px 0",
    display: "block",
    textAlign: "center",
  },
};

const TradingPage: React.FC = () => {
  const [buyNumShares, setBuyNumShares] = useState(0);
  const [sellNumShares, setSellNumShares] = useState(0);
  const [chartData, setChartData] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>("SPX"); // Track the selected company
  const chartRef = useRef<any>(null);
  const [buyErrorMessage, setBuyErrorMessage] = useState<string | null>(null);
  const [sellErrorMessage, setSellErrorMessage] = useState<string | null>(null);

  const marketFunds: { [key: string]: string } = {
    "S&P 500": "SPX",
    "Nasdaq 100": "NDX",
    "Dow 30": "DJI",
    "Nikkei 225": "N225",
    "FTSE 100": "FTSE",
    DAX: "DAX",
    "CAC 40": "CAC",
    "FTSE MIB": "MIB",
    "IBEX 35": "IBEX",
    "SSE Composite": "SSEC",
    "Hang Seng": "HSI",
    "Nifty 50": "NIFTY",
  };

  const fetchFromApi = (companyName: string) => {
    setSelectedCompany(companyName);

    fetch(`http://13.60.231.205:8080/api/assets/${companyName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.prices && data.prices !== "[]") {
          data.prices = JSON.parse(data.prices);
          setChartData({
            labels: data.prices.map((item: StockData) => item.date),
            datasets: [
              {
                label: companyName,
                data: data.prices.map((item: StockData) => ({
                  x: item.date,
                  y: item.close,
                })),
                borderColor: (context: any) => {
                  const chart = context.chart;
                  const { dataIndex } = context;

                  if (dataIndex === 0) return "gray"; // Default color for the first data point

                  const currentValue = chart.data.datasets[0].data[dataIndex];
                  const previousValue =
                    chart.data.datasets[0].data[dataIndex - 1];

                  if (!currentValue || !previousValue) return "gray"; // Default color if current or previous value is missing

                  return currentValue.y > previousValue.y ? "green" : "red";
                },
                backgroundColor: "transparent",
                pointRadius: 0, // Remove the circles at the peaks
                borderWidth: 2,
              },
            ],
          });
        } else {
          // Handle case where no data is returned from the API
          setChartData({
            labels: generateRandomStockData(companyName).map(
              (item) => item.date
            ),
            datasets: [
              {
                label: companyName,
                data: generateRandomStockData(companyName).map((item) => ({
                  x: item.date,
                  y: item.close,
                })),
                borderColor: (context: any) => {
                  const chart = context.chart;
                  const { dataIndex } = context;

                  if (dataIndex === 0) return "gray"; // Default color for the first data point

                  const currentValue = chart.data.datasets[0].data[dataIndex];
                  const previousValue =
                    chart.data.datasets[0].data[dataIndex - 1];

                  if (!currentValue || !previousValue) return "gray"; // Default color if current or previous value is missing

                  return currentValue.y > previousValue.y ? "green" : "red";
                },
                backgroundColor: "transparent",
                pointRadius: 0, // Remove the circles at the peaks
                borderWidth: 2,
              },
            ],
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchFromApi("SPX");

    // Cleanup chart instance on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  async function purchase(): Promise<void> {
    const json = sessionStorage.getItem("user");
    let user: User;
    let id: number;
    if (json !== null) {
      const latestPrice =
        chartData.datasets[0].data[chartData.datasets[0].data.length - 1].y;
      user = JSON.parse(json);
      id = user.userID;

      // Format the date as 'YYYY-MM-DD'
      const formattedDate = new Date().toISOString().split("T")[0];

      const data = {
        userID: id,
        assetName: selectedCompany,
        assetPrice: latestPrice,
        numOfAssets: buyNumShares,
        dateCreated: formattedDate, // Use 'dateCreated' to match your backend field
      };

      const response = await fetch(
        `http://13.60.231.205:8080/api/transaction/buy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 500) {
        setBuyErrorMessage(
          "Your current balance is insufficient to complete this transaction."
        );
        setTimeout(() => {
          setBuyErrorMessage(null);
        }, 5000);
      } else {
        console.log("Purchase successful", response.status);

        // Updates user data in session storage
        const userData = sessionStorage.getItem("user");
        const tempUser: User | null = userData ? JSON.parse(userData) : null;
        if (tempUser != null) {
          tempUser.balance -= latestPrice * buyNumShares;
        } else {
          console.log(
            "error updating balance while getting userData from sessionStorage"
          );
        }

        sessionStorage.setItem("user", JSON.stringify(tempUser));
      }
      setBuyNumShares(0);
    }
  }

  const sell = async () => {
    const json = sessionStorage.getItem("user");
    let user: User;
    let id: number;
    if (json !== null) {
      const latestPrice =
        chartData.datasets[0].data[chartData.datasets[0].data.length - 1].y;
      user = JSON.parse(json);
      id = user.userID;

      // Format the date as 'YYYY-MM-DD'
      const formattedDate = new Date().toISOString().split("T")[0];

      const transaction = {
        userID: id,
        assetName: selectedCompany,
        assetPrice: latestPrice,
        numOfAssets: -sellNumShares,
        dateCreated: formattedDate, // Use 'dateCreated' to match your backend field
      };

      console.log(transaction);

      fetch("http://13.60.231.205:8080/api/transaction/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      })
        .then((response) => {
          if (response.status === 500) {
            setSellErrorMessage(
              "Your current balance is insufficient to complete this transaction."
            );
            setTimeout(() => {
              setSellErrorMessage(null);
            }, 5000);
          } else {
            console.log("Sale successful", response.status);

            // Updates user data in session storage
            const userData = sessionStorage.getItem("user");
            const tempUser: User | null = userData
              ? JSON.parse(userData)
              : null;
            if (tempUser != null) {
              tempUser.balance += latestPrice * sellNumShares;
            } else {
              console.log(
                "error updating balance while getting userData from sessionStorage"
              );
            }

            sessionStorage.setItem("user", JSON.stringify(tempUser));
          }
        })
        .catch((err) => {
          console.error("Error when posting fetch transaction: ", err);
        });

      setSellNumShares(0);
    }
  };

  const handlebuyNumShares = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyNumShares(parseInt(event.target.value));
  };

  const handleSellNumShares = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSellNumShares(parseInt(event.target.value));
  };

  return (
    <div className="trading-container">
      <Navbar />
      <div className="hor-bar">
        <div style={styles.scrollableContainer}>
          <ul style={styles.horizontalList}>
            {Object.entries(marketFunds).map(([name, symbol], index) => (
              <li
                key={index}
                style={{
                  ...styles.listItem,
                  ...(selectedCompany === symbol
                    ? styles.selectedListItem
                    : {}),
                }}
                onClick={() => fetchFromApi(symbol)}
                onMouseEnter={(e) => {
                  if (selectedCompany !== symbol) {
                    e.currentTarget.style.backgroundColor = "#e0e0e0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCompany !== symbol) {
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
                  }
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <SearchBar fetchFromApi={fetchFromApi} />
        {sessionStorage.getItem("active") === "true" && (
          <div className="flex flex-row">
            <div className="button-container">
              <h1>Buy Shares</h1>
              <input
                id="quant"
                type="number"
                value={buyNumShares}
                min="0"
                onChange={handlebuyNumShares}
              />
              <button onClick={purchase}>Purchase</button>
              {buyErrorMessage && (
                <p style={styles.errorMessage}>{buyErrorMessage}</p>
              )}
            </div>
            <div className="button-container">
              <h1>Sell Shares</h1>
              <input
                id="quant"
                type="number"
                value={sellNumShares}
                min="0"
                onChange={handleSellNumShares}
              />
              <button onClick={sell}>Sell</button>
              {sellErrorMessage && (
                <p style={styles.errorMessage}>{sellErrorMessage}</p>
              )}
            </div>
          </div>
        )}

        {chartData && (
          <div>
            <h2 className="p-trading">
              Chart for {chartData.datasets[0].label}
            </h2>
            <Line
              ref={chartRef}
              data={chartData}
              options={{
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "day",
                      tooltipFormat: "MMM dd, yyyy",
                    },
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Price",
                    },
                    beginAtZero: false,
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context: any) => `Price: ${context.parsed.y}`,
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingPage;
