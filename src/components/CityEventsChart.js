import { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const locations = allLocations || [];
      const data = locations.map((location) => {
        const count = events.filter(
          (event) => event.location === location
        ).length;
        return { city: location, number: count };
      });
      return data;
    };

    setData(getData());
  }, [events, allLocations]);

  return (
    <div className="chart-container">
      <h3>Events in Each City</h3>
      <div className="chart-inner">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 60,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis
              type="category"
              dataKey="city"
              name="City"
              angle={30}
              interval={0}
              tick={{ dx: 20, dy: 30, fontSize: 14 }}
            />
            <YAxis
              type="number"
              dataKey="number"
              name="Number of Events"
              allowDecimals={false}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CityEventsChart;
