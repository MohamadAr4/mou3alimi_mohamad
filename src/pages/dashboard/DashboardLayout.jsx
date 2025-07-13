import React, { useState } from "react";
import Header from "../../components/dashboard/header/Header";
import Aside from "../../components/dashboard/aside/Aside";
import Footer from "../../components/footer/Footer";

const DashboardLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f6fa]" dir="rtl">
      <Header toggleDrawer={toggleDrawer} />
      <div className="flex flex-1">
        <Aside isDrawerOpen={isDrawerOpen} />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
