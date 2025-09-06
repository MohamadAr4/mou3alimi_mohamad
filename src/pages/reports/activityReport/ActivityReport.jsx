import DashboardLayout from "../../dashboard/DashboardLayout";
import Header from "./components/header/Header";
import Cards from "./components/cards/Cards";
import Charts from "./components/charts/Charts";
import axios from "axios";
import Loader from "../../../components/loader/Loader"  
import { BASE_URL } from "../../../stores/contants";
import { useEffect, useState } from "react";

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
