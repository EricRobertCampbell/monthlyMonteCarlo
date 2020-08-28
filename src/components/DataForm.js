import React from "react";
import { Form, Text } from "informed";

const DataForm = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <label>
        Starting Price: <Text field="startingPrice" />
      </label>

      <br />

      <label>
        Mean Monthly Volatility: <Text field="volatility" />
      </label>

      <br />

      <label>
        Mean Monthly Price Change <Text field="meanChange" />
      </label>

      <br />

      <label>
        Price Floor: <Text field="floor" />
      </label>

      <br />

      <label>
        Price Ceiling: <Text field="ceiling" />
      </label>

      <br />

      <label>
        Beginning Date: <Text field="startDate" />
      </label>

      <br />

      <label>
        End Date: <Text field="endDate" />
      </label>

      <br />

      <button type="submit">Submit!</button>
    </Form>
  );
};

export default DataForm;
