import React, { useState } from 'react';
import { FiSend, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

function ComplaintModal({
    isModalOpen,
    selectedComplaint,
    handleRespose,
    handleUpdateResponse,
    handleDeleteResponse,
    handleChangeStatus,
    closeModal,
    setReplyText,
    replyText
}) {
    const [editingResponseId, setEditingResponseId] = useState(null);
    const [editText, setEditText] = useState('');

    const getStatusLabel = (status) => {
        switch (status) {
            case 'open':
                return { label: 'قيد المراجعة', color: 'text-[rgb(var(--accent))]' };
            case 'in_progress':
                return { label: 'قيد المعالجة', color: 'text-[rgb(var(--secondary))]' };
            case 'closed':
                return { label: 'مغلقة', color: 'text-[rgb(var(--error))]' };
            default:
                return { label: status, color: 'text-gray-500' };
        }
    };

    const startEditing = (res) => {
        setEditingResponseId(res.id);
        setEditText(res.response_text);
    };

    const saveEdit = (id) => {
        handleUpdateResponse(id, editText);
        setEditingResponseId(null);
        setEditText('');
    };

    return (
        <div>
            {isModalOpen && selectedComplaint && (
                <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

                        {/* Header */}
                        <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4 rounded-t-xl">
                            <h3 className="text-lg font-medium text-white">تفاصيل الشكوى</h3>
                        </div>

                        <div className="p-6">
                            {/* Complaint Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">مقدم الشكوى</h4>
                                    <p className="text-[rgb(var(--text))] font-medium">{selectedComplaint.user.full_name}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">الصفة</h4>
                                    <p className="text-[rgb(var(--text))] font-medium">{selectedComplaint.user.role}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">تاريخ الشكوى</h4>
                                    <p className="text-[rgb(var(--text))] font-medium">{new Date(selectedComplaint.created_at).toLocaleString()}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">الحالة</h4>
                                    <p className={`font-medium ${getStatusLabel(selectedComplaint.status).color}`}>
                                        {getStatusLabel(selectedComplaint.status).label}
                                    </p>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-500">عنوان الشكوى</h4>
                                <p className="text-[rgb(var(--text))] font-medium">{selectedComplaint.title}</p>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-500">نص الشكوى</h4>
                                <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-[rgb(var(--text))]">{selectedComplaint.description}</p>
                                </div>
                            </div>

                            {/* Conversation (responses) */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">المحادثة</h4>
                                <div className="space-y-4">
                                    {selectedComplaint.responses && selectedComplaint.responses.length > 0 ? (
                                        selectedComplaint.responses.map((res) => (
                                            <div
                                                key={res.id}
                                                className={`p-4 rounded-lg border text-sm ${res.is_owner
                                                        ? 'bg-blue-50 border-blue-200 text-right'
                                                        : 'bg-green-50 border-green-200 text-left'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-medium text-gray-700">{res.user.full_name}</span>
                                                    <span className="text-xs text-gray-500">{new Date(res.created_at).toLocaleString()}</span>
                                                </div>

                                                {/* Editing Mode */}
                                                {editingResponseId === res.id ? (
                                                    <div>
                                                        <textarea
                                                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                                                            rows="3"
                                                            value={editText}
                                                            onChange={(e) => setEditText(e.target.value)}
                                                        ></textarea>
                                                        <div className="flex gap-2 justify-end">
                                                            <button
                                                                onClick={() => saveEdit(res.id)}
                                                                className="px-3 py-1 bg-green-500 text-white rounded flex items-center gap-1"
                                                            >
                                                                <FiSave /> حفظ
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingResponseId(null)}
                                                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded flex items-center gap-1"
                                                            >
                                                                <FiX /> إلغاء
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <p className="text-[rgb(var(--text))]">{res.response_text}</p>
                                                        {res.is_owner && (
                                                            <div className="flex gap-2 justify-end mt-2">
                                                                <button
                                                                    onClick={() => startEditing(res)}
                                                                    className="px-3 py-1 border border-blue-500 text-blue-500 rounded flex items-center gap-1 hover:bg-blue-50"
                                                                >
                                                                    <FiEdit2 />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteResponse(res.id)}
                                                                    className="px-3 py-1 border border-red-500 text-red-500 rounded flex items-center gap-1 hover:bg-red-50"
                                                                >
                                                                    <FiTrash2 />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">لا يوجد ردود حتى الآن</p>
                                    )}
                                </div>
                            </div>

                            {/* Reply box (only if not closed) */}
                            {selectedComplaint.status !== 'closed' && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-500">إضافة رد</h4>
                                    <textarea
                                        className="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
                                        rows="3"
                                        placeholder="اكتب ردك هنا..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                    ></textarea>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    إغلاق
                                </button>
                                {selectedComplaint.status !== 'closed' && (
                                    <>
                                        <button
                                            onClick={() => { handleRespose() }}
                                            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${replyText.trim()
                                                    ? 'bg-[rgb(var(--secondary))] text-white hover:bg-[rgb(var(--secondary)/0.9)]'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                            disabled={!replyText.trim()}
                                        >
                                            <FiSend /> إرسال
                                        </button>
                                        <button
                                            onClick={() => handleChangeStatus(selectedComplaint.id, "closed")}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            إغلاق الشكوى
                                        </button>
                                    </>


                                )}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default ComplaintModal;
