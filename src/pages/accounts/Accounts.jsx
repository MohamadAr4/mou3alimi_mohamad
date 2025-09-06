import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "../dashboard/DashboardLayout";
import Table from "./components/Table";
import ViewModal from "./components/Modals/ViewModal";
import axios from "axios";
import { BASE_URL } from "../../stores/contants";
import Loader from "../../components/loader/Loader";
import BanModal from "./components/Modals/BanModal";

function Accounts() {
  // Sample data
  const [accounts, setAccounts] = useState([]);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [banDate, setBanDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [totalPages, setTotalPages] = useState([]);

  // View account details
  const handleView = (account) => {
    handleGetAccountById(account.id);
    setShowViewModal(true);
  };

  const handleGetAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}users?page=${currentPage}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        setAccounts(response.data.data.list);
        setCurrentPage(response.data.data.current_page);
        setItemPerPage(response.data.data.per_page);
        setTotalPages(response.data.data.total_pages);
        setBanDate('');
        setIsLoading(false);
      }
    } catch (error) {
      console.error("error fetching accounts : ", error);
      setIsLoading(false);
    }
  };

  const handleGetAccountById = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setCurrentAccount(response.data.data);
        setIsLoading(false);
        setBanDate('');
        console.log("account by id :", response);
      }
    } catch (error) {
      console.error("error fetching account by Id : ", error);
      setIsLoading(false);
    }
  };

  const handleBanAccount = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `${BASE_URL}users/${currentAccount.id}/ban`,
        {
          until_date: banDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setShowBanModal(false);
        setShowViewModal(false);
        setIsSubmitting(false);
        await handleGetAccounts();
        setTimeout(() => {
          toast.success("تم حظر الحساب بنجاح");
        }, 100);

      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error.response?.data?.message.until_date);
      console.error("error ban an account : ", error);
    }
  };

  const handleUnBanAccount = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}users/${currentAccount.id}/unban`,
        [],
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setShowViewModal(false);
        await handleGetAccounts();
        setTimeout(() => {
          toast.success("تم فك حظر الحساب بنجاح");
        }, 100);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error("error ban an account : ", error);
    }
  };

  useEffect(() => {
    handleGetAccounts();
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <DashboardLayout>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-[rgb(var(--text))]">
                الحسابات
              </h1>
            </div>
            {/* Table  */}
            <Table
              accounts={accounts}
              handleView={handleView}
              currentPage={currentPage}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            ></Table>

            {/* View Account Modal */}
            <ViewModal
              currentAccount={currentAccount}
              setShowViewModal={setShowViewModal}
              showViewModal={showViewModal}
              setShowBanModal={setShowBanModal}
              handleUnBanAccount={handleUnBanAccount}
            ></ViewModal>
            <BanModal
              isOpen={showBanModal}
              onClose={() => { setShowBanModal(false) }}
              userName={currentAccount?.full_name}
              onBanSubmit={handleBanAccount}
              isSubmitting={isSubmitting}
              setBanDate={setBanDate}
            ></BanModal>
          </div>
        </DashboardLayout>
      )}
    </>
  );
}

export default Accounts;
