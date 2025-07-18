import React from 'react'

function AddButton({setShowAddModal}) {
  return (
    <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[rgb(var(--text))]">
            الحسابات
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            إضافة حساب
          </button>
        </div>
  )
}

export default AddButton