import React from "react";
import {
  FiEye,
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
function ShowServicesModal({
  isModalOpen,
  selectedSuggestion,
  closeModal,
  StatusBadge,
  updateSuggestionStatus,
  statusUpdateLoading,
}) {
  return (
    <div>
      {isModalOpen && selectedSuggestion && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">تفاصيل المقترح</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    اسم المقترح
                  </h4>
                  <p className="mt-1 text-gray-900">
                    {selectedSuggestion.suggested_service_name}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">الحالة</h4>
                  <div className="mt-1">
                    <StatusBadge status={selectedSuggestion.status} />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    تاريخ الإرسال
                  </h4>
                  <p className="mt-1 text-gray-900">
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
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      سبب الرفض
                    </h4>
                    <p className="mt-1 text-gray-900">
                      {selectedSuggestion.reason}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">الوصف</h4>
                <p className="mt-1 text-gray-900">
                  {selectedSuggestion.description}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-500">
                  معلومات المعلم
                </h4>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">الاسم الكامل</p>
                    <p className="text-gray-900">
                      {selectedSuggestion.teacher?.full_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">رقم الهاتف</p>
                    <p className="text-gray-900">
                      {selectedSuggestion.teacher?.phone_number}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">المحافظة</p>
                    <p className="text-gray-900">
                      {selectedSuggestion.teacher?.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">تاريخ التسجيل</p>
                    <p className="text-gray-900">
                      {new Date(
                        selectedSuggestion.teacher?.created_at
                      ).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t">
              {selectedSuggestion.status === "pending" && (
                <>
                  <button
                    onClick={() =>
                      updateSuggestionStatus(
                        "rejected",
                        prompt("يرجى إدخال سبب الرفض")
                      )
                    }
                    disabled={statusUpdateLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2 disabled:opacity-50"
                  >
                    <FiX /> رفض
                  </button>
                  <button
                    onClick={() => updateSuggestionStatus("approved")}
                    disabled={statusUpdateLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
                  >
                    <FiCheck /> قبول
                  </button>
                </>
              )}
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
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

export default ShowServicesModal;
