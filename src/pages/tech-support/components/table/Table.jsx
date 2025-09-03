import React, { useState } from 'react';
import { FiMessageSquare } from "react-icons/fi";

function Table({
    currentItems,
    openModal,
    indexOfFirstItem,
    setCurrentPage,
    currentPage,
    totalPages,
    filteredComplaints,
    indexOfLastItem
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
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
                        <tr>
                            {headerCells.map((headerCell) => {
                                return (
                                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
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
                                    <button
                                        onClick={() => openModal(complaint)}
                                        className="px-3 py-1 bg-[rgb(var(--primary))] text-white rounded-lg flex items-center gap-1 hover:bg-[rgb(var(--primary)/0.9)]"
                                    >
                                        <FiMessageSquare size={14} />
                                        عرض
                                    </button>
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
    );
}

export default Table;