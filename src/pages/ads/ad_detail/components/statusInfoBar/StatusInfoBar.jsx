import React from "react";

function StatusInfoBar({getStatusBadge , ad}) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-100 p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-xs font-medium text-indigo-600">حالة الإعلان</p>
          {getStatusBadge(ad.status)}
        </div>
        <div className="hidden md:block w-px h-6 bg-indigo-200"></div>
        <div>
          <p className="text-xs font-medium text-indigo-600">المعلن</p>
          <p className="font-medium text-gray-800">{ad.teacherName}</p>
        </div>
        <div className="hidden md:block w-px h-6 bg-indigo-200"></div>
        <div>
          <p className="text-xs font-medium text-indigo-600">الخدمة</p>
          <p className="font-medium text-gray-800">{ad.service}</p>
        </div>
      </div>
      <button className="text-sm font-medium bg-white px-3 py-1.5 rounded-lg border border-indigo-100 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-1 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        {ad.teacherPhone}
      </button>
    </div>
  );
}

export default StatusInfoBar;
