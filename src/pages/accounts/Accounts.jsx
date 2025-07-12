import React, { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import AddButton from "./components/AddButton";
import Table from "./components/Table";
import AddModal from "./components/Modals/AddModal";
import ViewModal from "./components/Modals/ViewModal";

function Accounts() {
  // Sample data
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "محمد أحمد",
      email: "mohamed@example.com",
      role: "أستاذ",
      status: "نشط",
    },
    {
      id: 2,
      name: "أحمد علي",
      email: "ahmed@example.com",
      role: "طالب",
      status: "غير نشط",
    },
    {
      id: 3,
      name: "فاطمة حسن",
      email: "fatima@example.com",
      role: "أستاذ",
      status: "نشط",
    },
  ]);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

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
    setCurrentAccount(account);
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

  return (
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
        ></ViewModal>
      </div>
    </DashboardLayout>
  );
}

export default Accounts;
