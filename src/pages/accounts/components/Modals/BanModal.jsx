import React, { useState } from 'react';
import { FiCalendar, FiX } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BanModal({ isOpen, onClose, onBanSubmit, userName , isSubmitting , banDate , setBanDate , handleUnBanAccount }) {



  if (!isOpen) return null;

  return (
    <>
      <ToastContainer rtl={true} />
      
      <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">حظر المستخدم</h3>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <FiX size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                أنت على وشك حظر المستخدم <span className="font-bold text-[rgb(var(--primary))]">{userName}</span>. يرجى تحديد تاريخ انتهاء الحظر:
              </p>
              
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  <FiCalendar size={20} />
                </div>
                <input
                  type="date"
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-[rgb(var(--primary))]"
                  value={banDate}
                  onChange={(e) => setBanDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                disabled={isSubmitting}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-white rounded-lg flex items-center gap-2 ${
                  isSubmitting 
                    ? 'bg-gray-400' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
                disabled={isSubmitting}
                onClick={()=>{onBanSubmit()}}
              >
                {isSubmitting ? 'جاري الحظر...' : 'تأكيد الحظر'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BanModal;