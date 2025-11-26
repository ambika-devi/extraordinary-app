import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";

import { GET_EMPLOYEES } from "../graphql/queries.jsx";
import { DELETE_EMPLOYEE } from "../graphql/mutations.jsx";
import Navbar from "../components/Navbar.jsx";
import EmployeeTable from "../components/EmployeeTable.jsx";
import EmployeeTile from "../components/EmployeeTile.jsx";
import EmployeeModal from "../components/EmployeeModal.jsx";
import Pagination from "../components/Pagination.jsx";

export default function Dashboard({ role }) {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, loading, error, refetch } = useQuery(GET_EMPLOYEES, {
    variables: { page, limit },
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      refetch(); // refresh data after delete
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  if (loading) return <div className="p-10 text-center text-indigo-600">Loading Data...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error.message}</div>;

  const employees = data?.getEmployees?.employees || [];
  const totalPages = data?.getEmployees?.totalPages || 1;

  const handleEdit = (emp) => {
    setSelectedEmployee(emp); // open modal for editing
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee({ variables: { id } });
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* View Toggle */}
        <div className="mb-4 flex gap-2">
          <button
            className={`px-4 py-2 rounded ${viewMode === "grid" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
            onClick={() => setViewMode("grid")}
          >
            Table View
          </button>
          <button
            className={`px-4 py-2 rounded ${viewMode === "tile" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
            onClick={() => setViewMode("tile")}
          >
            Tile View
          </button>
        </div>

        {/* Employee Data */}
        {viewMode === "grid" ? (
          <EmployeeTable
            employees={employees}
            onSelect={setSelectedEmployee}
            onEdit={handleEdit}
            onDelete={handleDelete}
            role={role}
          />
        ) : (
          <EmployeeTile
            employees={employees}
            onSelect={setSelectedEmployee}
            onEdit={handleEdit}
            onDelete={handleDelete}
            role={role}
          />
        )}

        {/* Pagination */}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

        {/* Employee Modal */}
        <EmployeeModal
          selected={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          role={role}
        />
      </div>
    </>
  );
}
