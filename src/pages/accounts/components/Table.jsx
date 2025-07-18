import React from "react";

function Table({accounts , handleDelete , handleEdit , handleView}) {
  const tableHeaders = [
  {
    id: 'name',
    label: 'الاسم',
    sortable: true,
    align: 'right'
  },
  {
    id: 'email',
    label: 'البريد الإلكتروني',
    sortable: false,
    align: 'right'
  },
  {
    id: 'role',
    label: 'الدور',
    sortable: true,
    align: 'right'
  },
  {
    id: 'status',
    label: 'الحالة',
    sortable: true,
    align: 'right'
  },
  {
    id: 'actions',
    label: 'الإجراءات',
    sortable: false,
    align: 'center'
  }
];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200/70">
          <thead className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.id}
                  className={`px-6 py-4 text-sm font-semibold text-white uppercase tracking-wider text-${header.align}`}
                >
                  <div
                    className={`flex items-center ${
                      header.align === "right"
                        ? "justify-end"
                        : "justify-center"
                    }`}
                  >
                    {header.label}
                    {header.sortable && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4 opacity-70"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200/50">
            {accounts.map((account) => (
              <tr
                key={account.id}
                className="hover:bg-gray-50/80 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-end">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-[rgb(var(--text))]">
                        {account.name}
                      </p>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-[rgb(var(--primary)/0.2)] to-[rgb(var(--secondary)/0.2)] flex items-center justify-center">
                      <span className="text-[rgb(var(--primary))] font-medium">
                        {account.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-[rgb(var(--text)/0.8)]">
                    {account.email}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full 
                ${
                  account.role === "أستاذ"
                    ? "bg-purple-100 text-purple-800"
                    : account.role === "طالب"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
                  >
                    {account.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex items-center text-xs font-medium rounded-full 
                ${
                  account.status === "نشط"
                    ? "bg-gradient-to-r from-green-50 to-green-100 text-green-800"
                    : "bg-gradient-to-r from-red-50 to-red-100 text-red-800"
                }`}
                  >
                    {account.status === "نشط" ? (
                      <svg
                        className="mr-1 h-2 w-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    ) : (
                      <svg
                        className="mr-1 h-2 w-2 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    )}
                    {account.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => handleView(account)}
                      className="text-[rgb(var(--primary))] hover:text-[rgb(var(--primary)/0.8)] transition-colors duration-200 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      عرض
                    </button>
                    <button
                      onClick={() => handleEdit(account)}
                      className="text-[rgb(var(--accent))] hover:text-[rgb(var(--accent)/0.8)] transition-colors duration-200 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(account.id)}
                      className="text-[rgb(var(--error))] hover:text-[rgb(var(--error)/0.8)] transition-colors duration-200 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
