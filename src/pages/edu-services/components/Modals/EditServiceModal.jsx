import React from "react";
import { FiX } from "react-icons/fi";

function EditServiceModal({
  showEditServiceModal,
  currentService,
  setShowEditServiceModal,
  handleSaveService,
  formData,
  handleInputChange
}) {
  return (
    <div>
      {showEditServiceModal && currentService && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">تعديل الخدمة التعليمية</h2>
              <button 
                onClick={() => setShowEditServiceModal(false)}
                className="text-white hover:text-gray-200"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                  اسم الخدمة
                </label>
                <input
                  type="text"
                  name="name"
                  disabled
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                  الوصف
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                  الحالة
                </label>
                <select
                  name="is_active"
                  value={formData.is_active}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                >
                  <option value={1}>نشط</option>
                  <option value={0}>غير نشط</option>
                </select>
              </div>

              {/* Free Sessions */}
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                  عدد الحصص المجانية
                </label>
                <input
                  type="number"
                  name="free_number"
                  value={formData.free_number}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowEditServiceModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveService}
                className="px-4 py-2 rounded-lg bg-[rgb(var(--primary))] text-white hover:bg-[rgb(var(--primary)/0.9)]"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditServiceModal;