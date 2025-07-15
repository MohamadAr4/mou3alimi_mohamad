import React from 'react';
import {FiCheck, FiX} from 'react-icons/fi';
function ComplaintModal({isModalOpen , selectedComplaint , handleAccept ,handleReject,closeModal ,setReplyText ,replyText}) {
    return (
        <div>
            {isModalOpen && selectedComplaint && (
                <div
                    className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div
                            className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4 rounded-t-xl">
                            <h3 className="text-lg font-medium text-white">تفاصيل الشكوى</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">مقدم الشكوى</h4>
                                    <p className="text-[rgb(var(--text))] font-medium">{selectedComplaint.complainant}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">الصفة</h4>
                                    <p className="text-[rgb(var(--text))] font-medium">{selectedComplaint.role}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">تاريخ الشكوى</h4>
                                    <p className="text-[rgb(var(--text))] font-medium">{selectedComplaint.date}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">الحالة</h4>
                                    <p className={`font-medium ${
                                        selectedComplaint.status === 'pending' ? 'text-[rgb(var(--accent))]' :
                                            selectedComplaint.status === 'resolved' ? 'text-[rgb(var(--secondary))]' :
                                                'text-[rgb(var(--error))]'
                                    }`}>
                                        {selectedComplaint.status === 'pending' ? 'قيد المراجعة' :
                                            selectedComplaint.status === 'resolved' ? 'تم الحل' : 'مرفوض'}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-500">الموضوع</h4>
                                <p className="text-[rgb(var(--text))] font-medium">{selectedComplaint.subject}</p>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-500">نص الشكوى</h4>
                                <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-[rgb(var(--text))]">{selectedComplaint.message}</p>
                                </div>
                            </div>

                            {selectedComplaint.status === 'resolved' && selectedComplaint.reply && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-500">رد الدعم الفني</h4>
                                    <div className="mt-2 p-4 bg-green-50 rounded-lg border border-green-200">
                                        <p className="text-[rgb(var(--text))]">{selectedComplaint.reply}</p>
                                        {selectedComplaint.replyDate && (
                                            <p className="text-xs text-gray-500 mt-2">تم الرد
                                                في: {selectedComplaint.replyDate}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {selectedComplaint.status === 'pending' && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-500">الرد</h4>
                                    <textarea
                                        className="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
                                        rows="4"
                                        placeholder="اكتب ردك هنا..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                    ></textarea>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    إغلاق
                                </button>
                                {selectedComplaint.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={handleReject}
                                            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 flex items-center gap-2"
                                        >
                                            <FiX/> رفض
                                        </button>
                                        <button
                                            onClick={handleAccept}
                                            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                                                replyText.trim()
                                                    ? 'bg-[rgb(var(--secondary))] text-white hover:bg-[rgb(var(--secondary)/0.9)]'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                            disabled={!replyText.trim()}
                                        >
                                            <FiCheck/> قبول وإرسال
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