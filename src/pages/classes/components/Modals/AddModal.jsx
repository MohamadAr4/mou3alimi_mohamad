import React, { useState } from "react";
import { FiX, FiSave, FiChevronDown, FiCheck } from "react-icons/fi";

function AddModal({
  isAddModalOpen,
  closeModal,
  newClassName,
  setNewClassName,
  subjects,
  selectedSubjects,
  handleAddClass,
  handleSubjectSelect
}) {
  const [isSubjectsDropdownOpen, setIsSubjectsDropdownOpen] = useState(false);

  return (
    <div>
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">إضافة فصل جديد</h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم الفصل
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="أدخل اسم الفصل"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المواد الدراسية
                </label>
                
                {/* Selected subjects display */}
                <div 
                  className="w-full p-3 border border-gray-200 rounded-lg cursor-pointer flex items-center justify-between"
                  onClick={() => setIsSubjectsDropdownOpen(!isSubjectsDropdownOpen)}
                >
                  <div className="flex flex-wrap gap-2">
                    {selectedSubjects.length > 0 ? (
                      subjects
                        .filter(subject => selectedSubjects.includes(subject.id))
                        .map(subject => (
                          <span 
                            key={subject.id} 
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center"
                          >
                            {subject.name}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubjectSelect(subject.id);
                              }}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              <FiX size={12} />
                            </button>
                          </span>
                        ))
                    ) : (
                      <span className="text-gray-400">اختر المواد الدراسية</span>
                    )}
                  </div>
                  <FiChevronDown className={`transition-transform ${isSubjectsDropdownOpen ? 'transform rotate-180' : ''}`} />
                </div>
                
                {/* Subjects dropdown */}
                {isSubjectsDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          handleSubjectSelect(subject.id);
                        }}
                      >
                        <div className={`w-5 h-5 border rounded-md mr-2 flex items-center justify-center ${
                          selectedSubjects.includes(subject.id) 
                            ? 'bg-[rgb(var(--primary))] border-[rgb(var(--primary))] text-white' 
                            : 'border-gray-300'
                        }`}>
                          {selectedSubjects.includes(subject.id) && <FiCheck size={14} />}
                        </div>
                        <span className="flex-1">{subject.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddClass}
                disabled={!newClassName || selectedSubjects.length === 0}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  newClassName && selectedSubjects.length > 0
                    ? "bg-[rgb(var(--secondary))] text-white hover:bg-[rgb(var(--secondary)/0.9)]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FiSave /> حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddModal;