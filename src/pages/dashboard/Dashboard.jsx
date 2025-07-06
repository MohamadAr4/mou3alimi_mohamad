import React, { useState } from "react";
import Header from "../../components/dashboard/header/Header";
import Aside from "../../components/dashboard/aside/Aside";
import Card from "../../components/dashboard/card/Card";
import Footer from "../../components/footer/Footer";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const cards = [
    {
      color: "[#3498db]",
      title: "عدد الاساتذة",
      data: "100",
      path: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
    {
      color: "[#27ae60]",
      title: "عدد الطلاب",
      data: "10",
      path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      color: "[#f39c12]",
      title: "الاشتراكات",
      data: "3",
      path: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    },
    {
      color: "[#e74c3c]",
      title: "الارباح",
      data: "13$",
      path: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f6fa]" dir="rtl">
      {/* Header */}
      <Header toggleDrawer={toggleDrawer} />

      <div className="flex flex-1">
        <Aside isDrawerOpen={isDrawerOpen}></Aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {cards.map((card) => {
              return (
                <Card
                  color={card.color}
                  title={card.title}
                  data={card.data}
                  path={card.path}
                />
              );
            })}
          </div>
          {/* Charts Section */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">توزيع المواد الدراسية</h3>
              <div className="h-64">
                <Pie data={pieData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">إحصائيات الشهر</h3>
              <div className="h-64">
                <Bar 
                  data={barData} 
                  options={{ 
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: {
                          display: false
                        }
                      },
                      y: {
                        beginAtZero: true,
                        max: 100
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div> */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
