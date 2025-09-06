import React, { useState } from 'react';
import { FiMessageSquare, FiTrash2 } from "react-icons/fi";

function Table({
    currentItems,
    openModal,
    indexOfFirstItem,
    setCurrentPage,
    currentPage,
    totalPages,
    filteredComplaints,
    indexOfLastItem,
    handleDelete // Added delete handler prop
}) {
    const [headerCells] = useState([
        {
            name: "اسم مقدم الشكوى"
        },
        {
            name: "صفته"
        },
        {
            name: "العنوان"
        },
        {
            name: "تاريخ تقديم الشكوى"
        },
        {
            name: "الموضوع"
        },
        {
            name: "الاجراءات"
        }]);
    
    // State for delete confirmation modal
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [complaintToDelete, setComplaintToDelete] = useState(null);

    // Open delete confirmation modal
    const openDeleteModal = (complaint) => {
        setComplaintToDelete(complaint);
        setDeleteModalOpen(true);
    };

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setComplaintToDelete(null);
    };

    // Confirm and execute deletion
    const confirmDelete = () => {
        if (complaintToDelete) {
            handleDelete(complaintToDelete.id);
            closeDeleteModal();
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
                            <tr>
                                {headerCells.map((headerCell, index) => {
                                    return (
                                        <th key={index} className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                                            {headerCell.name}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((complaint) => (
                                <tr key={complaint.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4  text-sm font-medium text-[rgb(var(--text))]">
                                        {complaint.user.full_name}
                                    </td>
                                    <td className="px-6 py-4  text-sm text-gray-500">
                                        {complaint.user.role}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {complaint.title}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(complaint.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-[300px]">
                                        {complaint.description}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openModal(complaint)}
                                                className="px-3 py-1 bg-[rgb(var(--primary))] text-white rounded-lg flex items-center gap-1 hover:bg-[rgb(var(--primary)/0.9)]"
                                            >
                                                <FiMessageSquare size={14} />
                                                عرض
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(complaint)}
                                                className="px-3 py-1 bg-red-600 text-white rounded-lg flex items-center gap-1 hover:bg-red-700"
                                            >
                                                <FiTrash2 size={14} />
                                                حذف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        عرض <span className="font-medium">{indexOfFirstItem + 1}</span> إلى{' '}
                        <span className="font-medium">
                            {Math.min(indexOfLastItem, filteredComplaints.length)}
                        </span>{' '}
                        من <span className="font-medium">{filteredComplaints.length}</span> نتيجة
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                            السابق
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 border rounded-md text-sm font-medium ${currentPage === page
                                    ? 'bg-[rgb(var(--primary))] text-white border-[rgb(var(--primary))]'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                            التالي
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && complaintToDelete && (
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
                                هل أنت متأكد من أنك تريد حذف الشكوى "
                                <span className="font-semibold">{complaintToDelete.title}</span>"؟
                            </p>
                            <p className="text-sm text-gray-500">
                                لا يمكن التراجع عن هذا الإجراء وسيتم حذف الشكوى بشكل دائم.
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
                                <FiTrash2 className="ml-1" size={16} />
                                حذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Table;