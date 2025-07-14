import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../dashboard/DashboardLayout";
import Slider from "../../../components/slider/Slider";
import Header from "./components/header/Header";
import StatusInfoBar from "./components/statusInfoBar/StatusInfoBar";
import CourseDetailsCard from "./components/cards/courseDetailsCard/CourseDetailsCard";
import CourseInfoCard from "./components/cards/courseInfoCard/CourseInfoCard";
import TeacherInfoCard from "./components/cards/teacherInfoCard/TeacherInfoCard";

function AdDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ad, setAd] = useState({
    id: 1,
    adNumber: "AD-2023-001",
    teacherName: "أحمد محمد",
    teacherPhone: "+966501234567",
    service: "الرياضيات المتقدمة",
    status: "pending",
    images: [
      "../../../assets/ad.jpg",
      "../../../assets/ad2.jpg",
      "../../../assets/ad3.jpg",
      "../../../assets/ad4.jpg",
    ],
    details:
      "إعلان عن دورة الرياضيات المتقدمة لطلاب المرحلة الثانوية. هذه الدورة تغطي جميع مفاهيم الرياضيات المتقدمة للمرحلة الثانوية مع التركيز على حل المشكلات المعقدة.",
    createdAt: "15 مايو 2023",
    duration: "3 أشهر",
    price: "1200 ر.س",
  });

  const handleApprove = () => {
    setAd({ ...ad, status: "approved" });
    navigate("/ads");
  };

  const handleReject = () => {
    setAd({ ...ad, status: "rejected" });
    navigate("/ads");
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status]}`}
      >
        {status === "pending"
          ? "قيد المراجعة"
          : status === "approved"
          ? "مقبول"
          : "مرفوض"}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <Header ad={ad} getStatusBadge={getStatusBadge} navigate={navigate} />
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Image Slider */}
          <div className="relative aspect-[16/9] bg-gray-100">
            <Slider images={ad.images} />
          </div>
          {/* Status and Quick Info Bar */}
          <StatusInfoBar ad={ad} getStatusBadge={getStatusBadge} />
          {/* Content Container */}
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Course Details Card */}
              <CourseDetailsCard ad={ad} />
              {/* Course Info Card */}
              <CourseInfoCard ad={ad} />
              {/* Teacher Info Card */}
              <TeacherInfoCard ad={ad} />
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={handleReject}
                className="px-6 py-2.5 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                رفض الإعلان
              </button>
              <button
                onClick={handleApprove}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                قبول الإعلان
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdDetails;
