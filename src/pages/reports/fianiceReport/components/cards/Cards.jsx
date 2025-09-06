import React from "react";

function Cards({ total }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100">
        <h3 className="text-sm font-medium text-blue-600 mb-1">إجمالي الدخل</h3>
        <p className="text-2xl font-bold text-gray-800">{total} ر.س</p>
      </div>
    </div>
  );
}

export default Cards;
