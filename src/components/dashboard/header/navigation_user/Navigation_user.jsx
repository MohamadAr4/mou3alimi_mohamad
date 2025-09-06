import React from "react";

function Navigation_user() {
  return (
    <div className="flex items-center gap-4">
      {/* Notification button with modern design */}
      

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
      </div>
    </div>
  );
}

export default Navigation_user;
