import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import Header from "./components/header/Header";
import AddModal from "./components/Modals/AddModal";
import Table from "./components/table/Table";
import EditModal from "./components/Modals/EditModal";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import { BASE_URL } from "../../stores/contants";

function Subjects() {
  // Sample subjects data
  const [subjects, setSubjects] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [editSubjectName, setEditSubjectName] = useState("");

  const [isLoading, setIsLoading] = useState(true);

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
      if(response.status === 200){
        console.log("response from adding subject : " , response);
        setIsAddModalOpen(false);
        await handleGetSubjects();
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding subjects : ", error);
    }
  };
  //Edit subject done
  const handleEditSubject = async (id) => {
    try {
      const response = await axios.post(
        `${BASE_URL}subjects/${id}`,
        {
          _method : "PUT",
          name: editSubjectName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(response.status === 200){
        console.log("response from editing subject : " , response);
        setIsEditModalOpen(false);
        await handleGetSubjects();
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error editing subjects : ", error);
    }
  };
  
  const handleDeleteSubject = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المادة؟")) {
      setSubjects(subjects.filter((subject) => subject.id !== id));
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
      console.error("error fetching subjects : ", subjects);
    }
  };

  useEffect(() => {
    handleGetSubjects();
  }, []);

  return (
    <DashboardLayout>
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
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Subjects;
