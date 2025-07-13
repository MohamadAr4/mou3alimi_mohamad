import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../dashboard/DashboardLayout";
import Slider from "../../../components/slider/Slider";

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/ads")}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="رجوع"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                تفاصيل الإعلان{" "}
                <span className="text-[rgb(var(--primary))]">
                  #{ad.adNumber}
                </span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                آخر تحديث: {ad.createdAt}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(ad.status)}
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>
            <button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              className="text-sm text-gray-600 hover:text-[rgb(var(--primary))] flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              مشاركة
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Image Slider */}
          <div className="relative aspect-[16/9] bg-gray-100">
            <Slider images={ad.images} />
          </div>

          {/* Status and Quick Info Bar */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-100 p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs font-medium text-indigo-600">
                  حالة الإعلان
                </p>
                {getStatusBadge(ad.status)}
              </div>
              <div className="hidden md:block w-px h-6 bg-indigo-200"></div>
              <div>
                <p className="text-xs font-medium text-indigo-600">المعلن</p>
                <p className="font-medium text-gray-800">{ad.teacherName}</p>
              </div>
              <div className="hidden md:block w-px h-6 bg-indigo-200"></div>
              <div>
                <p className="text-xs font-medium text-indigo-600">الخدمة</p>
                <p className="font-medium text-gray-800">{ad.service}</p>
              </div>
            </div>
            <button className="text-sm font-medium bg-white px-3 py-1.5 rounded-lg border border-indigo-100 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-1 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {ad.teacherPhone}
            </button>
          </div>

          {/* Content Container */}
          <div className="p-4 md:p-6">
            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Course Details Card */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                  <h3 className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-2">
                    تفاصيل الدورة
                  </h3>
                  <p className="text-gray-700">{ad.details}</p>
                </div>
              </div>

              {/* Course Info Card */}
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 shadow-sm">
                  <h3 className="text-xs font-medium text-purple-600 uppercase tracking-wider mb-2">
                    معلومات الدورة
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-purple-500">المدة</p>
                      <p className="font-medium text-gray-800">{ad.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-purple-500">السعر</p>
                      <p className="font-medium text-green-600">{ad.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-purple-500">تاريخ النشر</p>
                      <p className="font-medium text-gray-800">
                        {ad.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teacher Info Card */}
              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 shadow-sm">
                  <h3 className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-2">
                    معلومات المعلن
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-amber-500">الاسم</p>
                      <p className="font-medium text-gray-800">
                        {ad.teacherName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-amber-500">رقم الجوال</p>
                      <p className="font-medium text-gray-800">
                        {ad.teacherPhone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-amber-500">عدد الإعلانات</p>
                      <p className="font-medium text-gray-800">5 إعلانات</p>
                    </div>
                  </div>
                </div>
              </div>
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
