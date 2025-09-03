import React, { useState, useEffect } from "react";
import DashboardLayout from "../../pages/dashboard/DashboardLayout";
import axios from "axios";
import { BASE_URL } from "../../stores/contants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import Header from "./components/Header";
import Table from "./components/Table";
import AddEditModal from "./components/Modals/AddEditModal";

function FaqCategory() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
  });

  // Fetch categories data
  useEffect(() => {
    fetchCategories();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open modal for adding new category
  const openAddModal = () => {
    setCurrentCategory(null);
    setFormData({ name: "" });
    setIsModalOpen(true);
  };

  // Open modal for editing category
  const openEditModal = (category) => {
    setCurrentCategory(category);
    setFormData({ name: category.name });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
  };

  // Submit form (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (currentCategory) {
        // Update existing category
        response = await axios.put(
          `${BASE_URL}faq-categories/${currentCategory.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Category updated successfully");
        closeModal();
      } else {
        // Add new category
        response = await axios.post(`${BASE_URL}faq-categories`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Category added successfully");
        closeModal();
      }

      // Refresh categories list
      const categoriesResponse = await axios.get(`${BASE_URL}faq-categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(categoriesResponse.data.data);

      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${BASE_URL}faq-categories/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        toast.success("Category deleted successfully");

        // Refresh categories list
        await fetchCategories();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete category"
        );
      }
    }
  };

    const fetchCategories = async () => {
    setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}faq-categories?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        setCategories(response.data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to load FAQ categories");
        setIsLoading(false);
      }
    };

  return (
    <DashboardLayout>
      <ToastContainer />

      <div className="p-4 md:p-6">
        <Header openAddModal={openAddModal}></Header>

        {isLoading ? (
          <Loader></Loader>
        ) : (
          <>
            <Table
            currentItems={currentItems}
            categories={categories}
            currentPage={currentPage}
            deleteCategory={deleteCategory}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            openEditModal={openEditModal}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            ></Table>

            {/* Add/Edit Category Modal */}
            <AddEditModal
            closeModal={closeModal}
            currentCategory={currentCategory}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isModalOpen={isModalOpen}
            ></AddEditModal>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default FaqCategory;
