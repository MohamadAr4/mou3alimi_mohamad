import React, { useState } from "react";
import {
  FiEye,
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiInfo,
  FiMessageSquare,
} from "react-icons/fi";

function ShowServicesModal({
  isModalOpen,
  selectedSuggestion,
  closeModal,
  StatusBadge,
  updateSuggestionStatus,
  statusUpdateLoading,
}) {
  const [rejectReasonModalOpen, setRejectReasonModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleReject = () => {
    setRejectReasonModalOpen(true);
  };

  const confirmReject = () => {
    if (rejectReason.trim()) {
      updateSuggestionStatus("rejected", rejectReason.trim());
      setRejectReasonModalOpen(false);
      setRejectReason("");
    }
  };

  const cancelReject = () => {
    setRejectReasonModalOpen(false);
    setRejectReason("");
  };

  return (
    <div>
      {/* Main Modal */}
      {isModalOpen && selectedSuggestion && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">تفاصيل المقترح</h3>
                <p className="text-sm text-gray-600 mt-1">عرض المعلومات الكاملة لمقترح الخدمة</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
              >
                <FiX size={24} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Service Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">
                    اسم المقترح
                  </h4>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedSuggestion.suggested_service_name}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                    الحالة
                  </h4>
                  <div className="mt-1">
                    <StatusBadge status={selectedSuggestion.status} />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <FiCalendar size={14} />
                    تاريخ الإرسال
                  </h4>
                  <p className="text-gray-900 mt-1">
                    {new Date(selectedSuggestion.created_at).toLocaleDateString(
                      "ar-EG",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                
                {selectedSuggestion.reason && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 className="text-xs font-semibold text-red-800 uppercase tracking-wide mb-1 flex items-center gap-1">
                      <FiMessageSquare size={14} />
                      سبب الرفض
                    </h4>
                    <p className="text-red-900 mt-1">
                      {selectedSuggestion.reason}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                <h4 className="text-sm font-semibold text-indigo-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <FiInfo size={16} />
                  الوصف
                </h4>
                <p className="text-gray-800 leading-relaxed bg-white p-4 rounded-lg border border-indigo-100">
                  {selectedSuggestion.description}
                </p>
              </div>

              {/* Teacher Information */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                  معلومات المعلم
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FiUser className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">الاسم الكامل</p>
                      <p className="text-gray-900 font-medium">
                        {selectedSuggestion.teacher?.full_name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div className="p-2 bg-green-100 rounded-full">
                      <FiPhone className="text-green-600" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">رقم الهاتف</p>
                      <p className="text-gray-900 font-medium">
                        {selectedSuggestion.teacher?.phone_number}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <FiMapPin className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">المحافظة</p>
                      <p className="text-gray-900 font-medium">
                        {selectedSuggestion.teacher?.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <FiCalendar className="text-orange-600" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">تاريخ التسجيل</p>
                      <p className="text-gray-900 font-medium">
                        {new Date(
                          selectedSuggestion.teacher?.created_at
                        ).toLocaleDateString("ar-EG")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer with Actions */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-500">
                {selectedSuggestion.status === "pending" && "اختر إجراء للمقترح"}
              </div>
              <div className="flex gap-3">
                {selectedSuggestion.status === "pending" && (
                  <>
                    <button
                      onClick={handleReject}
                      disabled={statusUpdateLoading}
                      className="px-5 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2 disabled:opacity-50 transition-colors duration-200 font-medium"
                    >
                      <FiX size={18} /> رفض
                    </button>
                    <button
                      onClick={() => updateSuggestionStatus("approved")}
                      disabled={statusUpdateLoading}
                      className="px-5 py-2.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center gap-2 disabled:opacity-50 transition-colors duration-200 font-medium"
                    >
                      <FiCheck size={18} /> قبول
                    </button>
                  </>
                )}
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectReasonModalOpen && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
              <h3 className="text-xl font-bold text-gray-900">إضافة سبب الرفض</h3>
              <button
                onClick={cancelReject}
                className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
              >
                <FiX size={22} />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                سبب الرفض <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                rows="4"
                placeholder="يرجى إدخال سبب الرفض..."
              />
              <p className="text-xs text-gray-500 mt-2">يجب إدخال سبب الرفض للمتابعة</p>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={cancelReject}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                إلغاء
              </button>
              <button
                onClick={confirmReject}
                disabled={!rejectReason.trim() || statusUpdateLoading}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <FiX size={18} /> تأكيد الرفض
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowServicesModal;