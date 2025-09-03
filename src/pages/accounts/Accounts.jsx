import React, { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import Table from "./components/Table";
import AddModal from "./components/Modals/AddModal";
import ViewModal from "./components/Modals/ViewModal";
import axios from "axios";
import { BASE_URL } from "../../stores/contants";
import Loader from "../../components/loader/Loader";
import BanModal from "./components/Modals/BanModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Accounts() {
  // Sample data
  const [accounts, setAccounts] = useState([]);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
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

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "طالب",
    status: "نشط",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new account
  const handleAddAccount = () => {
    const newAccount = {
      id: accounts.length + 1,
      ...formData,
    };
    setAccounts([...accounts, newAccount]);
    setShowAddModal(false);
    setFormData({ name: "", email: "", role: "طالب", status: "نشط" });
  };

  // Delete account
  const handleDelete = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  // View account details
  const handleView = (account) => {
    handleGetAccountById(account.id);
    setShowViewModal(true);
  };

  // Edit account
  const handleEdit = (account) => {
    setCurrentAccount(account);
    setFormData({
      name: account.name,
      email: account.email,
      role: account.role,
      status: account.status,
    });
    setShowAddModal(true);
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
      console.log(response);
      if (response.status === 200) {
        setShowBanModal(false);
        setShowViewModal(false);
        setIsSubmitting(false);
        handleGetAccounts();
        toast.success("تم حظر الحساب بنجاح");
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("خطأ في حظر الحساب");
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
        handleGetAccounts();
        toast.success("تم حظر الحساب بنجاح");
      }
    } catch (error) {
      toast.error("خطأ في حظر الحساب");
      console.error("error ban an account : ", error);
    }
  };

  useEffect(() => {
    handleGetAccounts();
  }, []);

  return (
    <DashboardLayout>
      <ToastContainer rtl={true}></ToastContainer>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
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
              handleDelete={handleDelete}
              handleView={handleView}
              handleEdit={handleEdit}
              currentPage={currentPage}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            ></Table>

            {/* Add Account Modal */}
            <AddModal
              currentAccount={currentAccount}
              formData={formData}
              handleAddAccount={handleAddAccount}
              handleInputChange={handleInputChange}
              setCurrentAccount={setCurrentAccount}
              setShowAddModal={setShowAddModal}
              showAddModal={showAddModal}
            ></AddModal>

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
              onClose={()=>{setShowBanModal(false)}}
              userName={currentAccount?.full_name}
              onBanSubmit={handleBanAccount}
              isSubmitting={isSubmitting}
              setBanDate={setBanDate}
            ></BanModal>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Accounts;
