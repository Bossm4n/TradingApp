import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import Navbar from '../components/Navbar';
import SearchBar from './search_bar';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, TimeScale);

interface StockData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

const generateRandomStockData = (symbol: string, basePrice: number = 100, volatility: number = 2, days: number = 100): StockData[] => {
  const stockData: StockData[] = [];
  let currentPrice: number = basePrice;

  for (let i = 0; i < days; i++) {
    const changePercent: number = (Math.random() * 2 - 1) * volatility;
    currentPrice = parseFloat((currentPrice * (1 + changePercent / 100)).toFixed(2));

    const open = currentPrice;
    const close = parseFloat((currentPrice * (1 + (Math.random() * 2 - 1) * volatility / 100)).toFixed(2));
    const high = parseFloat((currentPrice * (1 + Math.random() * volatility / 100)).toFixed(2));
    const low = parseFloat((currentPrice * (1 - Math.random() * volatility / 100)).toFixed(2));
    const volume = Math.floor(Math.random() * 1000000) + 100000;

    stockData.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      open,
      close,
      high,
      low,
      volume
    });
  }

  return stockData.reverse(); // Return in chronological order
}

const styles: { [key: string]: React.CSSProperties } = {
    scrollableContainer: {
      overflowX: "auto",
      whiteSpace: "nowrap",
      padding: "10px 0"
    },
    horizontalList: {
      display: "flex", 
      listStyleType: "none", 
      margin: 0, 
      padding: 0
    },
    listItem: {
      marginRight: "20px",
      padding: "15px", 
      minWidth: "150px",
      backgroundColor: "#f0f0f0",
      borderRadius: "4px", 
      cursor: "pointer", 
      transition: "background-color 0.3s, transform 0.3s"
    },
    chartContainer: {
      marginTop: "20px",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto"
    }
  };

const TradingPage: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const chartRef = useRef<any>(null);

  const marketFunds: { [key: string]: string } = {
    "S&P 500": "SPX",
    "Nasdaq 100": "NDX",
    "Dow 30": "DJI",
    "Nikkei 225": "N225",
    "FTSE 100": "FTSE",
    "DAX": "DAX",
    "CAC 40": "CAC",
    "FTSE MIB": "MIB",
    "IBEX 35": "IBEX",
    "SSE Composite": "SSEC",
    "Hang Seng": "HSI",
    "Nifty 50": "NIFTY"
  };

  const fetchFromApi = (companyName: string) => {
    fetch(`http://13.60.231.205:8080/api/assets/${companyName}`)
      .then(response => response.json())
      .then(data => {
        setChartData({
          labels: data.map((item: StockData) => item.date),
          datasets: [{
            label: companyName,
            data: data.map((item: StockData) => ({
              x: item.date,
              y: item.close
            })),
            borderColor: (context: any) => {
              const chart = context.chart;
              const { dataIndex } = context;
              
              if (dataIndex === 0) return 'gray'; // Default color for the first data point

              const currentValue = chart.data.datasets[0].data[dataIndex];
              const previousValue = chart.data.datasets[0].data[dataIndex - 1];
              
              if (!currentValue || !previousValue) return 'gray'; // Default color if current or previous value is missing

              return currentValue.y > previousValue.y ? 'green' : 'red';
            },
            backgroundColor: 'transparent',
            pointRadius: 0, // Remove the circles at the peaks
            borderWidth: 2,
          }]
        });
      })
      .catch(() => {
        setChartData({
          labels: generateRandomStockData("Sample").map(item => item.date),
          datasets: [{
            label: "Sample",
            data: generateRandomStockData("Sample").map(item => ({
              x: item.date,
              y: item.close
            })),
            borderColor: (context: any) => {
              const chart = context.chart;
              const { dataIndex } = context;
              
              if (dataIndex === 0) return 'gray'; // Default color for the first data point

              const currentValue = chart.data.datasets[0].data[dataIndex];
              const previousValue = chart.data.datasets[0].data[dataIndex - 1];
              
              if (!currentValue || !previousValue) return 'gray'; // Default color if current or previous value is missing

              return currentValue.y > previousValue.y ? 'green' : 'red';
            },
            backgroundColor: 'transparent',
            pointRadius: 0, // Remove the circles at the peaks
            borderWidth: 2,
          }]
        });
      });
  }

  useEffect(() => {
    fetchFromApi('SPX');
    
    // Cleanup chart instance on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div>TradingPage</div>
      <div>
        <h1>Market Summary</h1>
        <div style={styles.scrollableContainer}>
          <ul style={styles.horizontalList}>
            {Object.entries(marketFunds).map(([name, symbol], index) => (
              <li
                key={index}
                style={styles.listItem}
                onClick={() => fetchFromApi(symbol)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        {chartData && (
          <div>
            <h2>Chart for {chartData.datasets[0].label}</h2>
            <SearchBar></SearchBar>
            <Line
              ref={chartRef}
              data={chartData}
              options={{
                scales: {
                  x: {
                    type: 'time',
                    time: {
                      unit: 'day',
                      tooltipFormat: 'MMM dd, yyyy',
                    },
                    title: {
                      display: true,
                      text: 'Date',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Price',
                    },
                    beginAtZero: false,
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
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
