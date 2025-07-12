import React from "react";

function ServicesModal({showViewModal ,currentService , setCurrentPack , handleEditPack , handleAddPack , setShowViewModal }) {
  return (
    <div>
      {showViewModal && currentService && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4">
              <h2 className="text-xl font-bold text-white">
                {currentService.name}
              </h2>
            </div>

            <div className="p-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        اسم الحزمة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        عدد مرات الاستخدام
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        السعر
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentService.subscriptionPacks.map((pack) => (
                      <tr key={pack.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                          {pack.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          {pack.usageLimit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          {pack.price} $
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => {
                              setCurrentPack(pack);
                              handleEditPack(pack);
                            }}
                            className="text-[rgb(var(--accent))] hover:text-[rgb(var(--accent)/0.8)] mr-3"
                          >
                            تعديل
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Add Package Row */}
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center">
                        <button
                          onClick={handleAddPack}
                          className="text-[rgb(var(--primary))] hover:text-[rgb(var(--primary)/0.8)] flex items-center justify-center w-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          إضافة حزمة جديدة
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="btn-primary px-4 py-2"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesModal;
