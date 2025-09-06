import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../dashboard/DashboardLayout";
import Header from "./components/header/Header";
import Table from "./components/table/Table";
import axios from "axios";
import { BASE_URL } from "../../stores/contants";
import Loader from '../../components/loader/Loader';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Ads() {
  const navigate = useNavigate();

  // Sample ads data
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [totalPages, setTotalPages] = useState([]);

  const handleView = (adId) => {
    navigate(`/ads/${adId}`);
  };

  const handleGetAds = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}announcements?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        setAds(response.data.data.list);
        setCurrentPage(response.data.data.current_page);
        setItemPerPage(response.data.data.per_page);
        setTotalPages(response.data.data.total_pages);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteAd = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}announcements/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response)
      if (response.status === 204) {
        toast.success('تم حذف الاعلان بنجاح')
        await handleGetAds();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  }

  useEffect(() => {
    handleGetAds();
  }, [currentPage])

  return (
    <>
      <ToastContainer></ToastContainer>
      {loading ? <Loader></Loader> :
        <DashboardLayout>
          <div className="p-6">
            <Header />
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <Table
                  ads={ads}
                  handleDelete={handleDeleteAd}
                  handleView={handleView}
                  currentPage={currentPage}
                  indexOfFirstItem={indexOfFirstItem}
                  indexOfLastItem={indexOfLastItem}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </div>
        </DashboardLayout>
      }
    </>

  );
}

export default Ads;
