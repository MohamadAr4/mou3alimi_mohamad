import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Charts({ activityChart, subscriptionChart }) {
  // Format date to display only day/month (e.g., "30/08")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  // Transform activity chart data
  const transformActivityData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map(item => ({
      day: formatDate(item.date),
      users: item.total
    }));
  };

  // Transform subscription chart data
  const transformSubscriptionData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map(item => ({
      day: formatDate(item.date),
      subscriptions: item.total
    }));
  };

  const activityData = transformActivityData(activityChart);
  const subscriptionData = transformSubscriptionData(subscriptionChart);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          نشاط المستخدمين اليومي
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#4f46e5"
                name="المستخدمون"
                strokeWidth={2}
                dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          اشتراكات الحزمات اليومية
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={subscriptionData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="subscriptions"
                fill="#8b5cf6"
                stroke="#7c3aed"
                name="الاشتراكات"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Charts;