import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../dashboard/DashboardLayout";
import Header from "./components/header/Header";
import Table from "./components/table/Table";
import axios from "axios";
import { BASE_URL } from "../../stores/contants";
function Ads() {
  const navigate = useNavigate();

  // Sample ads data
  const [ads, setAds] = useState([]);

  const handleView = (adId) => {
    navigate(`/ads/${adId}`);
  };

  const handleDelete = (adId) => {
    setAds(ads.filter((ad) => ad.id !== adId));
  };

  const handleGetAds = async () => {
    try {
      const response = await axios.get(`${BASE_URL}announcements`,{
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });

      if(response.status === 200){
        setAds(response.data.data.list);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteAd = async () => {
    
  }

  useEffect(()=>{
    handleGetAds();
  },[])

  return (
    <DashboardLayout>
      <div className="p-6">
        <Header />
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <Table 
            ads={ads}
            handleDelete={handleDelete}
            handleView={handleView}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Ads;
