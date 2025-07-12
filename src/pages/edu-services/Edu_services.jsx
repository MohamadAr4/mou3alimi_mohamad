import React, { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import Table from "./components/Table";
import ServicesModal from "./components/Modals/ServicesModal";
import EditServiceModal from "./components/Modals/EditServiceModal";
import EditSubscriptionPackModal from "./components/Modals/EditSubscriptionPackModal";
import AddSubscriptionPackModal from "./components/Modals/AddSubscriptionPackModal";

function Edu_services() {
  // Sample data for educational services
  const [services, setServices] = useState([
    {
      id: 1,
      name: "الرياضيات المتقدمة",
      subscriptionPacks: [
        { id: 1, name: "الحزمة الأساسية", usageLimit: 10, price: 50 },
        { id: 2, name: "الحزمة الممتازة", usageLimit: 30, price: 120 },
      ],
    },
    {
      id: 2,
      name: "اللغة الإنجليزية",
      subscriptionPacks: [
        { id: 1, name: "الحزمة الأساسية", usageLimit: 15, price: 60 },
        { id: 2, name: "الحزمة المتميزة", usageLimit: 45, price: 150 },
      ],
    },
  ]);

  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [showEditPackModal, setShowEditPackModal] = useState(false);
  const [showAddPackModal, setShowAddPackModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [currentPack, setCurrentPack] = useState(null);

  // Form states
  const [serviceName, setServiceName] = useState("");
  const [packData, setPackData] = useState({
    name: "",
    usageLimit: "",
    price: "",
  });

  // View service details
  const handleView = (service) => {
    setCurrentService(service);
    setShowViewModal(true);
  };

  // Edit service name
  const handleEditService = (service) => {
    setCurrentService(service);
    setServiceName(service.name);
    setShowEditServiceModal(true);
  };

  // Edit subscription pack
  const handleEditPack = (pack) => {
    setCurrentPack(pack);
    setPackData({
      name: pack.name,
      usageLimit: pack.usageLimit,
      price: pack.price,
    });
    setShowEditPackModal(true);
  };

  // Add new pack
  const handleAddPack = () => {
    setPackData({
      name: "",
      usageLimit: "",
      price: "",
    });
    setShowAddPackModal(true);
  };

  // Save service name changes
  const handleSaveService = () => {
    setServices(
      services.map((service) =>
        service.id === currentService.id
          ? { ...service, name: serviceName }
          : service
      )
    );
    setShowEditServiceModal(false);
  };

  // Save pack changes
  const handleSavePack = () => {
    setServices(
      services.map((service) => {
        if (service.id === currentService.id) {
          return {
            ...service,
            subscriptionPacks: service.subscriptionPacks.map((pack) =>
              pack.id === currentPack.id ? { ...pack, ...packData } : pack
            ),
          };
        }
        return service;
      })
    );
    setShowEditPackModal(false);
  };

  // Save new pack
  const handleSaveNewPack = () => {
    const newPack = {
      id: Math.max(...currentService.subscriptionPacks.map((p) => p.id), 0) + 1,
      ...packData,
      usageLimit: Number(packData.usageLimit),
      price: Number(packData.price),
    };

    setServices(
      services.map((service) => {
        if (service.id === currentService.id) {
          return {
            ...service,
            subscriptionPacks: [...service.subscriptionPacks, newPack],
          };
        }
        return service;
      })
    );
    setShowAddPackModal(false);
  };

  return (
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
        ></Table>

        {/* View Service Modal */}
        <ServicesModal
          currentService={currentService}
          handleAddPack={handleAddPack}
          handleEditPack={handleEditPack}
          setCurrentPack={setCurrentPack}
          setShowViewModal={setShowViewModal}
          showViewModal={showViewModal}
        ></ServicesModal>

        {/* Edit Service Name Modal */}
        <EditServiceModal
          currentService={currentService}
          handleSaveService={handleSaveService}
          setServiceName={setServiceName}
          setShowEditServiceModal={setShowEditServiceModal}
          showEditServiceModal={showEditServiceModal}
          serviceName={serviceName}
        ></EditServiceModal>

        {/* Edit Subscription Pack Modal */}
        <EditSubscriptionPackModal
          currentPack={currentPack}
          handleSavePack={handleSavePack}
          packData={packData}
          setPackData={setPackData}
          setShowEditPackModal={setShowEditPackModal}
          showEditPackModal={showEditPackModal}
        ></EditSubscriptionPackModal>

        {/* Add New Pack Modal */}
        <AddSubscriptionPackModal
          handleSaveNewPack={handleSaveNewPack}
          packData={packData}
          setPackData={setPackData}
          setShowAddPackModal={setShowAddPackModal}
          showAddPackModal={showAddPackModal}
        ></AddSubscriptionPackModal>
      </div>
    </DashboardLayout>
  );
}

export default Edu_services;
