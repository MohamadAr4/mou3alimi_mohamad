import React from "react";

function CourseDetailsCard({ad}) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm h-full">
        <h3 className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-2">
          تفاصيل الدورة
        </h3>
        <p className="text-gray-700">{ad.description}</p>
      </div>
    </div>
  );
}

export default CourseDetailsCard;
