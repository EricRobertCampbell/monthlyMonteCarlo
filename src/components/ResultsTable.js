import React from "react";

const ResultsTable = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <>
      <table>
        <thead>
          <th>Date</th>
          <th>Mean</th>
          <th>Median</th>
          <th>Min</th>
          <th>Max</th>
          <th>Std. Dev.</th>
          <th>Percentile (5%)</th>
          <th>Percentile (10%)</th>
          <th>Percentile (25%)</th>
          <th>Percentile (50%)</th>
          <th>percentile (75%)</th>
          <th>Percentile (90%)</th>
          <th>Percentile (95%)</th>
        </thead>
        <tbody>
          <>
            {data.map((monthData, index) => (
              <tr>
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
