import React from "react";
import DashboardLayout from "../../dashboard/DashboardLayout";
import Header from "./components/header/Header";
import Cards from "./components/cards/Cards";
import Charts from "./components/charts/Charts";
import Table from "./components/table/Table";

const activityData = [
  { day: "1 مايو", users: 4000, courses: 2400 },
  { day: "2 مايو", users: 3000, courses: 1398 },
  { day: "3 مايو", users: 2000, courses: 9800 },
  { day: "4 مايو", users: 2780, courses: 3908 },
  { day: "5 مايو", users: 1890, courses: 4800 },
  { day: "6 مايو", users: 2390, courses: 3800 },
  { day: "7 مايو", users: 3490, courses: 4300 },
];

const recentActivities = [
  {
    id: 1,
    user: "أحمد محمد",
    action: "اشتراك في دورة",
    time: "منذ 5 دقائق",
    course: "الرياضيات",
  },
  {
    id: 2,
    user: "سارة عبدالله",
    action: "اكتمال دورة",
    time: "منذ 15 دقيقة",
    course: "الفيزياء",
  },
  {
    id: 3,
    user: "خالد علي",
    action: "تسجيل دخول",
    time: "منذ 30 دقيقة",
    course: "-",
  },
  {
    id: 4,
    user: "نورة سعد",
    action: "دفع اشتراك",
    time: "منذ ساعة",
    course: "الكيمياء",
  },
  {
    id: 5,
    user: "فهد محمد",
    action: "تقييم دورة",
    time: "منذ ساعتين",
    course: "الأحياء",
  },
  {
    id: 6,
    user: "لمى عبدالعزيز",
    action: "اشتراك في دورة",
    time: "منذ 3 ساعات",
    course: "اللغة الإنجليزية",
  },
  {
    id: 7,
    user: "يوسف أحمد",
    action: "تسجيل جديد",
    time: "منذ 5 ساعات",
    course: "-",
  },
];

function ActivityReport() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recentActivities.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(recentActivities.length / itemsPerPage);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <Header />
        {/* Stats Cards */}
        <Cards />
        {/* Charts */}
        <Charts activityData={activityData} />

        {/* Recent Activities Table with Gradient Header */}
        <Table
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          recentActivities={recentActivities}
          currentItems={currentItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        ></Table>
      </div>
    </DashboardLayout>
  );
}

export default ActivityReport;
