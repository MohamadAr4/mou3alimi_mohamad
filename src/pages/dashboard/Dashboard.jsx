import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import Card from "../../components/dashboard/card/Card";
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
import axios from "axios";
import { BASE_URL } from "../../stores/contants";
import Loader from '../../components/loader/Loader'

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [registerChart, setRegisterChart] = useState([]);

  useEffect(() => {
    handleGetDashboardReport();
  }, []);

  const handleGetDashboardReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        setTotalTeachers(response.data.data.totalTeachers);
        setTotalSubscriptions(response.data.data.totalSubscriptions);
        setTotalStudents(response.data.data.totalStudents);
        setTotalProfit(response.data.data.totalProfit);

        // Transform registerChart data for the chart
        const chartData = Object.keys(response.data.data.registerChart).map(date => ({
          date: formatDate(date),
          users: response.data.data.registerChart[date]
        }));

        setRegisterChart(chartData);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Format date to display only day/month (e.g., "30/08")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const cards = [
    {
      color: "blue",
      title: "عدد الاساتذة",
      data: totalTeachers,
      path: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
    {
      color: "green",
      title: "عدد الطلاب",
      data: totalStudents,
      path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      color: "yellow",
      title: "الاشتراكات",
      data: totalSubscriptions,
      path: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    },
    {
      color: "red",
      title: "الارباح",
      data: `${totalProfit} ل.س`,
      path: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  return (
    <DashboardLayout>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, index) => (
              <Card
                key={index}
                color={card.color}
                title={card.title}
                data={card.data}
                path={card.path}
              />
            ))}
          </div>

          {/* User Registration Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-6">
              تسجيلات المستخدمين اليومية
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={registerChart}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#4f46e5" name="المستخدمون المسجلون" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;