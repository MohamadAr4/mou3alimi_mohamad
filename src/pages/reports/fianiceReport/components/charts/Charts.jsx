import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Charts({ financialData }) {
  // Transform the API response data into the format expected by the chart
  const transformData = (data) => {
    if (!data) return [];
    
    return Object.keys(data)
      .filter(key => key !== 'total' && key !== 'success' && key !== 'message')
      .map(month => ({
        month: month,
        income: data[month]
      }));
  };

  const chartData = transformData(financialData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          الدخل الشهري
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4f46e5" name="الدخل" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {financialData && financialData.data && (
          <div className="mt-4 text-center text-gray-700">
            <p className="font-semibold">إجمالي الدخل: {financialData.data.total} ر.س</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Charts;