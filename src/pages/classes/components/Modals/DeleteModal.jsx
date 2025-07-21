import React from "react";
import {FiTrash2 , FiX } from "react-icons/fi";
function DeleteModal({isDeleteModalOpen , currentClass , closeModal , handleDeleteClass}) {
  return (
    <div>
      {isDeleteModalOpen && currentClass && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">حذف الفصل</h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="p-6">
              <p>
                هل أنت متأكد من رغبتك في حذف الفصل{" "}
                <strong>{currentClass.name}</strong>؟ لا يمكن التراجع عن هذا
                الإجراء.
              </p>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleDeleteClass}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <FiTrash2 /> حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteModal;
