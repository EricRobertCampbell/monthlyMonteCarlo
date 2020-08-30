import React from "react";
import { Button, Icon } from "@chakra-ui/core";

const ResultsTable = ({ data }) => {
  if (!data) {
    return <p>No results yet!</p>;
  }

  const dataAsCSV =
    "month,mean,median,min,max,std. dev,percentile5,percentile10,percentile25,percentile50,percentile75,percentile90,percentile95\n" +
    data
      .map((row) =>
        [
          row.month,
          row.mean,
          row.median,
          row.min,
          row.max,
          row.std,
          row.percentile5,
          row.percentile10,
          row.percentile25,
          row.percentile50,
          row.percentile75,
          row.percentile90,
          row.percentile95,
        ].join(",")
      )
      .join("\n");
  const dataBlob = new Blob([dataAsCSV], { type: "text/csv;charset=utf-8;" });
  const blobURL = URL.createObjectURL(dataBlob, { type: "text/plain" });

  return (
    <>
      <table>
        <caption>
          Simulation Data{" "}
          <Button
            variant="solid"
            rightIcon="download"
            as="a"
            href={blobURL}
            download="results.csv"
          >
            Download Results
          </Button>
        </caption>
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
