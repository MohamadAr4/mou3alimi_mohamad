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
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service.is_active 
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
                      className="text-[rgb(var(--primary))] hover:text-[rgb(var(--primary)/0.8)] transition-colors duration-200 flex items-center"
                    >
                      <FiEye className="h-4 w-4 mr-1" />
                      عرض
                    </button>
                    <button
                      onClick={() => handleEditService(service)}
                      className="text-[rgb(var(--accent))] hover:text-[rgb(var(--accent)/0.8)] transition-colors duration-200 flex items-center"
                    >
                      <FiEdit className="h-4 w-4 mr-1" />
                      تعديل
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