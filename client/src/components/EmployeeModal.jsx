import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Edit, Trash } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { DELETE_EMPLOYEE } from "../graphql/mutations";
import { GET_EMPLOYEES } from "../graphql/queries";

const EmployeeModal = ({ selected, onClose, role }) => {
  // Make sure selected exists
  if (!selected) return null;

  // Hook mutation
  const [deleteEmployee, { loading }] = useMutation(DELETE_EMPLOYEE, {
    variables: { id: selected.id || selected._id }, // ensure correct id
    onCompleted: () => onClose(),
    refetchQueries: [{ query: GET_EMPLOYEES, variables: { page: 1 } }],
    awaitRefetchQueries: true,
  });

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          layoutId={selected.id || selected._id}
          className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-indigo-600 p-6 text-white flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{selected.name}</h2>
              <p className="opacity-80">{selected.role}</p>
            </div>
            <button onClick={onClose} className="bg-white/20 p-1 rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* Employee Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Class</label>
                <p>{selected.class}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Age</label>
                <p>{selected.age}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Subjects</label>
                <p>{selected.subjects.join(", ")}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Phone</label>
                <p>{selected.phone}</p>
              </div>
            </div>

            {/* Admin Actions */}
            {role === "ADMIN" && (
              <div className="flex gap-2 pt-4 border-t mt-4">
                <button className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center gap-2">
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => deleteEmployee()}
                  disabled={loading}
                  className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Trash size={16} /> {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EmployeeModal;
