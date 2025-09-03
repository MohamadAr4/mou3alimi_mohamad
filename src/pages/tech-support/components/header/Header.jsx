import React from 'react';
import {FiSearch, FiMessageSquare, FiCheck, FiX, FiSend, FiChevronDown, FiChevronUp} from 'react-icons/fi';
function Header({searchTerm , setSearchTerm}) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--text))]">الدعم الفني</h1>
                <p className="text-gray-600">إدارة شكاوى واستفسارات المستخدمين</p>
            </div>
        </div>
    );
}

export default Header;