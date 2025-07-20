import {FiX, FiSave } from 'react-icons/fi';
function EditModal({isEditModalOpen , currentSubject , closeModal , editSubjectName , setEditSubjectName , handleEditSubject }) {
  return (
    <div>
       {isEditModalOpen && currentSubject && (
          <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-5">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4 rounded-t-xl flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">تعديل المادة</h3>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-200"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المادة
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
                    value={editSubjectName}
                    onChange={(e) => setEditSubjectName(e.target.value)}
                    placeholder="أدخل اسم المادة"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={()=>handleEditSubject(currentSubject.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      editSubjectName.trim()
                        ? "bg-[rgb(var(--secondary))] text-white hover:bg-[rgb(var(--secondary)/0.9)]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!editSubjectName.trim()}
                  >
                    <FiSave /> حفظ التعديلات
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default EditModal