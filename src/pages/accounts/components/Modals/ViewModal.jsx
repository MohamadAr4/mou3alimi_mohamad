import React from "react";
import { FiX, FiUser, FiPhone, FiMapPin, FiCalendar, FiBook, FiAward } from "react-icons/fi";

function ViewModal({ showViewModal, currentAccount, setShowViewModal , setShowBanModal  , handleUnBanAccount}) {
  if (!showViewModal || !currentAccount) return null;

  const isTeacher = currentAccount.role === "teacher";
  const isBanned = currentAccount.status === "banned";

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {isTeacher ? "تفاصيل المعلم" : "تفاصيل الطالب"}
          </h2>
          <button 
            onClick={() => setShowViewModal(false)}
            className="text-white hover:text-gray-200"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3">
              <div className="bg-[rgb(var(--primary)/0.1)] p-2 rounded-full text-[rgb(var(--primary))]">
                <FiUser size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">الاسم الكامل</p>
                <p className="text-gray-900 font-medium">{currentAccount.full_name}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3">
              <div className="bg-[rgb(var(--primary)/0.1)] p-2 rounded-full text-[rgb(var(--primary))]">
                <FiPhone size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">رقم الهاتف</p>
                <p className="text-gray-900 font-medium">{currentAccount.phone_number}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3">
              <div className="bg-[rgb(var(--primary)/0.1)] p-2 rounded-full text-[rgb(var(--primary))]">
                <FiMapPin size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">المحافظة</p>
                <p className="text-gray-900 font-medium">{currentAccount.location}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3">
              <div className="bg-[rgb(var(--primary)/0.1)] p-2 rounded-full text-[rgb(var(--primary))]">
                <FiCalendar size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">تاريخ التسجيل</p>
                <p className="text-gray-900 font-medium">
                  {new Date(currentAccount.created_at).toLocaleDateString('ar-EG')}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">الحالة</p>
                <div className="mt-1">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentAccount.status === "active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {currentAccount.status === "active" ? "نشط" : "محظور"}
                  </span>
                </div>
              </div>
              {isBanned && (
                <div>
                  <p className="text-sm font-medium text-gray-500">حتى تاريخ</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(currentAccount.banned_until).toLocaleDateString('ar-EG')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Teacher Specific Info */}
          {isTeacher && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[rgb(var(--primary)/0.1)] p-2 rounded-full text-[rgb(var(--primary))]">
                  <FiAward size={18} />
                </div>
                <h3 className="font-medium">المعلومات التعليمية</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">سنوات الخبرة</p>
                  <p className="text-gray-900 font-medium">
                    {currentAccount.profile.experience_years === "between_1_and_3_years" 
                      ? "1-3 سنوات" 
                      : currentAccount.profile.experience_years}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">الجنس</p>
                  <p className="text-gray-900 font-medium">
                    {currentAccount.profile.gender === "male" ? "ذكر" : "أنثى"}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">الصفوف والمواد</p>
                <div className="space-y-3">
                  {currentAccount.profile.class_subjects.map((classItem) => (
                    <div key={classItem.id} className="border-l-4 border-[rgb(var(--primary))] pl-3">
                      <p className="font-medium">{classItem.name}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {classItem.subjects.map(subject => (
                          <span key={subject.id} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            {subject.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Student Specific Info */}
          {!isTeacher && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[rgb(var(--primary)/0.1)] p-2 rounded-full text-[rgb(var(--primary))]">
                  {/* <FiSchool size={18} /> */}
                </div>
                <h3 className="font-medium">المعلومات الدراسية</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">اسم المدرسة</p>
                  <p className="text-gray-900 font-medium">{currentAccount.profile.school_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">الصف</p>
                  <p className="text-gray-900 font-medium">{currentAccount.profile.school_class.name}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">المواد الدراسية</p>
                <div className="flex flex-wrap gap-2">
                  {currentAccount.profile.subjects.map(subject => (
                    <span key={subject.id} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {subject.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => setShowViewModal(false)}
            className="px-4 py-2 rounded-md bg-[rgb(var(--primary))] text-white hover:bg-[rgb(var(--primary)/0.9)] transition-colors"
          >
            إغلاق
          </button>
          <button
            onClick={() =>  currentAccount.status === "active" ? setShowBanModal(true) : handleUnBanAccount()}
            className="px-4 py-2 rounded-md bg-[rgb(var(--error))] text-white hover:bg-[rgb(var(--error)/0.9)] transition-colors mr-2"
          >
            {currentAccount.status === "active" ? "حظر" : "فك الحظر"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewModal;