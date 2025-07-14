import React from "react";

function Cards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100">
        <h3 className="text-sm font-medium text-blue-600 mb-1">
          المستخدمون النشطون
        </h3>
        <p className="text-2xl font-bold text-gray-800">1,245</p>
        <p className="text-sm text-green-600 mt-1">↑ 8% عن الأسبوع الماضي</p>
      </div>
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-100">
        <h3 className="text-sm font-medium text-purple-600 mb-1">
          الدورات الجديدة
        </h3>
        <p className="text-2xl font-bold text-gray-800">24</p>
        <p className="text-sm text-green-600 mt-1">↑ 3% عن الأسبوع الماضي</p>
      </div>
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-100">
        <h3 className="text-sm font-medium text-green-600 mb-1">
          إكمال الدورات
        </h3>
        <p className="text-2xl font-bold text-gray-800">156</p>
        <p className="text-sm text-green-600 mt-1">↑ 12% عن الأسبوع الماضي</p>
      </div>
    </div>
  );
}

export default Cards;
