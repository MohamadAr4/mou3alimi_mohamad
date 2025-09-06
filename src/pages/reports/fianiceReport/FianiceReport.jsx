import React, { useEffect, useState } from "react";
import DashboardLayout from "../../dashboard/DashboardLayout";
import Header from "./components/header/Header";
import Cards from "./components/cards/Cards";
import Charts from "./components/charts/Charts";
import Table from "./components/table/Table";
import axios from "axios";
import { BASE_URL } from "../../../stores/contants";
import Loader from "../../../components/loader/Loader";

function FinanceReport() {
  const [financialData, setFinancialData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [totalPages, setTotalPages] = useState([]);

  const handleGetFinReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}dashboard/finance?year`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        setFinancialData(response.data.data);
        setTotal(response.data.data.total);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleGetBillsReports = async () => {
    try {
      const response = await axios.get(`${BASE_URL}dashboard/bills?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        console.log(response.data.data);
        setTransactions(response.data.data.list);
        setCurrentPage(response.data.data.current_page);
        setItemPerPage(response.data.data.per_page);
        setTotalPages(response.data.data.total_pages);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetFinReports();
  }, []);

  useEffect(() => {
    handleGetBillsReports();
  }, [currentPage])

  return (

    <>
      {loading ? <Loader></Loader> : <DashboardLayout>
        <div className="p-4 md:p-6">
          <Header />
          <Cards total={total} />
          <Charts financialData={financialData} />
          <Table
            currentPage={currentPage}
            indexOfFirstItem={indexOfFirstItem}
            setCurrentPage={setCurrentPage}
            indexOfLastItem={indexOfLastItem}
            totalPages={totalPages}
            transactions={transactions}
          ></Table>
        </div>
      </DashboardLayout>}
    </>

  );
}

export default FinanceReport;
