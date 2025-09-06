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
          <p className="text-sm text-gray-500 mt-1">
            آخر تحديث: {new Date(ad?.updated_at).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {getStatusBadge(ad?.status)}
      </div>
    </div>
  );
}

export default Header;
