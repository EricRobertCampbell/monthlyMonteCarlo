import React, { useState, useEffect } from "react";
import { Heading, Stack } from "@chakra-ui/core";

import MonthlyChart from "./MonthlyChart";
import DataForm from "./DataForm";
import ResultsAccordion from "./ResultsAccordion";

import { jStat } from "jstat";

const App = () => {
  const [formValues, setFormValues] = useState();
  const [graphData, setGraphData] = useState();
  const [tableData, setTableData] = useState();
  const [generatingData, setGeneratingData] = useState(false);

  const handleSubmit = (values) => {
    const convertedValues = {
      startingPrice: Number(values.startingPrice),
      volatility: Number(values.volatility) / 100,
      meanChange: Number(values.meanChange) / 100,
      floor: values.floor === undefined ? undefined : Number(values.floor),
      ceiling:
        values.ceiling === undefined ? undefined : Number(values.ceiling),
      startDate: values.startDate,
      endDate: values.endDate,
    };
    setFormValues(convertedValues);
  };

  const generateNextValue = (value, distributionParams, floor, ceiling) => {
    const { mean, std } = distributionParams;
    const multiplier = 1 + jStat.normal.inv(Math.random(), mean, std);
    const newValue = value * multiplier;
    if (ceiling != undefined && newValue > ceiling) {
      return ceiling;
    }
    if (floor != undefined && newValue < floor) {
      return floor;
    }
    return newValue;
  };

  /**
   * generateSummaryData - returns statistical information about a set of prices
   * @param{array}: data - should be an array of numbers
   */
  const generateSummaryData = (data) => {
    let mean = jStat.mean(data),
      median = jStat.median(data),
      min = Math.min(...data),
      max = Math.max(...data),
      std = jStat.stdev(data),
      percentile5 = jStat.percentile(data, 0.05),
      percentile10 = jStat.percentile(data, 0.1),
      percentile25 = jStat.percentile(data, 0.25),
      percentile50 = jStat.percentile(data, 0.5),
      percentile75 = jStat.percentile(data, 0.75),
      percentile90 = jStat.percentile(data, 0.9),
      percentile95 = jStat.percentile(data, 0.95);
    return {
      mean,
      median,
      min,
      max,
      std,
      percentile5,
      percentile10,
      percentile25,
      percentile50,
      percentile75,
      percentile90,
      percentile95,
    };
  };

  const generateGraphData = (formValues) => {
    if (!formValues) {
      return;
    }
    const { meanChange, floor, ceiling, startDate, endDate } = formValues;
    const initial = Number(formValues.startingPrice);
    const volatility = Number(formValues.volatility);

    let data = new Array(100).fill(initial);
    const summaryData = [
      {
        month: 0,
        ...generateSummaryData(data),
        ideal: initial,
      },
    ];

    for (let month = 1; month <= 12; month++) {
      data = data.map((value) =>
        generateNextValue(
          value,
          { mean: meanChange, std: volatility },
          floor,
          ceiling
        )
      );

      summaryData.push({
        month: month,
        ...generateSummaryData(data),
        ideal: initial * (1 + meanChange) ** month,
      });
    }

    console.log("Summary data: ", summaryData);
    return summaryData;
  };

  const generateAllData = (formValues) => {
    if (!formValues) {
      return;
    }

    const NUM_POINTS = 1000;
    const {
      startingPrice: initial,
      volatility,
      meanChange,
      floor,
      ceiling,
      startDate,
      endDate,
    } = formValues;

    let data = new Array(NUM_POINTS).fill(initial);
    const allData = [
      {
        month: 0,
        ...generateSummaryData(data),
        ideal: initial,
      },
    ];

    for (let month = 1; month <= 12; month++) {
      data = data.map((value) =>
        generateNextValue(
          value,
          { mean: meanChange, std: volatility },
          floor,
          ceiling
        )
      );

      allData.push({
        month: month,
        ...generateSummaryData(data),
        ideal: initial * (1 + meanChange) ** month,
      });
    }

    console.log("Summary data: ", allData);
    return allData;
  };

  useEffect(() => {
    const allData = generateAllData(formValues);
    setTableData(allData);
    const graphData = allData
      ? allData.map((monthData) => ({
          mean: monthData.mean,
          median: monthData.median,
          ideal: monthData.ideal,
          bounds: [monthData.min, monthData.max],
          ci50: [monthData.percentile25, monthData.percentile75],
          ci80: [monthData.percentile10, monthData.percentile90],
          ci90: [monthData.percentile5, monthData.percentile95],
        }))
      : undefined;
    setGraphData(graphData);
  }, [formValues]);

  return (
    <>
      <Heading as="h1">Monte Carlo Price Generator</Heading>
      <MonthlyChart data={graphData} />
      <ResultsAccordion data={tableData} />
      <DataForm onSubmit={handleSubmit} />
    </>
  );
};

export default App;
