import React from "react";

function ViewModal({ showViewModal, currentAccount, setShowViewModal }) {
  return (
    <div>
      {showViewModal && currentAccount && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 transform transition-all duration-300 scale-95 hover:scale-100">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4">
              <h2 className="text-xl font-bold text-white">تفاصيل الحساب</h2>
            </div>

            {/* Content with subtle grid pattern */}
            <div className="relative p-6 space-y-4 bg-white/50">
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-20"></div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white/80 p-3 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-[rgb(var(--text)/0.7)]">
                    الاسم
                  </p>
                  <p className="text-[rgb(var(--text))] font-semibold mt-1">
                    {currentAccount.name}
                  </p>
                </div>

                <div className="bg-white/80 p-3 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-[rgb(var(--text)/0.7)]">
                    البريد الإلكتروني
                  </p>
                  <p className="text-[rgb(var(--text))] font-semibold mt-1">
                    {currentAccount.email}
                  </p>
                </div>

                <div className="bg-white/80 p-3 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-[rgb(var(--text)/0.7)]">
                    الدور
                  </p>
                  <p className="text-[rgb(var(--text))] font-semibold mt-1">
                    {currentAccount.role}
                  </p>
                </div>

                <div className="bg-white/80 p-3 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-[rgb(var(--text)/0.7)]">
                    الحالة
                  </p>
                  <div className="mt-1">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                         ${
                           currentAccount.status === "نشط"
                             ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800"
                             : "bg-gradient-to-r from-red-100 to-red-50 text-red-800"
                         }`}
                    >
                      {currentAccount.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gradient Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary)/0.8)] text-white hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
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

export default ViewModal;
