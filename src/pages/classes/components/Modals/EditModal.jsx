import { FiX, FiSave } from "react-icons/fi";
function EditModal({
  isEditModalOpen,
  currentClass,
  closeModal,
  editClassName = currentClass.name,
  setEditClassName,
  subjects,
  editSelectedSubjects,
  handleEditSubjectSelect,
  handleEditClass,
}) {
  return (
    <div>
      {isEditModalOpen && currentClass && (
        <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">
                تعديل الفصل: {currentClass.name}
              </h3>
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
                  value={editClassName}
                  onChange={(e) => setEditClassName(e.target.value)}
                  placeholder="أدخل اسم الفصل"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المواد الدراسية
                </label>
                <div className="border border-gray-200 rounded-lg p-3 max-h-60 overflow-y-auto">
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="flex items-center p-2 hover:bg-gray-50 rounded"
                    >
                      <input
                        type="checkbox"
                        id={`edit-subject-${subject.id}`}
                        checked={editSelectedSubjects.includes(subject.id)}
                        onChange={() => handleEditSubjectSelect(subject.id)}
                        className="ml-2"
                      />
                      <label
                        htmlFor={`edit-subject-${subject.id}`}
                        className="flex-1"
                      >
                        {subject.name}
                      </label>
                    </div>
                  ))}
                </div>
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
                onClick={handleEditClass}
                disabled={!editClassName || editSelectedSubjects.length === 0}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  editClassName && editSelectedSubjects.length > 0
                    ? "bg-[rgb(var(--secondary))] text-white hover:bg-[rgb(var(--secondary)/0.9)]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FiSave /> حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditModal;
