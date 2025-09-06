import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "../../dashboard/DashboardLayout";
import Slider from "../../../components/slider/Slider";
import Header from "./components/header/Header";
import StatusInfoBar from "./components/statusInfoBar/StatusInfoBar";
import CourseDetailsCard from "./components/cards/courseDetailsCard/CourseDetailsCard";
import CourseInfoCard from "./components/cards/courseInfoCard/CourseInfoCard";
import TeacherInfoCard from "./components/cards/teacherInfoCard/TeacherInfoCard";
import axios from "axios";
import Loader from '../../../components/loader/Loader'
import { BASE_URL } from "../../../stores/contants";
import RejectModal from "./components/Modals/RejectReason";

function AdDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ad, setAd] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);


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

  const handleGetAd = async () => {
    setLoading(true);
    try {
      console.log("aaaaa")
      const rseponse = await axios.get(`${BASE_URL}announcements/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(rseponse.data.data);
      if (rseponse.status === 200) {
        setAd(rseponse.data.data)
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeStatus = async (status, reason = "") => {
    setLoading(true);
    try {
      const response = await axios.patch(`${BASE_URL}announcements/${id}/status`, {
        status: status,
        reject_reason: reason,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setAd(response.data.data);
        setLoading(false);
        toast.success('تم تغيير حالة الاعلان')
        setIsRejectModalOpen(false); // close modal after success
        setRejectReason(""); // reset reason
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message)
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAd();
  }, [])

  return (
    <DashboardLayout>
      <ToastContainer></ToastContainer>
      {loading ? <Loader></Loader> : <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <Header ad={ad} getStatusBadge={getStatusBadge} navigate={navigate} />
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="relative aspect-[16/9] bg-gray-100">
            <Slider images={ad.images} />
          </div>
          <StatusInfoBar ad={ad} getStatusBadge={getStatusBadge} />
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <CourseDetailsCard ad={ad} />
              <CourseInfoCard ad={ad} />
              <TeacherInfoCard ad={ad} />
            </div>
            {
              ad.status === 'pending' && (
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setIsRejectModalOpen(true)}
                    className="px-6 py-2.5 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    رفض الإعلان
                  </button>
                  <RejectModal
                    isOpen={isRejectModalOpen}
                    onClose={() => setIsRejectModalOpen(false)}
                    onConfirm={(reason) => handleChangeStatus("rejected", reason)}
                    rejectReason={rejectReason}
                    setRejectReason={setRejectReason}
                  />

                  <button
                    onClick={() => { handleChangeStatus('approved') }}
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
              )
            }

          </div>
        </div>
      </div>}

    </DashboardLayout>
  );
}

export default AdDetails;
