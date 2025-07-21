import React from "react";
import { FiX } from "react-icons/fi";

function ShowModal({ isViewModalOpen, currentClass, closeModal }) {
  return (
    <div>
      {isViewModalOpen && currentClass && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">
                تفاصيل الفصل: {currentClass.name}
              </h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Class Information Section */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">معلومات الفصل:</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">اسم الفصل:</p>
                      <p className="font-medium">{currentClass.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">عدد المواد:</p>
                      <p className="font-medium">{currentClass.subjects.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subjects List Section */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">المواد الدراسية:</h4>
                {currentClass.subjects.length > 0 ? (
                  <ul className="space-y-2">
                    {currentClass.subjects.map((subject) => (
                      <li 
                        key={subject.id} 
                        className="bg-gray-50 p-3 rounded-lg border border-gray-100"
                      >
                        {subject.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                    لا توجد مواد مسجلة لهذا الفصل
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
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

export default ShowModal;