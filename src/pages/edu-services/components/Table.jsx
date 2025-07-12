import React from "react";

function Table({services , handleView , handleEditService}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200/70">
          <thead className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                اسم الخدمة التعليمية
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                عدد حزمات الاشتراك
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-[rgb(var(--text)/0.8)]">
                  {service.subscriptionPacks.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => handleView(service)}
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
                      onClick={() => handleEditService(service)}
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
