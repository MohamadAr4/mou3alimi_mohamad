import React from "react";
import { FiPlus } from "react-icons/fi";
function Header({ openAddModal }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--text))]">
          الفصول الدراسية
        </h1>
        <p className="text-gray-600">إدارة الفصول الدراسية في النظام</p>
      </div>
      <button
        onClick={openAddModal}
        className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded-lg flex items-center gap-2 hover:bg-[rgb(var(--primary)/0.9)]"
      >
        <FiPlus /> إضافة فصل جديد
      </button>
    </div>
  );
}

export default Header;
