import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Day 1', value: 400 },
  { name: 'Day 2', value: 300 },
  { name: 'Day 3', value: 500 },
];

export default function Chart() {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}
