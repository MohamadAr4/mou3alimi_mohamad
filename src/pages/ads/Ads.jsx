import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../dashboard/DashboardLayout";
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[rgb(var(--text))]">
            الإعلانات
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/70">
              <thead className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    رقم الإعلان
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    اسم المعلن
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    الخدمة
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200/50">
                {ads.map((ad) => (
                  <tr
                    key={ad.id}
                    className="hover:bg-gray-50/80 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-[rgb(var(--text))]">
                      {ad.adNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-[rgb(var(--text)/0.8)]">
                      {ad.teacherName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-[rgb(var(--text)/0.8)]">
                      {ad.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleView(ad.id)}
                          className="text-[rgb(var(--primary))] hover:text-[rgb(var(--primary)/0.8)] transition-colors duration-200 flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          عرض
                        </button>
                        <button
                          onClick={() => handleDelete(ad.id)}
                          className="text-[rgb(var(--error))] hover:text-[rgb(var(--error)/0.8)] transition-colors duration-200 flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Ads;
