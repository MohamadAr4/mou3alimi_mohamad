import React from "react";

function AddModal({showAddModal , currentAccount , formData , handleInputChange , setShowAddModal , setCurrentAccount , handleAddAccount}) {
  return (
    <>
      {showAddModal && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 transform transition-all duration-300 scale-95 hover:scale-100">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4">
              <h2 className="text-xl font-bold text-white">
                {currentAccount ? "تعديل حساب" : "إضافة حساب جديد"}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                  الاسم
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field w-full bg-white/80 focus:bg-white focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field w-full bg-white/80 focus:bg-white focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                  الدور
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="input-field w-full bg-white/80 focus:bg-white focus:ring-2 focus:ring-[rgb(var(--primary))]"
                >
                  <option value="طالب">طالب</option>
                  <option value="أستاذ">أستاذ</option>
                  <option value="مسؤول">مسؤول</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                  الحالة
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="input-field w-full bg-white/80 focus:bg-white focus:ring-2 focus:ring-[rgb(var(--primary))]"
                >
                  <option value="نشط">نشط</option>
                  <option value="غير نشط">غير نشط</option>
                </select>
              </div>
            </div>

            {/* Gradient Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setCurrentAccount(null);
                }}
                className="px-4 py-2 rounded-md text-[rgb(var(--text))] hover:bg-gray-100 transition-colors duration-200 border border-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddAccount}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {currentAccount ? "حفظ التعديلات" : "إضافة حساب"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddModal;
