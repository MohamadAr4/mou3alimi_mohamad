import React, { useState, useEffect } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import Table from "./components/Table";
import ServicesModal from "./components/Modals/ServicesModal";
import EditServiceModal from "./components/Modals/EditServiceModal";
import EditSubscriptionPackModal from "./components/Modals/EditSubscriptionPackModal";
import AddSubscriptionPackModal from "./components/Modals/AddSubscriptionPackModal";
import Loader from "../../components/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../../stores/contants";
import DeleteConfirmationModal from "./components/Modals/DeleteConfirmationModal";

function Edu_services() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [showEditPackModal, setShowEditPackModal] = useState(false);
  const [showAddPackModal, setShowAddPackModal] = useState(false);

  // Current selected items
  const [currentService, setCurrentService] = useState(null);
  const [currentPack, setCurrentPack] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packToDelete, setPackToDelete] = useState(null);

  const handleDeleteClick = (pack) => {
    setPackToDelete(pack);
    setShowDeleteModal(true);
  };


  // Form states
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: 1,
    free_number: 0,
  });

  const [packData, setPackData] = useState({
    name: "",
    number: "",
    price: "",
  });

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}educational-services`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setServices(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch services");
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // View service details
  const handleView = (service) => {
    setCurrentService(service);
    setShowViewModal(true);
  };

  // Edit service
  const handleEditService = (service) => {
    setCurrentService(service);
    setFormData({
      name: service.name,
      description: service.description,
      is_active: service.is_active,
      free_number: service.free_number,
    });
    setShowEditServiceModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "is_active" || name === "free_number"
          ? parseInt(value)
          : value,
    }));
  };

  // Save service changes
  const handleSaveService = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}educational-services/${currentService.id}`,
        {
          ...formData,
          _method: "PUT",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Service updated successfully");
        await fetchServices();
        setShowEditServiceModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update service");
      console.error("Error updating service:", error);
    }
  };

  // Edit subscription pack
  const handleEditPack = (pack) => {
    setCurrentPack(pack);
    setPackData({
      name: pack.name,
      number: pack.number,
      price: pack.price,
    });
    setShowEditPackModal(true);
  };

  // Add new pack
  const handleAddPack = () => {
    setPackData({
      name: "",
      number: "",
      price: "",
    });
    setShowAddPackModal(true);
  };

  // Save pack changes
  const handleSavePack = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}educational-services/packages/${currentPack.id}`,
        {
          ...packData,
          _method: "PUT",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        await fetchServices();
        setShowViewModal(false);
        setShowEditPackModal(false);
        toast.success("تم تعديل الحزمة بنجاح");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update pack");
    }
  };

  // Save new pack
  const handleSaveNewPack = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}educational-services/${currentService.id}/packages`,
        {
          name: packData.name,
          price: packData.price,
          number: packData.number,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        await fetchServices();
        toast.success("تمت اضافة الحزمة بنجاح");
        setShowAddPackModal(false);
        setShowViewModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message.name || "Failed to add pack");
    }
  };
  //Delete pack is Done
  const handleDeletePack = async () => {
    try {
      const respone = await axios.delete(
        `${BASE_URL}educational-services/packages/${packToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("respoonse form deleting pack" , respone)
      if (respone.status === 204) {
        await fetchServices();
        toast.success("تم حذف الحزمة بنجاح");
        setShowDeleteModal(false);
        setShowViewModal(false);
      }
    } catch (error) {
      console.error("error deleteing pack", error);
      toast.error(error.response.data.message.name);
    }
  };

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
        <Loader />
      ) : (
        <DashboardLayout>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-[rgb(var(--text))]">
                الخدمات التعليمية
              </h1>
            </div>

            {/* Services Table */}
            <Table
              handleEditService={handleEditService}
              handleView={handleView}
              services={services}
            />

            {/* View Service Modal */}
            <ServicesModal
              currentService={currentService}
              handleAddPack={handleAddPack}
              handleEditPack={handleEditPack}
              setCurrentPack={setCurrentPack}
              setShowViewModal={setShowViewModal}
              showViewModal={showViewModal}
              handleDeleteClick = {handleDeleteClick}
            />

            {/* Edit Service Modal */}
            <EditServiceModal
              currentService={currentService}
              handleSaveService={handleSaveService}
              setShowEditServiceModal={setShowEditServiceModal}
              showEditServiceModal={showEditServiceModal}
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Edit Subscription Pack Modal */}
            <EditSubscriptionPackModal
              currentPack={currentPack}
              handleSavePack={handleSavePack}
              packData={packData}
              setPackData={setPackData}
              setShowEditPackModal={setShowEditPackModal}
              showEditPackModal={showEditPackModal}
            />

            {/* Add New Pack Modal */}
            <AddSubscriptionPackModal
              handleSaveNewPack={handleSaveNewPack}
              packData={packData}
              setPackData={setPackData}
              setShowAddPackModal={setShowAddPackModal}
              showAddPackModal={showAddPackModal}
            />

            <DeleteConfirmationModal 
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={()=> handleDeletePack()}
            />
          </div>
        </DashboardLayout>
      )}
    </>
  );
}

export default Edu_services;
