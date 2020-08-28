import React from "react";
import { LineChart, XAxis, YAxis, Line, Tooltip } from "recharts";

import { mean } from "../utility";

const MonthlyChart = ({ formValues }) => {
  const generateData = (formValues) => {
    if (Object.keys(formValues).length === 0) {
      return;
    }
    const { meanChange, floor, ceiling, startDate, endDate } = formValues;
    const initial = Number(formValues.startingPrice);
    const volatility = Number(formValues.volatility);

    let data = [initial, initial, initial, initial];
    const summaryData = [
      {
        month: 0,
        min: Math.min(...data),
        max: Math.max(...data),
        mean: mean(data),
      },
    ];

    for (let month = 1; month <= 12; month++) {
      data = data.map((point) => (1 + Math.random()) * point);
      summaryData.push({
        month: month,
        min: Math.min(...data),
        max: Math.max(...data),
        mean: mean(data),
      });
    }

    console.log("Summary data: ", summaryData);
    return summaryData;
  };
  const summaryData = generateData(formValues);
  return (
    <>
      {summaryData ? (
        <LineChart width={800} height={500} data={summaryData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="min" stroke="#8884d8" />
          <Line type="monotone" dataKey="max" stroke="#8884d8" />
          <Line type="monotone" dataKey="mean" stroke="#8884d8" />
        </LineChart>
      ) : null}
    </>
  );
};

export default MonthlyChart;
