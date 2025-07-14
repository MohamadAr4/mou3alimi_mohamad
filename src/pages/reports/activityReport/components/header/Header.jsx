import React from "react";
import { FiDownload, FiFilter, FiPrinter } from "react-icons/fi";
function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">تقارير النشاط</h1>
        <p className="text-gray-600">نظرة عامة على نشاط المستخدمين في النظام</p>
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 flex items-center gap-2 hover:bg-gray-50">
          <FiDownload size={16} />
          تصدير
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 flex items-center gap-2 hover:bg-gray-50">
          <FiPrinter size={16} />
          طباعة
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <FiFilter size={16} />
          فلترة
        </button>
      </div>
    </div>
  );
}

export default Header;
