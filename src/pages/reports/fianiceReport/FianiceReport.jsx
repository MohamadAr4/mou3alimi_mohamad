import React from "react";
import DashboardLayout from "../../dashboard/DashboardLayout";
import Header from "./components/header/Header";
import Cards from "./components/cards/Cards";
import Charts from "./components/charts/Charts";
import Table from "./components/table/Table";

const financialData = [
  { month: "يناير", income: 4000, expenses: 2400 },
  { month: "فبراير", income: 3000, expenses: 1398 },
  { month: "مارس", income: 2000, expenses: 9800 },
  { month: "أبريل", income: 2780, expenses: 3908 },
  { month: "مايو", income: 1890, expenses: 4800 },
  { month: "يونيو", income: 2390, expenses: 3800 },
  { month: "يوليو", income: 3490, expenses: 4300 },
];

const transactions = [
  {
    id: 1,
    date: "2023-05-01",
    description: "اشتراكات الطلاب",
    amount: 15000,
    type: "دخل",
  },
  {
    id: 4,
    date: "2023-05-04",
    description: "دورة جديدة",
    amount: 5000,
    type: "دخل",
  },
  {
    id: 6,
    date: "2023-05-06",
    description: "اشتراكات الطلاب",
    amount: 9000,
    type: "دخل",
  },
];

function FinanceReport() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <Header />

        {/* Stats Cards */}
        <Cards />

        {/* Charts */}
        <Charts financialData={financialData} />

        {/* Transactions Table with Gradient Header */}
        <Table
          currentItems={currentItems}
          currentPage={currentPage}
          indexOfFirstItem={indexOfFirstItem}
          setCurrentPage={setCurrentPage}
          indexOfLastItem={indexOfLastItem}
          totalPages={totalPages}
          transactions = {transactions}
        ></Table>
      </div>
    </DashboardLayout>
  );
}

export default FinanceReport;
