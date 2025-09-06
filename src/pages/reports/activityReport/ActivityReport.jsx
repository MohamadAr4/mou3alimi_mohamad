import DashboardLayout from "../../dashboard/DashboardLayout";
import Header from "./components/header/Header";
import Cards from "./components/cards/Cards";
import Charts from "./components/charts/Charts";
import axios from "axios";
import Loader from "../../../components/loader/Loader"  
import { BASE_URL } from "../../../stores/contants";
import { useEffect, useState } from "react";

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

  const [countActiveUsers, setCountActiveUsers] = useState(0);
  const [countActiveUsersLastWeek, setCountActiveUsersLastWeek] = useState(0);
  const [countNewUsers, setCountNewUsers] = useState(0);
  const [countNewUsersLastWeek, setCountNewUsersLastWeek] = useState(0);
  const [countSubscription, setCountSubscription] = useState(0);
  const [countSubscriptionLastWeek, setCountSubscriptionLastWeek] = useState(0);
  const [subscriptionChart, setSubscriptionChart] = useState([]);
  const [activityChart    , setActivityChart] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetActivityReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}dashboard/activity`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setCountActiveUsers(response.data.data.countActiveUsers)
        setCountActiveUsersLastWeek(response.data.data.countActiveUsersLastWeek)
        setCountNewUsers(response.data.data.countNewUsers)
        setCountNewUsersLastWeek(response.data.data.countNewUsersLastWeek)
        setCountSubscription(response.data.data.countSubscription)
        setCountSubscriptionLastWeek(response.data.data.countSubscriptionLastWeek)
        setSubscriptionChart(response.data.data.subscriptionChart);
        setActivityChart(response.data.data.activityChart);
        setLoading(false);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetActivityReport();
  }, [])
  return (
    <>
      {loading ? <Loader></Loader> : <DashboardLayout>
        <div className="p-4 md:p-6">
          {/* Header */}
          <Header
          />
          {/* Stats Cards */}
          <Cards
            countActiveUsers={countActiveUsers}
            countActiveUsersLastWeek={countActiveUsersLastWeek}
            countNewUsers={countNewUsers}
            countNewUsersLastWeek={countNewUsersLastWeek}
            countSubscription={countSubscription}
            countSubscriptionLastWeek={countSubscriptionLastWeek} />
          {/* Charts */}
          <Charts activityChart={activityChart}  subscriptionChart = {subscriptionChart}/>
        </div>
      </DashboardLayout>}
    </>

  );
}

export default ActivityReport;
