import React from "react";

function RejectModal({ isOpen, onClose, onConfirm, rejectReason, setRejectReason }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">سبب رفض الإعلان</h2>
        <textarea
          rows="4"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="أدخل سبب الرفض هنا..."
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            إلغاء
          </button>
          <button
            onClick={() => onConfirm(rejectReason)}
            disabled={!rejectReason.trim()}
            className={`px-4 py-2 rounded-lg text-white ${
              rejectReason.trim()
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            تأكيد الرفض
          </button>
        </div>
      </div>
    </div>
  );
}

export default RejectModal;
