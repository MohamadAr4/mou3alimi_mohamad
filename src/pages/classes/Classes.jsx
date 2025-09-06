import { useState, useEffect }   from "react";
import axios                     from "axios";
import { BASE_URL }              from "../../stores/contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "../dashboard/DashboardLayout";
import Loader          from "../../components/loader/Loader";
import Header          from "./components/header/Header";
import Table           from "./components/table/Table";
import ShowModal       from "./components/Modals/ShowModal";
import AddModal        from "./components/Modals/AddModal";
import EditModal       from "./components/Modals/EditModal";
import DeleteModal     from "./components/Modals/DeleteModal";


function Classes() {
  // State for classes and subjects
  const [classes  , setClasses  ] = useState([]);
  const [subjects , setSubjects ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isViewModalOpen  , setIsViewModalOpen  ] = useState(false);
  const [isAddModalOpen   , setIsAddModalOpen   ] = useState(false);
  const [isEditModalOpen  , setIsEditModalOpen  ] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Current selected class
  const [currentClass , setCurrentClass ] = useState(null);
  const [newClassName , setNewClassName ] = useState("");
  const [editClassName, setEditClassName] = useState("");

  // Selected subjects for add/edit
  const [selectedSubjects    , setSelectedSubjects    ] = useState([]);
  const [editSelectedSubjects, setEditSelectedSubjects] = useState([]);

  // View class details
  const handleViewClass = (classItem) => {
    setCurrentClass(classItem);
    setIsViewModalOpen(true);
  };
  // Open add modal
  const openAddModal = () => {
    setNewClassName("");
    setSelectedSubjects([]);
    setIsAddModalOpen(true);
  };
  // Open edit modal
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  // Open delete modal
  const openDeleteModal = (classItem) => {
    setCurrentClass(classItem);
    setIsDeleteModalOpen(true);
  };
  // Close all modals
  const closeModal = () => {
    setIsViewModalOpen(false);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentClass(null);
  };
  // Handle subject selection
  const handleSubjectSelect = (subjectId) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };
  // Handle edit subject selection
  const handleEditSubjectSelect = (subjectId) => {
    setEditSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };
  // Add new class done
  const handleAddClass = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}school-classes`,
        {
          name: newClassName,
          subjects: selectedSubjects,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("تم إضافة الفصل بنجاح");
        await handleGetClasses();
        closeModal();
      }
    } catch (error) {
      setIsLoading(false);
      if (
        error.response.data.message.name === "The name has already been taken."
      ) {
        toast.error(error.response?.data?.message );
      } else {
        toast.error(error.response.data.message.name);
      }
    }
  };
  // Edit class Done
  const handleEditClass = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}school-classes/${currentClass.id}`,
        {
          _method: "PUT",
          name: editClassName,
          subjects: editSelectedSubjects,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("تم تعديل الفصل بنجاح");
        await handleGetClasses();
        closeModal();
      }
    } catch (error) {
      setIsLoading(false);
      if (
        error.response.data.message.name === "The name has already been taken."
      ) {
        toast.error("اسم الفصل موجود مسبقاً");
      } else {
        toast.error(e.response.data.message.name);
      }
    }
  };
  // Delete class Done
  const handleDeleteClass = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}school-classes/${currentClass.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 204) {
        toast.success("تم حذف الفصل بنجاح");
        await handleGetClasses();
        closeModal();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message );
    }
  };
  // Done
  const handleGetSubjects = async () => {
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
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message );
    }
  };
  // Done
  const handleGetClasses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}school-classes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setIsLoading(false);
        setClasses(response.data.data);
        console.log("response form getting the subjects : ", response);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.message.name);
    }
  };
  // Done
  const handleGetClassesById = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}school-classes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        console.log("response from getting class by Id : ", response);
        setCurrentClass(response.data.data);
        setEditClassName(response.data.data.name);
        setEditSelectedSubjects(response.data.data.subjects.map((s) => s.id));
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message.name);
    }
  };

  useEffect(() => {
    handleGetSubjects();
    handleGetClasses();
  }, []);
  return (
    <>
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
        <DashboardLayout>
          <div className="p-4 md:p-6">
            {/* Header */}
            <Header openAddModal={openAddModal} />

            {/* Classes Table */}
            <Table
              classes={classes}
              handleViewClass={handleViewClass}
              openDeleteModal={openDeleteModal}
              openEditModal={openEditModal}
              handleGetClassesById={handleGetClassesById}
            />

            {/* View Class Modal */}
            <ShowModal
              closeModal={closeModal}
              currentClass={currentClass}
              isViewModalOpen={isViewModalOpen}
            />

            {/* Add Class Modal */}
            <AddModal
              closeModal={closeModal}
              handleAddClass={handleAddClass}
              isAddModalOpen={isAddModalOpen}
              newClassName={newClassName}
              selectedSubjects={selectedSubjects}
              setNewClassName={setNewClassName}
              subjects={subjects}
              handleSubjectSelect={handleSubjectSelect}
            />

            {/* Edit Class Modal */}
            <EditModal
              closeModal={closeModal}
              currentClass={currentClass}
              editClassName={editClassName}
              editSelectedSubjects={editSelectedSubjects}
              handleEditClass={handleEditClass}
              handleEditSubjectSelect={handleEditSubjectSelect}
              isEditModalOpen={isEditModalOpen}
              setEditClassName={setEditClassName}
              subjects={subjects}
            />
            {/* Delete Confirmation Modal */}
            <DeleteModal
              closeModal={closeModal}
              currentClass={currentClass}
              handleDeleteClass={handleDeleteClass}
              isDeleteModalOpen={isDeleteModalOpen}
            />
          </div>
        </DashboardLayout>
      )}
    </>
  );
}

export default Classes;
