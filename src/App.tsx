import Chart from "./Components/XYChart";
import BarChart from "./Components/BarChart";
const data1 = [
  {
    x: "2018-03-01",
    y: 30,
  },
  {
    x: "2018-04-01",
    y: 16,
  },
  {
    x: "2018-05-01",
    y: 17,
  },
  {
    x: "2018-06-01",
    y: 24,
  },
  {
    x: "2018-07-01",
    y: 47,
  },
  {
    x: "2018-08-01",
    y: 32,
  },
  {
    x: "2018-09-01",
    y: 8,
  },
  {
    x: "2018-10-01",
    y: 27,
  },
  {
    x: "2018-11-01",
    y: 31,
  },
  {
    x: "2018-12-01",
    y: 105,
  },
  {
    x: "2019-01-01",
    y: 166,
  },
  {
    x: "2019-02-01",
    y: 181,
  },
  {
    x: "2019-03-01",
    y: 232,
  },
  {
    x: "2019-04-01",
    y: 224,
  },
  {
    x: "2019-05-01",
    y: 196,
  },
  {
    x: "2019-06-01",
    y: 211,
  },
];
const App = () => {
  return (
    <>
      <BarChart width={500} height={300} data={data1} />
      <Chart width={500} height={300} data={data1} />{" "}
    </>
  );
};

export default App;
