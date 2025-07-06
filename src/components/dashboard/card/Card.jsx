import React from "react";

function Card({color , title , data , path}) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-r-4 border-${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#7f8c8d]">{title}</p>
          <h3 className="text-2xl font-bold">{data}</h3>
        </div>
        <div className={`p-3 rounded-full bg-${color}/10`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-${color}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={path}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Card;
