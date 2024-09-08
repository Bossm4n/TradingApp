import React, { FC, useEffect, useRef, useState } from "react";
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
  const [loadingProps, setLoadingProps] = useState<boolean>(true);
  const [backgroundColors, setBackgroundColors] = useState<string[]>([]);
  const listItemRefs = useRef<Map<number, HTMLLIElement>>(new Map());

  useEffect(() => {
    if (props.summedElements.length !== 0) {
      setLoadingProps(false);

      if (backgroundColors.length === 0) {
        const summedElementsAndBalance: any[] = props.summedElements.map(
          (index) => Math.random()
        );
        summedElementsAndBalance.push(Math.random());

        setBackgroundColors(
          summedElementsAndBalance.map((_, index) => getRandomColor())
        );
      }
    }
  }, [props.summedElements, loadingProps]);

  if(props.summedElements.length<1){
    return <></>
  }

  const getCurrentPrice = (assetName: String) => {
    // We need to implement a live price getter however due to restricted api calls we are using a fixed value for now. Will be updated in the future.
    return 100 * Math.random();
  };

  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const onHover = (e: any, item: any) => {
    setOldChartElementIndex(newChartElementIndex);
    if (Array.isArray(item) && item.length > 0) {
      const hoveredChartElement: HoveredChartElement = item[0];

      setNewChartElementIndex(hoveredChartElement.index);

      if (newChartElementIndex === oldChartElementIndex) {
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
    const classes = "portfolio-li-hover";
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
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
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

  if (loadingProps) {
    return <div>loading</div>;
  }

  return (
    <div className="portfolio">
      <h2 className="mb-4 text-xl">Portfolio</h2>
      <div className="flex flex-row">
        <ul>
          {props.summedElements.map((summedTransaction, index) => {
            if (summedTransaction.numOfAssets === 0) {
              return;
            }
            const currPrice = getCurrentPrice(summedTransaction.assetName)

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
                <b>
                  {summedTransaction.numOfAssets} stock
                  {summedTransaction.numOfAssets != 1 ? "s" : ""}
                </b>{" "}
                of{" "}
                <span className=" text-purple-900">
                  {summedTransaction.assetName}
                </span>{" "}
                at{" "}
                <span className="text-stone-600">
                  ${currPrice.toFixed(2)}
                </span>{" "}
                a share, for a total value of{" "}
                <span className=" text-green-900">
                  $
                  {(currPrice * summedTransaction.numOfAssets).toFixed(2)}
                </span>
                .
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
