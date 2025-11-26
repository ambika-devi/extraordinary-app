import React from "react";
import { motion } from "framer-motion";
import { MoreVertical, Edit, Trash } from "lucide-react";

const EmployeeTile = ({ employees, onSelect, onEdit, onDelete, role }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {employees.map(emp => (
      <motion.div
        key={emp.id}
        layoutId={emp.id}
        className="bg-white p-6 rounded-xl border hover:shadow-lg transition-all cursor-pointer relative group"
      >
        {/* Top right actions */}
        {role === "ADMIN" && (
          <div className="absolute top-4 right-4 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity gap-1">
            <button
              className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100"
              onClick={(e) => { e.stopPropagation(); onEdit(emp); }}
            >
              <Edit size={16} />
            </button>
            <button
              className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100"
              onClick={(e) => { e.stopPropagation(); onDelete(emp.id); }}
            >
              <Trash size={16} />
            </button>
          </div>
        )}
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold mb-4">
          {emp.name.charAt(0)}
        </div>

        <h3 className="font-bold text-slate-800">{emp.name}</h3>
        <p className="text-xs text-slate-500 uppercase">{emp.role}</p>

        <div className="mt-4 pt-4 border-t flex justify-between text-sm">
          <span>{emp.class}</span>
          <span className="text-indigo-600 font-bold">{emp.attendance?.percentage}%</span>
        </div>
      </motion.div>
    ))}
  </div>
);

export default EmployeeTile;
