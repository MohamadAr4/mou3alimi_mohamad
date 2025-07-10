import React, { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[rgb(var(--text))]">
            الحسابات
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            إضافة حساب
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/70">
              <thead className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    <div className="flex items-center justify-end">
                      الاسم
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4 opacity-70"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    البريد الإلكتروني
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    الدور
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200/50">
                {accounts.map((account) => (
                  <tr
                    key={account.id}
                    className="hover:bg-gray-50/80 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-end">
                        <div className="ml-3">
                          <p className="text-sm font-medium text-[rgb(var(--text))]">
                            {account.name}
                          </p>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-[rgb(var(--primary)/0.2)] to-[rgb(var(--secondary)/0.2)] flex items-center justify-center">
                          <span className="text-[rgb(var(--primary))] font-medium">
                            {account.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-[rgb(var(--text)/0.8)]">
                        {account.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full 
                ${
                  account.role === "أستاذ"
                    ? "bg-purple-100 text-purple-800"
                    : account.role === "طالب"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
                      >
                        {account.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex items-center text-xs font-medium rounded-full 
                ${
                  account.status === "نشط"
                    ? "bg-gradient-to-r from-green-50 to-green-100 text-green-800"
                    : "bg-gradient-to-r from-red-50 to-red-100 text-red-800"
                }`}
                      >
                        {account.status === "نشط" ? (
                          <svg
                            className="mr-1 h-2 w-2 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                        ) : (
                          <svg
                            className="mr-1 h-2 w-2 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                        )}
                        {account.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={() => handleView(account)}
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
                          onClick={() => handleEdit(account)}
                          className="text-[rgb(var(--accent))] hover:text-[rgb(var(--accent)/0.8)] transition-colors duration-200 flex items-center"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          تعديل
                        </button>
                        <button
                          onClick={() => handleDelete(account.id)}
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

        {/* Add Account Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 transform transition-all duration-300 scale-95 hover:scale-100">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4">
                <h2 className="text-xl font-bold text-white">
                  {currentAccount ? "تعديل حساب" : "إضافة حساب جديد"}
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                    الاسم
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field w-full bg-white/80 focus:bg-white focus:ring-2 focus:ring-[rgb(var(--primary))]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field w-full bg-white/80 focus:bg-white focus:ring-2 focus:ring-[rgb(var(--primary))]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                    الدور
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="input-field w-full bg-white/80 focus:bg-white focus:ring-2 focus:ring-[rgb(var(--primary))]"
                  >
                    <option value="طالب">طالب</option>
                    <option value="أستاذ">أستاذ</option>
                    <option value="مسؤول">مسؤول</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                    الحالة
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="input-field w-full bg-white/80 focus:bg-white focus:ring-2 focus:ring-[rgb(var(--primary))]"
                  >
                    <option value="نشط">نشط</option>
                    <option value="غير نشط">غير نشط</option>
                  </select>
                </div>
              </div>

              {/* Gradient Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setCurrentAccount(null);
                  }}
                  className="px-4 py-2 rounded-md text-[rgb(var(--text))] hover:bg-gray-100 transition-colors duration-200 border border-gray-300"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleAddAccount}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {currentAccount ? "حفظ التعديلات" : "إضافة حساب"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Account Modal */}
        {showViewModal && currentAccount && (
          <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 transform transition-all duration-300 scale-95 hover:scale-100">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4">
                <h2 className="text-xl font-bold text-white">تفاصيل الحساب</h2>
              </div>

              {/* Content with subtle grid pattern */}
              <div className="relative p-6 space-y-4 bg-white/50">
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-20"></div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/80 p-3 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-[rgb(var(--text)/0.7)]">
                      الاسم
                    </p>
                    <p className="text-[rgb(var(--text))] font-semibold mt-1">
                      {currentAccount.name}
                    </p>
                  </div>

                  <div className="bg-white/80 p-3 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-[rgb(var(--text)/0.7)]">
                      البريد الإلكتروني
                    </p>
                    <p className="text-[rgb(var(--text))] font-semibold mt-1">
                      {currentAccount.email}
                    </p>
                  </div>

                  <div className="bg-white/80 p-3 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-[rgb(var(--text)/0.7)]">
                      الدور
                    </p>
                    <p className="text-[rgb(var(--text))] font-semibold mt-1">
                      {currentAccount.role}
                    </p>
                  </div>

                  <div className="bg-white/80 p-3 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-[rgb(var(--text)/0.7)]">
                      الحالة
                    </p>
                    <div className="mt-1">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${
                  currentAccount.status === "نشط"
                    ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800"
                    : "bg-gradient-to-r from-red-100 to-red-50 text-red-800"
                }`}
                      >
                        {currentAccount.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary)/0.8)] text-white hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Accounts;
