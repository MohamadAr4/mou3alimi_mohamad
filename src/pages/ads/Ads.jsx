import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../dashboard/DashboardLayout";
import Header from "./components/header/Header";
import Table from "./components/table/Table";
function Ads() {
  const navigate = useNavigate();

  // Sample ads data
  const [ads, setAds] = useState([
    {
      id: 1,
      adNumber: "AD-2023-001",
      teacherName: "أحمد محمد",
      service: "الرياضيات المتقدمة",
      status: "pending", // pending, approved, rejected
      images: [
        "../../../assets/ad.jpg",
        "../../../assets/ad2.jpg",
        "../../../assets/ad3.jpg",
        "../../../assets/ad4.jpg",
      ],
      details: "إعلان عن دورة الرياضيات المتقدمة لطلاب المرحلة الثانوية",
    },
    {
      id: 2,
      adNumber: "AD-2023-002",
      teacherName: "فاطمة علي",
      service: "اللغة الإنجليزية",
      status: "pending",
      images: [
        "../../../assets/ad.jpg",
        "../../../assets/ad2.jpg",
        "../../../assets/ad3.jpg",
        "../../../assets/ad4.jpg",
      ],
      details: "دورة مكثفة لتحسين مهارات المحادثة الإنجليزية",
    },
    {
      id: 2,
      adNumber: "AD-2023-002",
      teacherName: "فاطمة علي",
      service: "اللغة الإنجليزية",
      status: "pending",
      images: [
        "../../../assets/ad.jpg",
        "../../../assets/ad2.jpg",
        "../../../assets/ad3.jpg",
        "../../../assets/ad4.jpg",
      ],
      details: "دورة مكثفة لتحسين مهارات المحادثة الإنجليزية",
    },
    {
      id: 2,
      adNumber: "AD-2023-002",
      teacherName: "فاطمة علي",
      service: "اللغة الإنجليزية",
      status: "pending",
      images: [
        "../../../assets/ad.jpg",
        "../../../assets/ad2.jpg",
        "../../../assets/ad3.jpg",
        "../../../assets/ad4.jpg",
      ],
      details: "دورة مكثفة لتحسين مهارات المحادثة الإنجليزية",
    },
  ]);

  const handleView = (adId) => {
    navigate(`/ads/${adId}`);
  };

  const handleDelete = (adId) => {
    setAds(ads.filter((ad) => ad.id !== adId));
  };

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
