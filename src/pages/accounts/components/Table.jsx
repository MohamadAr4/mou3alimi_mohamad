import React from "react";
import {
  FiEye,
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

function Table({
  accounts,
  handleEdit,
  handleView,
  indexOfFirstItem,
  indexOfLastItem,
  setCurrentPage,
  currentPage,
  totalPages,
}) {
  const tableHeaders = [
    {
      id: "name",
      label: "الاسم الكامل",
      sortable: true,
      align: "right",
    },
    {
      id: "phone_number",
      label: "رقم الهاتف",
      sortable: false,
      align: "right",
    },
    {
      id: "location",
      label: "الموقع",
      sortable: false,
      align: "right",
    },
    {
      id: "role",
      label: "الدور",
      sortable: true,
      align: "right",
    },
    {
      id: "status",
      label: "الحالة",
      sortable: true,
      align: "right",
    },
    {
      id: "actions",
      label: "الإجراءات",
      sortable: false,
      align: "center",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200/70">
          <thead className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.id}
                  className={`px-6 py-4 text-sm font-semibold text-white uppercase tracking-wider text-${header.align}`}
                >
                  <div
                    className={`flex items-center ${
                      header.align === "right"
                        ? "justify-start"
                        : "justify-center"
                    }`}
                  >
                    {header.label}
                    {header.sortable && (
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
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200/50">
            {accounts.map((account) => (
              <tr
                key={account.id}
                className="hover:bg-gray-50/80 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-left">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-[rgb(var(--primary)/0.2)] to-[rgb(var(--secondary)/0.2)] flex items-center justify-center ml-1">
                      <span className="text-[rgb(var(--primary))] font-medium">
                        {account.full_name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-[rgb(var(--text))]">
                        {account.full_name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-[rgb(var(--text)/0.8)]">
                    {account.phone_number}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-[rgb(var(--text)/0.8)]">
                    {account.location}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full 
                ${
                  account.role === "teacher"
                    ? "bg-purple-100 text-purple-800"
                    : account.role === "student"
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
                  account.status === "active"
                    ? "bg-gradient-to-r from-green-50 to-green-100 text-green-800"
                    : "bg-gradient-to-r from-red-50 to-red-100 text-red-800"
                }`}
                  >
                    {account.status === "active" ? (
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
                  <div className="flex gap-3 justify-center">
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          عرض <span className="font-medium">{indexOfFirstItem + 1}</span> إلى{" "}
          <span className="font-medium">
            {Math.min(indexOfLastItem, accounts.length)}
          </span>{" "}
          من <span className="font-medium">{accounts.length}</span> نتيجة
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded-md text-sm font-medium ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
