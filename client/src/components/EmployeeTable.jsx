import React from "react";
import { MoreVertical, Edit, Trash } from "lucide-react";

const EmployeeTable = ({ employees, onSelect, onEdit, onDelete, role }) => (
  <div className="bg-white rounded-xl shadow-sm border overflow-hidden overflow-x-auto">
    <table className="w-full text-left text-sm text-slate-600">
      <thead className="bg-slate-50 border-b font-semibold">
        <tr>
          <th className="p-4">Name</th>
          <th className="p-4">Role</th>
          <th className="p-4">Class</th>
          <th className="p-4">Subjects</th>
          <th className="p-4">Attendance</th>
          <th className="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr
            key={emp.id}
            className="hover:bg-indigo-50 cursor-pointer border-b last:border-0"
          >
            <td className="p-4 font-medium text-slate-900" onClick={() => onSelect(emp)}>
              {emp.name}
            </td>
            <td className="p-4">{emp.role}</td>
            <td className="p-4">{emp.class}</td>
            <td className="p-4">{emp.subjects.slice(0, 2).join(", ")}</td>
            <td className="p-4 text-green-600 font-bold">{emp.attendance?.percentage}%</td>
            {role === "ADMIN" && (

              <td className="p-4 flex gap-2">
                <button
                  className="p-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100"
                  onClick={() => onEdit(emp)}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                  onClick={() => onDelete(emp.id)}
                >
                  <Trash size={16} />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
