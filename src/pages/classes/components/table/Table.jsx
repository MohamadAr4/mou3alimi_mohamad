import { FiEdit, FiTrash2, FiX } from "react-icons/fi";
function Table({
  classes,
  handleViewClass,
  openEditModal,
  openDeleteModal,
  handleGetClassesById,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                اسم الفصل
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classes.map((classItem) => (
              <tr key={classItem.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(var(--text))]">
                  {classItem.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      handleGetClassesById(classItem.id);
                      handleViewClass();
                    }}
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                  >
                    عرض
                  </button>
                  <button
                    onClick={() => {
                      handleGetClassesById(classItem.id);
                      openEditModal();
                    }}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(classItem)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
