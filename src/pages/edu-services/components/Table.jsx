import React from "react";
import { FiEye, FiEdit } from "react-icons/fi";

function Table({ services, handleView, handleEditService }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200/70">
          <thead className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                اسم الخدمة
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                الوصف
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                عدد الحصص المجانية
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200/50">
            {services.map((service) => (
              <tr
                key={service.id}
                className="hover:bg-gray-50/80 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-[rgb(var(--text))]">
                  {service.name}
                </td>
                <td className="px-6 py-4 text-right text-sm text-[rgb(var(--text)/0.8)] max-w-xs truncate">
                  {service.description || 'لا يوجد وصف'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.is_active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {service.is_active ? 'نشط' : 'غير نشط'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-[rgb(var(--text)/0.8)]">
                  {service.free_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => handleView(service)}
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
                      onClick={() => handleEditService(service)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      <FiEdit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;