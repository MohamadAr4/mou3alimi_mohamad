import React from "react";
import {
  FiEye,
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
function Table({currentItems ,indexOfFirstItem , openModal ,indexOfLastItem , setCurrentPage , currentPage , totalPages , StatusBadge , suggestions  }) {
  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200/70">
            <thead className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                  اسم المقترح
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                  المعلم
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                  التاريخ
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((suggestion, index) => (
                <tr key={suggestion.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {suggestion.suggested_service_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {suggestion.teacher_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={suggestion.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(suggestion.created_at).toLocaleDateString(
                      "ar-EG"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => openModal(suggestion.id)}
                      className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                    >
                      <FiEye /> عرض
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
            عرض <span className="font-medium">{indexOfFirstItem + 1}</span> إلى{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, suggestions.length)}
            </span>{" "}
            من <span className="font-medium">{suggestions.length}</span> نتيجة
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
    </>
  );
}

export default Table;
