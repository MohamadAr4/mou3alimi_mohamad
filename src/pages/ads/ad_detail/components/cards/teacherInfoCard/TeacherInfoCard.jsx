import React from "react";

function TeacherInfoCard({ad}) {
  return (
    <div className="space-y-4">
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 shadow-sm">
        <h3 className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-2">
          معلومات المعلن
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-amber-500">الاسم</p>
            <p className="font-medium text-gray-800">{ad.teacherName}</p>
          </div>
          <div>
            <p className="text-sm text-amber-500">رقم الجوال</p>
            <p className="font-medium text-gray-800">{ad.teacherPhone}</p>
          </div>
          <div>
            <p className="text-sm text-amber-500">عدد الإعلانات</p>
            <p className="font-medium text-gray-800">5 إعلانات</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherInfoCard;
