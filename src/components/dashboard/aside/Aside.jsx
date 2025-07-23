import { useState } from "react";
import { useAuthStore } from "../../../stores/auth.store";

function Aside({ isDrawerOpen }) {
  const { logout } = useAuthStore();
  const navContent = [
    {
      title: "الصفحة الرئيسية",
      svg_path:
        "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      path: "/",
    },
    {
      title: "الحسابات",
      svg_path:
        "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      path: "/accounts",
    },
    {
      title: "الخدمات التعليمية",
      svg_path:
        "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      path: "/edu-services",
    },
    {
      title: "المواد الدراسية",
      svg_path:
        "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      path: "/subjects",
    },
    {
      title: "الصفوف الدراسية",
      svg_path:
        "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
      path: "/classes",
    },
    {
      title: "الاعلانات",
      svg_path:
        "M14 3a1 1 0 011 1v1h1a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h1V4a1 1 0 011-1h7zm-3 8a3 3 0 100 6 3 3 0 000-6zm-1 3a1 1 0 112 0 1 1 0 01-2 0zm5-9h-1V5h-6v2H9v1h1v1H7v9h10V7h-1V6h1V5h-1V4h1v1z",
      path: "/ads",
    },
    {
      title: "التقارير",
      svg_path:
        "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      path: "/reports",
      subItems: [
        {
          title: "تقارير مالية",
          path: "/reports/financial",
        },
        {
          title: "تقارير النشاط",
          path: "/reports/activity",
        },
      ],
    },
    {
      title: "الدعم الفني",
      svg_path:
        "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
      path: "/tech-support",
    },
    {
      title: "الاعدادات",
      svg_path:
        "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      path: "/settings",
    },
  ];

  const currentPath = window.location.pathname;
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItemExpansion = (title) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <aside
      className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
        isDrawerOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        <nav className="flex-1">
          <ul className="space-y-1">
            {navContent.map((nav) => {
              const isActive =
                currentPath === nav.path ||
                (nav.subItems &&
                  nav.subItems.some((item) => currentPath === item.path));
              const hasSubItems = nav.subItems && nav.subItems.length > 0;
              const isExpanded = expandedItems[nav.title];

              return (
                <li key={nav.path}>
                  <div className="flex flex-col">
                    <a
                      href={hasSubItems ? "#" : nav.path}
                      onClick={(e) => {
                        if (hasSubItems) {
                          e.preventDefault();
                          toggleItemExpansion(nav.title);
                        }
                      }}
                      className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                        isDrawerOpen ? "justify-start" : "justify-center"
                      } ${
                        isActive
                          ? "bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={nav.svg_path}
                          />
                        </svg>
                      </div>
                      {isDrawerOpen && (
                        <div className="mr-3 whitespace-nowrap flex-1 flex justify-between items-center">
                          <span>{nav.title}</span>
                          {hasSubItems && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 transform transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </div>
                      )}
                    </a>

                    {hasSubItems && isDrawerOpen && isExpanded && (
                      <div className="ml-8 mt-1 space-y-1">
                        {nav.subItems.map((subItem) => (
                          <a
                            key={subItem.path}
                            href={subItem.path}
                            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                              currentPath === subItem.path
                                ? "bg-blue-100 text-blue-700 font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {subItem.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom spacer or additional items */}
        <div className="mt-auto">
          <div className="border-t border-gray-200 my-4"></div>
          <a
            href="#"
            className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
              isDrawerOpen ? "justify-start" : "justify-center"
            } hover:bg-gray-100 text-gray-700 group`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[rgb(var(--error))]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {isDrawerOpen && (
              <span
                className="mr-3 whitespace-nowrap text-[rgb(var(--error))]"
                onClick={(e) => handleLogout(e)}
              >
                تسجيل الخروج
              </span>
            )}
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
