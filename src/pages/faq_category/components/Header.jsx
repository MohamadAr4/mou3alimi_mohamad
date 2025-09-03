import React from "react";
import {
  FiPlus,
} from "react-icons/fi";
function Header({openAddModal}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          تصنيفات الاسئلة الاكثر شيوعاً
        </h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg flex items-center gap-2 hover:bg-[rgb(var(--primary)/0.9)]"
        >
          <FiPlus /> اضافة تصنيف جديد
        </button>
      </div>
    </div>
  );
}

export default Header;
