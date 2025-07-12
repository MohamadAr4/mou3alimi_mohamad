import React from "react";

function EditServiceModal({
  showEditServiceModal,
  currentService,
  setServiceName,
  setShowEditServiceModal,
  handleSaveService,
  serviceName
}) {
  return (
    <div>
      {showEditServiceModal && currentService && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4">
              <h2 className="text-xl font-bold text-white">تعديل اسم الخدمة</h2>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                  اسم الخدمة التعليمية
                </label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="input-field w-full bg-white/80 focus:bg-white focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowEditServiceModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-[rgb(var(--text))] hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveService}
                className="btn-primary px-4 py-2"
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
