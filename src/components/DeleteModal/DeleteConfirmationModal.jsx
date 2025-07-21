import React from 'react';
import { FiTrash2, FiX, FiAlertTriangle } from 'react-icons/fi';

const DeleteConfirmationModal = ({ 
  deleteModal,
  isOpen,
  onClose,
  onConfirm,
  itemName,
  title = "تأكيد الحذف",
  description = "هل أنت متأكد من رغبتك في الحذف؟ لا يمكن التراجع عن هذا الإجراء.",
  confirmText = "حذف",
  cancelText = "إلغاء"
}) => {
  if (!isOpen) return null;
  console.log('deleteModal' , deleteModal)
  return (
    <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-5">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <FiAlertTriangle className="text-red-500 text-xl" />
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 mb-1">
            {description}
          </p>
          {itemName && (
            <p className="font-medium text-gray-900">
              المادة: <span className="text-red-500">{itemName}</span>
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={()=>onConfirm(deleteModal.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <FiTrash2 />
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;