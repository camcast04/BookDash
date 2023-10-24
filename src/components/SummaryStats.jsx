import React, { useEffect, useRef } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

function SummaryStats({ books, statistics }) {
  const chartRef = useRef(null);

  const bookYears = books
    .map((book) => book.first_publish_year)
    .filter(Boolean);

  const yearCounts = bookYears.reduce((acc, year) => {
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const sortedYears = Object.keys(yearCounts).sort((a, b) => a - b);
  const sortedCounts = sortedYears.map((year) => yearCounts[year]);

  const chartData = sortedYears.map((year, index) => ({
    year: String(year),
    count: sortedCounts[index],
  }));

  useEffect(() => {
    if (chartRef.current) {
      // You can destroy or clear any previous chart instance here if needed
    }

    // No need to create a chart instance with recharts
    // Recharts will handle rendering for you

    return () => {
      // Clean up any resources here if needed
    };
  }, []);

  return (
    <div>
      <div>Total number of books: {books.length}</div>
      <div>Total number of editions: {statistics.totalEditions}</div>
      <div>
        Earliest publication year: {statistics.earliestPublication || 'N/A'}
      </div>
      <div>
        Latest publication year: {statistics.latestPublication || 'N/A'}
      </div>
      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="year" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default SummaryStats;
