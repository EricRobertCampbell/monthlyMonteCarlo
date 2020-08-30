import React from "react";
import { Button } from "@chakra-ui/core";

const ResultsTable = ({ data }) => {
  if (!data) {
    return <p>No results yet!</p>;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan={6}></th>
            <th colSpan={7} style={{ borderBottom: "black 1px solid" }}>
              Percentiles
            </th>
          </tr>

          <tr>
            <th>Date</th>
            <th>Mean</th>
            <th>Median</th>
            <th>Min</th>
            <th>Max</th>
            <th>Std. Dev.</th>
            <th>5%</th>
            <th>10%</th>
            <th>25%</th>
            <th>50%</th>
            <th>75%</th>
            <th>90%</th>
            <th>95%</th>
          </tr>
        </thead>
        <tbody>
          <>
            {data.map((monthData, index) => (
              <tr key={index}>
                <td>{monthData.month}</td>
                <td>{monthData.mean.toFixed(2)}</td>
                <td>{monthData.median.toFixed(2)}</td>
                <td>{monthData.min.toFixed(2)}</td>
                <td>{monthData.max.toFixed(2)}</td>
                <td>{monthData.std.toFixed(2)}</td>
                <td>{monthData.percentile5.toFixed(2)}</td>
                <td>{monthData.percentile10.toFixed(2)}</td>
                <td>{monthData.percentile25.toFixed(2)}</td>
                <td>{monthData.percentile50.toFixed(2)}</td>
                <td>{monthData.percentile75.toFixed(2)}</td>
                <td>{monthData.percentile90.toFixed(2)}</td>
                <td>{monthData.percentile95.toFixed(2)}</td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </>
  );
};

export default ResultsTable;
