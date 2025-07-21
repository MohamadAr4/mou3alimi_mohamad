import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import Header from "./components/header/Header";
import AddModal from "./components/Modals/AddModal";
import Table from "./components/table/Table";
import EditModal from "./components/Modals/EditModal";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import { BASE_URL } from "../../stores/contants";
import DeleteConfirmationModal from "../../components/DeleteModal/DeleteConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Subjects() {
  // Sample subjects data
  const [subjects       , setSubjects       ] = useState([]);
  const [isLoading      , setIsLoading      ] = useState(true);
  const [isAddModalOpen , setIsAddModalOpen ] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSubject , setCurrentSubject ] = useState(null);
  const [newSubjectName , setNewSubjectName ] = useState("");
  const [editSubjectName, setEditSubjectName] = useState("");

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    name: "",
  });

  const handleDeleteClick = (id, name) => {
    setDeleteModal({
      isOpen: true,
      id: id,
      name: name,
    });
  };

  const openAddModal = () => {
    setNewSubjectName("");
    setIsAddModalOpen(true);
  };

  const openEditModal = (subject) => {
    setCurrentSubject(subject);
    setEditSubjectName(subject.name);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };
  //Add subject done
  const handleAddSubject = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}subjects`,
        {
          name: newSubjectName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        //console.log("response from adding subject : ", response);
        toast.success("تمت اضافة المادة بنجاح");
        setIsAddModalOpen(false);
        await handleGetSubjects();
      }
    } catch (error) {
      setIsLoading(false);
      if (
        error.response.data.message.name === "The name has already been taken."
      ) {
        toast.error("اسم المادة التعليمية موجود مسبقاً");
      } else {
        toast.error(e.response.data.message.name);
      }
      console.error("Error adding subjects : ", error);
    }
  };
  //Edit subject done
  const handleEditSubject = async (id) => {
    try {
      const response = await axios.post(
        `${BASE_URL}subjects/${id}`,
        {
          _method: "PUT",
          name: editSubjectName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        //console.log("response from editing subject : ", response);
        toast.success("تمت تعديل المادة بنجاح");
        setIsEditModalOpen(false);
        await handleGetSubjects();
      }
    } catch (error) {
      setIsLoading(false);
      if (
        error.response.data.message.name === "The name has already been taken."
      ) {
        toast.error("اسم المادة التعليمية موجود مسبقاً");
      } else {
        toast.error(error.response.data.message.name);
      }
      console.error("Error editing subjects : ", error);
    }
  };
  //Delete is Done
  const handleDeleteSubject = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL}subjects/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 204) {
        setIsLoading(false);
        toast.success("تم حذف المادة بنجاح");
        setDeleteModal({
          isOpen: false,
          id: null,
          name: "",
        });
        await handleGetSubjects();
        //console.log("response form deleting the subjects : ", response);
      }
    } catch (e) {
      toast.error(e.response.data.message.name);
      console.error("error deleting subjects : ", subjects);
    }
  };
  //Get is done
  const handleGetSubjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}subjects`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setIsLoading(false);
        setSubjects(response.data.data);
        console.log("response form getting the subjects : ", response);
      }
    } catch (e) {
      toast.error(e.response.data.message.name);
      console.error("error fetching subjects : ", subjects);
    }
  };

  useEffect(() => {
    handleGetSubjects();
  }, []);

  return (
    <DashboardLayout>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="p-4 md:p-6">
            {/* Header */}
            <Header openAddModal={openAddModal} />
            {/* Subjects Table */}
            <Table
              handleDeleteSubject={handleDeleteSubject}
              openEditModal={openEditModal}
              handleDeleteClick={handleDeleteClick}
              subjects={subjects}
            />
            {/* Add Subject Modal */}
            <AddModal
              closeModal={closeModal}
              handleAddSubject={handleAddSubject}
              isAddModalOpen={isAddModalOpen}
              newSubjectName={newSubjectName}
              setNewSubjectName={setNewSubjectName}
            />
            {/* Edit Subject Modal */}
            <EditModal
              closeModal={closeModal}
              currentSubject={currentSubject}
              editSubjectName={editSubjectName}
              handleEditSubject={handleEditSubject}
              isEditModalOpen={isEditModalOpen}
              setEditSubjectName={setEditSubjectName}
            />
            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
              deleteModal={deleteModal}
              isOpen={deleteModal.isOpen}
              onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
              onConfirm={handleDeleteSubject}
              itemName={deleteModal.name}
            />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Subjects;
