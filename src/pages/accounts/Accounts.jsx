import React, { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import AddButton from "./components/AddButton";
import Table from "./components/Table";
import AddModal from "./components/Modals/AddModal";
import ViewModal from "./components/Modals/ViewModal";
import axios from "axios";
import { BASE_URL } from "../../stores/contants";
import Loader from "../../components/loader/Loader";
import BanModal from "./components/Modals/BanModal";
import { toast } from "react-toastify";

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
      const response = await axios.get(`${BASE_URL}users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setAccounts(response.data.data.list);
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
      toast.error("خطأ في حظر الحساب");
      console.error("error ban an account : ", error);
    }
  };

  const handleUnBanAccount = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}users/${currentAccount.id}/unban`,[],
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
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <DashboardLayout>
          <div className="p-6">
            {/* Header with Add button */}
            <AddButton setShowAddModal={setShowAddModal}></AddButton>
            {/* Table  */}
            <Table
              accounts={accounts}
              handleDelete={handleDelete}
              handleView={handleView}
              handleEdit={handleEdit}
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
              handleUnBanAccount = {handleUnBanAccount}
            ></ViewModal>
            <BanModal
              isOpen={showBanModal}
              onClose={setShowViewModal}
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
