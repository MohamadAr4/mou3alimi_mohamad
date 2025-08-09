import React, { useState, useEffect } from "react";
import DashboardLayout from "../../pages/dashboard/DashboardLayout";
import axios from "axios";
import { BASE_URL } from "../../stores/contants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import Table from "./components/Table";
import ShowServicesModal from "./components/Modals/ShowServicesModal";

function Edu_services_suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  // Fetch suggestions data
  useEffect(() => {
    getSuggestions();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(suggestions.length / itemsPerPage);

  // Open modal with suggestion details
  const openModal = async (id) => {
    getSuggestionById(id);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSuggestion(null);
  };

  // Update suggestion status
  const updateSuggestionStatus = async (status, reason = null) => {
    setStatusUpdateLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}service-suggestions/${selectedSuggestion.id}/status`,
        {
          status,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(
          `تم ${status === "approved" ? "الموافقة" : "الرفض"} على المقترح بنجاح`
        );
        setSuggestions(
          suggestions.map((suggestion) =>
            suggestion.id === selectedSuggestion.id
              ? response.data.data
              : suggestion
          )
        );
        closeModal();
      }
    } catch (error) {
      toast.error(
        `فشل في ${status === "approved" ? "الموافقة" : "الرفض"} على المقترح`
      );
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let color = "";
    let text = "";

    switch (status) {
      case "approved":
        color = "bg-green-100 text-green-800";
        text = "مقبول";
        break;
      case "rejected":
        color = "bg-red-100 text-red-800";
        text = "مرفوض";
        break;
      default:
        color = "bg-yellow-100 text-yellow-800";
        text = "قيد المراجعة";
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {text}
      </span>
    );
  };

  const getSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}service-suggestions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuggestions(response.data.data.list);
      console.log(response.data.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("فشل في تحميل المقترحات");
      setIsLoading(false);
      console.error("error fetching suggestions : ", error);
    }
  };

  const getSuggestionById = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}service-suggestions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedSuggestion(response.data.data);
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      toast.error("فشل في تحميل تفاصيل المقترح");
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <ToastContainer rtl={true} />

      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          مقترحات الخدمات التعليمية
        </h1>

        {isLoading ? (
          <Loader></Loader>
        ) : (
          <>
            <Table
              currentItems={suggestions}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
              currentPage={currentPage}
              openModal={openModal}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              StatusBadge={StatusBadge}
              suggestions={suggestions}
            ></Table>

            {/* Suggestion Details Modal */}
            <ShowServicesModal
              StatusBadge={StatusBadge}
              closeModal={closeModal}
              isModalOpen={isModalOpen}
              selectedSuggestion={selectedSuggestion}
              statusUpdateLoading={statusUpdateLoading}
              updateSuggestionStatus={updateSuggestionStatus}
            ></ShowServicesModal>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Edu_services_suggestions;
