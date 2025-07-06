import React from "react";

function Navigation_user() {
  return (
    <div className="flex items-center gap-4">
      {/* Notification button with modern design */}
      <div className="relative">
        <button
          className="p-2 rounded-full hover:bg-white/20 transition-all duration-300 relative group"
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-[rgb(var(--error))] flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--error))] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[rgb(var(--error))]"></span>
          </span>
        </button>
      </div>

      {/* User profile dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-2 focus:outline-none">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--secondary))] flex items-center justify-center text-white font-bold text-lg transition-all duration-300 group-hover:scale-105">
              م
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[rgb(var(--accent))] border-2 border-white"></div>
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="font-medium text-sm text-white">محمد أحمد</span>
            <span className="text-xs text-white/80">المشرف العام</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white/70 group-hover:text-white transition-all duration-300 hidden md:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown menu - appears on hover/focus */}
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right transform scale-95 group-hover:scale-100">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--background))] transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              الملف الشخصي
            </div>
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--background))] transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              الإعدادات
            </div>
          </a>
          <div className="border-t border-gray-100 my-1"></div>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-[rgb(var(--error))] hover:bg-[rgb(var(--background))] transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              تسجيل الخروج
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navigation_user;
