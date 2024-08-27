/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const LocationStatisticsComponent = ({ urlStatistics }) => {

  const totalNumberOfEachCity = urlStatistics?.reduce((accumulator, currentItemInTheArray) => {
    const city = currentItemInTheArray?.city_in_which_url_was_clicked;

    if (city) {
        if (accumulator[city]) {
            accumulator[city] += 1;
        } else {
            accumulator[city] = 1;
        }
    }

    return accumulator;
  }, {});

  const eachCityCount = Object.entries(totalNumberOfEachCity).map(([city, count]) => ({
    city,
    count
  }));

  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      <ResponsiveContainer>
        <LineChart data={eachCityCount.slice(0, 5)}>
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip labelStyle={{ color: 'green' }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#82ca9d"
            />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LocationStatisticsComponent;
