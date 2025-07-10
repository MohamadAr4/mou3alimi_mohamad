import React from "react";
import '../../../index.css';
function Card({color , title , data , path}) {
   const borderColors = {
    '[#3498db]': 'border-r-blue-500',
    '[#27ae60]': 'border-r-green-500', 
    '[#f39c12]': 'border-r-yellow-500',
    '[#e74c3c]': 'border-r-red-500'
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-r-4 border- ${borderColors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#7f8c8d]">{title}</p>
          <h3 className="text-2xl font-bold">{data}</h3>
        </div>
        <div className={`p-3 rounded-full bg-${borderColors[color]}/10`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-${borderColors[color]}`}
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
