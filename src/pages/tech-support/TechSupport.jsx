import React, {useState} from 'react';
import DashboardLayout from '../dashboard/DashboardLayout';

import Header from "./components/header/Header.jsx";
import Table from "./components/table/Table.jsx";
import ComplaintModal from "./components/Modal/ComplaintModal.jsx";

const TechSupport = () => {
    // Sample complaints data
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            complainant: 'أحمد محمد',
            role: 'طالب',
            date: '2023-05-15',
            subject: 'مشكلة في الدفع',
            message: 'لا يمكنني إتمام عملية الدفع للدورة الجديدة، يظهر خطأ عند إدخال بيانات البطاقة',
            status: 'pending'
        },
        {
            id: 2,
            complainant: 'سارة عبدالله',
            role: 'مدرسة',
            date: '2023-05-14',
            subject: 'تعليق على الدورة',
            message: 'أريد إضافة محتوى جديد للدورة الحالية، كيف يمكنني فعل ذلك؟',
            status: 'pending'
        },
        {
            id: 3,
            complainant: 'خالد علي',
            role: 'ولي أمر',
            date: '2023-05-13',
            subject: 'استفسار عن التقرير',
            message: 'كيف يمكنني الحصول على تقرير عن تقدم ابني في الدورة؟',
            status: 'resolved'
        },
    ]);

    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter complaints based on search term
    const filteredComplaints = complaints.filter(complaint =>
        complaint.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

    const openModal = (complaint) => {
        setSelectedComplaint(complaint);
        setIsModalOpen(true);
        setReplyText('');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedComplaint(null);
    };

    const handleReject = () => {
        setComplaints(complaints.map(c =>
            c.id === selectedComplaint.id ? {...c, status: 'rejected'} : c
        ));
        closeModal();
    };

    const handleAccept = () => {
        if (!replyText.trim()) return;

        setComplaints(complaints.map(c =>
            c.id === selectedComplaint.id ? {
                ...c,
                status: 'resolved',
                reply: replyText,
                replyDate: new Date().toISOString().split('T')[0]
            } : c
        ));
        closeModal();
    };

    return (
        <DashboardLayout>
            <div className="p-4 md:p-6">
                {/* Header */}
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                {/* Complaints Table */}
                <Table
                    openModal={openModal}
                    currentItems={currentItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    filteredComplaints={filteredComplaints}
                    indexOfFirstItem={indexOfFirstItem}
                    indexOfLastItem={indexOfLastItem}
                    totalPages={totalPages}/>

                {/* Complaint Modal */}
                <ComplaintModal
                    closeModal={closeModal}
                    isModalOpen={isModalOpen}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                    replyText={replyText}
                    selectedComplaint={selectedComplaint}
                    setReplyText={setReplyText}/>
            </div>
        </DashboardLayout>
    );
};

export default TechSupport;