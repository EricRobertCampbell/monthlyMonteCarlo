import React, { useState } from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  Area,
} from "recharts";
import { Form } from "informed";

import { Stack } from "@chakra-ui/core";

import InformedSwitch from "./InformedChakra/InformedSwitch";

const MonthlyChart = ({ data }) => {
  const [display, setDisplay] = useState({
    bounds: true,
    ci90: true,
    ci80: true,
    ci50: true,
    median: true,
    mean: true,
    ideal: true,
  });
  const handleChange = (formState) => {
    console.log("handleChange fired with ", formState);
    setDisplay(formState.values);
  };
  return (
    <>
      <Stack isInline align="center" spacing={1}>
        <Form onChange={handleChange}>
          <Stack spacing={1}>
            <InformedSwitch
              label="Bounds"
              field="bounds"
              defaultIsChecked={true}
              initialValue={true}
            />
            <InformedSwitch
              label="90% CI"
              field="ci90"
              initialValue={true}
              defaultIsChecked={true}
            />
            <InformedSwitch
              label="80% CI"
              field="ci80"
              initialValue={true}
              defaultIsChecked={true}
            />
            <InformedSwitch
              label="50% CI"
              field="ci50"
              initialValue={true}
              defaultIsChecked={true}
            />
            <InformedSwitch
              label="Median"
              field="median"
              initialValue={true}
              defaultIsChecked={true}
            />
            <InformedSwitch
              label="Mean"
              field="mean"
              initialValue={true}
              defaultIsChecked={true}
            />
            <InformedSwitch
              label="Ideal"
              field="ideal"
              initialValue={true}
              defaultIsChecked={true}
            />
          </Stack>
        </Form>
        <ComposedChart width={800} height={500} data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {display.bounds ? (
            <Area type="monotone" fill="#8884d8" dataKey="bounds" />
          ) : null}
          {display.ci90 ? (
            <Area type="montone" fill="#fc0303" dataKey="ci90" />
          ) : null}
          {display.ci80 ? (
            <Area type="montone" fill="#fcf803" dataKey="ci80" />
          ) : null}
          {display.ci50 ? (
            <Area type="montone" fill="#03fc0b" dataKey="ci50" />
          ) : null}
          {display.median ? (
            <Line type="monotone" dataKey="median" stroke="#8884d8" />
          ) : null}
          {display.mean ? (
            <Line type="monotone" dataKey="mean" stroke="#8884d8" />
          ) : null}
          {display.ideal ? (
            <Line type="monotone" dataKey="ideal" stroke="#8884d8" />
          ) : null}
        </ComposedChart>
      </Stack>
    </>
  );
};

export default MonthlyChart;
