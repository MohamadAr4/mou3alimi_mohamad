import React, { useState } from "react";
import Header from "./components/header/Header";
import {
  FiEye,
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

function Table({ ads, handleView, handleDelete, indexOfFirstItem,
  indexOfLastItem,
  setCurrentPage,
  currentPage,
  totalPages, }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);

  const openDeleteModal = (adId) => {
    const ad = ads.find(a => a.id === adId);
    setAdToDelete(ad);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setAdToDelete(null);
  };

  const confirmDelete = async () => {
    if (adToDelete) {
      await handleDelete(adToDelete.id);
      closeDeleteModal();
    }
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200/70">
        <Header />
        <tbody className="bg-white divide-y divide-gray-200/50">
          {ads.map((ad) => (
            <tr
              key={ad.id}
              className="hover:bg-gray-50/80 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-[rgb(var(--text)/0.8)]">
                {ad.teacher_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-[rgb(var(--text)/0.8)]">
                {ad.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-[rgb(var(--text)/0.8)]">
                {ad.service.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-[rgb(var(--text)/0.8)]">
                {ad.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleView(ad.id)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
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
                  </button>
                  <button
                    onClick={() => openDeleteModal(ad.id)}
                   className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
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
                    
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && adToDelete && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">تأكيد الحذف</h3>
              <button
                onClick={closeDeleteModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                هل أنت متأكد من أنك تريد حذف الإعلان "
                <span className="font-semibold">{adToDelete.title}</span>"؟
              </p>
              <p className="text-sm text-gray-500">
                لا يمكن التراجع عن هذا الإجراء وسيتم حذف الإعلان بشكل دائم.
              </p>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
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
          </div>

        </div>
      )}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          عرض <span className="font-medium">{indexOfFirstItem + 1}</span> إلى{" "}
          <span className="font-medium">
            {Math.min(indexOfLastItem, ads.length)}
          </span>{" "}
          من <span className="font-medium">{ads.length}</span> نتيجة
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
              className={`px-3 py-1 border rounded-md text-sm font-medium ${currentPage === page
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
    </>
  );
}

export default Table;