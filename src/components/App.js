import React, { useState } from "react";
import MonthlyChart from "./MonthlyChart";
import DataForm from "./DataForm";

const App = () => {
  const [formValues, setFormValues] = useState({});
  const handleSubmit = (values) => {
    setFormValues(values);
  };
  return (
    <>
      <MonthlyChart formValues={formValues} />
      <DataForm onSubmit={handleSubmit} />
    </>
  );
};

export default App;
