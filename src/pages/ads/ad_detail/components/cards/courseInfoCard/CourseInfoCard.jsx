import React from "react";

function CourseInfoCard({ad}) {
  return (
    <div className="space-y-4">
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 shadow-sm">
        <h3 className="text-xs font-medium text-purple-600 uppercase tracking-wider mb-2">
          معلومات الدورة
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-purple-500">المدة</p>
            <p className="font-medium text-gray-800">{ad.duration}</p>
          </div>
          <div>
            <p className="text-sm text-purple-500">السعر</p>
            <p className="font-medium text-green-600">{ad.price}</p>
          </div>
          <div>
            <p className="text-sm text-purple-500">تاريخ النشر</p>
            <p className="font-medium text-gray-800">{ad.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseInfoCard;
