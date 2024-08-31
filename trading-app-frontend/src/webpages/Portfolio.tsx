import React, { FC, useRef, useState } from "react";
import SummedTransaction from "../interfaces/SummedTransaction";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioProps {
  summedElements: SummedTransaction[];
  balance: number;
}

interface HoveredChartElement {
  element: ArcElement;
  datasetIndex: number;
  index: number;
}

const Portfolio: FC<PortfolioProps> = (props) => {
  const [newChartElementIndex, setNewChartElementIndex] = useState<number>(-1);
  const [oldChartElementIndex, setOldChartElementIndex] = useState<number>(-1);
  const listItemRefs = useRef<Map<number, HTMLLIElement>>(new Map());

  const getCurrentPrice = (assetName: String) => {
    return 132;
  };

  const onHover = (e: any, item: any) => {
    console.log("hover");
    setOldChartElementIndex(newChartElementIndex);
    if (Array.isArray(item) && item.length > 0) {
      const hoveredChartElement: HoveredChartElement = item[0];

      setNewChartElementIndex(hoveredChartElement.index);

      if (newChartElementIndex == oldChartElementIndex) {
        return;
      }

      higlightPortfolioElement(newChartElementIndex, false);
      higlightPortfolioElement(oldChartElementIndex, true);
    } else {
      higlightPortfolioElement(oldChartElementIndex, true);
      setNewChartElementIndex(-1);
    }
  };

  const higlightPortfolioElement = (key: number, leave: boolean) => {
    const listItem = listItemRefs.current.get(key);
    const classes = "text-red-300";
    // console.log(listItem);
    if (leave) {
      listItem?.classList.remove(classes);
    } else {
      listItem?.classList.add(classes);
    }
  };

  // Calculate the value of each stock
  const stockValues = props.summedElements.map((summedTransaction) => {
    const { numOfAssets, assetName } = summedTransaction;
    const currentPrice = getCurrentPrice(assetName);
    return numOfAssets * currentPrice;
  });

  stockValues.push(props.balance);

  const stockLabels = props.summedElements.map((summedTransaction) => {
    const { numOfAssets, assetName } = summedTransaction;
    return `${assetName} (${numOfAssets} stock${numOfAssets !== 1 ? "s" : ""})`;
  });

  stockLabels.push("Balance ($USD)");

  // Prepare data for the Donut chart
  const data = {
    labels: stockLabels,
    datasets: [
      {
        data: stockValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: "bottom" as const, // Position of the legend
        labels: {
          font: {
            size: 12, // Font size of the labels
          },
          boxWidth: 10, // Width of the legend box
          padding: 20, // Padding between legend items and the chart
        },
      },
    },
    onHover: (e: any, item: any) => onHover(e, item),
  };

  return (
    <div>
      Portfolio
      <div className="flex flex-row">
        <ul>
          {props.summedElements.map((summedTransaction, index) => {
            return (
              <li
                key={index}
                ref={(el) => {
                  if (el) {
                    listItemRefs.current.set(index, el);
                  } else {
                    listItemRefs.current.delete(index);
                  }
                }}
              >
                You have {summedTransaction.numOfAssets} stock
                {summedTransaction.numOfAssets != 1 ? "s" : ""} of{" "}
                {summedTransaction.assetName} at the current price of{" "}
                {getCurrentPrice(summedTransaction.assetName)}.
              </li>
            );
          })}
        </ul>

        <div className="w-1/2 h-96">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
