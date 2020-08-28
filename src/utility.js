export const mean = (values) => {
  const sum = values.reduce((a, b) => a + b);
  const total = values.length;
  return sum / total;
};
