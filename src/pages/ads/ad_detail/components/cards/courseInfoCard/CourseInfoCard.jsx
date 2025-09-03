import React from "react";

function CourseInfoCard({ ad }) {
  return (
    <>
      {ad.sessions.map((session , index) => {
        return (
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 shadow-sm">
              <h3 className="text-xs font-medium text-purple-600 uppercase tracking-wider mb-2">
               معلومات الدورة {index+1} 
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-purple-500">الموقع</p>
                  <p className="font-medium text-gray-800">{session.session_location}</p>
                </div>
                <div>
                  <p className="text-sm text-purple-500">الزمن</p>
                  <p className="font-medium text-gray-800">{new Date(session.session_datetime).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-purple-500">المدة</p>
                  <p className="font-medium text-gray-800">{session.session_duration} ايام</p>
                </div>
                <div>
                  <p className="text-sm text-purple-500">تاريخ النشر</p>
                  <p className="font-medium text-gray-800">{new Date(ad.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>

  );
}

export default CourseInfoCard;
