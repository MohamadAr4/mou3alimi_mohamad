function Header({navigate , ad  , getStatusBadge}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/ads")}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="رجوع"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            تفاصيل الإعلان{" "}
            <span className="text-[rgb(var(--primary))]">#{ad.adNumber}</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            آخر تحديث: {ad.createdAt}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {getStatusBadge(ad.status)}
        <div className="hidden md:block w-px h-6 bg-gray-300"></div>
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="text-sm text-gray-600 hover:text-[rgb(var(--primary))] flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          مشاركة
        </button>
      </div>
    </div>
  );
}

export default Header;
