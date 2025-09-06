import React from "react";
import '../../../index.css';

function Card({ color, title, data, change, trend, path }) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-r-blue-500',
      text: 'text-blue-600',
      iconBg: 'bg-blue-100',
      change: trend === 'up' ? 'text-green-600' : 'text-red-600'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-r-green-500',
      text: 'text-green-600',
      iconBg: 'bg-green-100',
      change: trend === 'up' ? 'text-green-600' : 'text-red-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-r-yellow-500',
      text: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      change: trend === 'up' ? 'text-green-600' : 'text-red-600'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-r-red-500',
      text: 'text-red-600',
      iconBg: 'bg-red-100',
      change: trend === 'up' ? 'text-green-600' : 'text-red-600'
    }
  };

  const currentColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`rounded-xl shadow-sm p-6 border-r-4 ${currentColor.border} ${currentColor.bg} transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{data}</h3>
        </div>
        <div className={`p-3 rounded-xl ${currentColor.iconBg}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${currentColor.text}`}
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