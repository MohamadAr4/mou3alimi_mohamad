import React, { useEffect, useState } from 'react';
import DashboardLayout from '../dashboard/DashboardLayout';
import Header from "./components/header/Header.jsx";
import Table from "./components/table/Table.jsx";
import ComplaintModal from "./components/Modal/ComplaintModal.jsx";
import axios from 'axios';
import { BASE_URL } from '../../stores/contants.js';
import Loader from '../../components/loader/Loader.jsx';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TechSupport = () => {
    // Sample complaints data
    const [complaints, setComplaints] = useState([]);

    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemPerPage] = useState(5);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [totalPages, setToatalPages] = useState(1);
    const [loading, setIsLoading] = useState(true);

    const openModal = (complaint) => {
        handleGetTicketsById(complaint)

    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedComplaint(null);
    };

    const handleReject = () => {
        setComplaints(complaints.map(c =>
            c.id === selectedComplaint.id ? { ...c, status: 'rejected' } : c
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

    const handleGetTickets = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}technical-support-tickets`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data.data)
            if (response.status === 200) {
                setComplaints(response.data.data.list);
                setItemPerPage(response.data.data.per_page);
                setCurrentPage(response.data.data.current_page);
                setToatalPages(response.data.data.total_pages);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleGetTicketsById = async (complaint) => {
        try {
            const response = await axios.get(`${BASE_URL}technical-support-tickets/${complaint.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                console.log("getById", response);
                setSelectedComplaint(response.data.data);
                setIsModalOpen(true);
                setReplyText('');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteTicket = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}technical-support-tickets/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 204) {
                toast.success("تم حذف الشكوى بنجاح")
                await handleGetTickets();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message );
        }
    }

    const handleRespose = async () => {
        try {
            const response = await axios.post(`${BASE_URL}technical-support-tickets/${selectedComplaint.id}/ticket-responses`, { response_text: replyText }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            if (response.status === 200) {
                handleGetTickets();
                closeModal();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message );
        }
    }
    const handleUpdateResponse = async (id, newText) => {
        try {
            const res = await axios.put(`${BASE_URL}ticket-responses/${id}`, {
                response_text: newText,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.status === 200) {
                setSelectedComplaint((prev) => ({
                    ...prev,
                    responses: prev.responses.map((r) =>
                        r.id === id
                            ? { ...r, response_text: newText, updated_at: new Date().toISOString() }
                            : r
                    ),
                }));
            } else {
                console.error("Error updating response:", res.data.message);
            }
        } catch (err) {
            console.error("Update failed:", err);
            toast.error(error.response?.data?.message );
        }
    };

    // Delete response
    const handleDeleteResponse = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}ticket-responses/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.status === 204) {
                setSelectedComplaint((prev) => ({
                    ...prev,
                    responses: prev.responses.filter((r) => r.id !== id),
                }));
            } else {
                console.error("Error deleting response:", res.data.message);
            }
        } catch (err) {
            console.error("Delete failed:", err);
            toast.error(error.response?.data?.message );
        }
    };
    const handleChangeStatus = async (id, newStatus) => {
        try {
            const res = await axios.patch(`${BASE_URL}technical-support-tickets/${id}/${newStatus}`, [], {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.status === 204) {
                setSelectedComplaint((prev) => ({
                    ...prev,
                    status: newStatus,
                }));
            } else {
                console.error("Error changing status:", res.data.message);
            }
        } catch (err) {
            console.error("Status update failed:", err);
            toast.error(error.response?.data?.message );
        }
    };

    useEffect(() => {
        handleGetTickets();
    }, [])

    return (
        <>
            <ToastContainer></ToastContainer>
            {loading ? <Loader></Loader> : <DashboardLayout>
                <div className="p-4 md:p-6">
                    {/* Header */}
                    <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    {/* Complaints Table */}
                    <Table
                        openModal={openModal}
                        currentItems={complaints}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        filteredComplaints={complaints}
                        indexOfFirstItem={indexOfFirstItem}
                        indexOfLastItem={indexOfLastItem}
                        handleDelete={handleDeleteTicket}
                        totalPages={totalPages} />

                    {/* Complaint Modal */}
                    <ComplaintModal
                        closeModal={closeModal}
                        isModalOpen={isModalOpen}
                        handleRespose={handleRespose}
                        handleAccept={handleAccept}
                        handleDeleteResponse={handleDeleteResponse}
                        handleUpdateResponse={handleUpdateResponse}
                        handleChangeStatus={handleChangeStatus}
                        handleReject={handleReject}
                        replyText={replyText}
                        selectedComplaint={selectedComplaint}
                        setReplyText={setReplyText} />
                </div>
            </DashboardLayout>}
        </>

    );
};

export default TechSupport;