import React from 'react';
import {FiSearch, FiMessageSquare, FiCheck, FiX, FiSend, FiChevronDown, FiChevronUp} from 'react-icons/fi';
function Header({searchTerm , setSearchTerm}) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--text))]">الدعم الفني</h1>
                <p className="text-gray-600">إدارة شكاوى واستفسارات المستخدمين</p>
            </div>
            <div className="relative w-full md:w-64">
                <input
                    type="text"
                    placeholder="ابحث عن شكوى..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
        </div>
    );
}

export default Header;