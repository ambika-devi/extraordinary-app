import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ currentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    { name: "Dashboard", href: "#dashboard" },
    {
      name: "Employees",
    },
  ];

  const handleMenuClick = (item) => {
    if (item.sub) {
      setActiveMenu(activeMenu === item.name ? null : item.name);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          WorkHive
        </h1>
        <p className="text-xs text-gray-400 mt-1">Employee Management Dashboard</p>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-slate-600 font-medium items-center">
        {menuItems.map((item) => {
          // Hide Dashboard if current page is Dashboard
          if (item.name === "Dashboard" && currentPage === "Dashboard") return null;
          // Hide Employees submenu if current page is Employees
          if (item.name === "Employees" && currentPage === "Employees") {
            return <a key={item.name} href="#" className="hover:text-indigo-600 cursor-pointer">Employees</a>;
          }

          return (
            <div key={item.name} className="relative group">
              <button
                onClick={() => handleMenuClick(item)}
                className="flex items-center gap-1 hover:text-indigo-600 transition"
              >
                {item.name} {item.sub && <ChevronDown size={16} />}
              </button>
              {item.sub && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.sub.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm hover:bg-indigo-50"
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-slate-600"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-2xl z-50 p-6 flex flex-col gap-4 md:hidden"
          >
            {menuItems.map((item) => {
              if (item.name === "Dashboard" && currentPage === "Dashboard") return null;
              return (
                <div key={item.name}>
                  <button
                    onClick={() => handleMenuClick(item)}
                    className="flex justify-between w-full text-left text-slate-600 py-2 border-b hover:text-indigo-600"
                  >
                    {item.name}
                  </button>
                  {item.sub && activeMenu === item.name && (
                    <div className="pl-4 flex flex-col gap-1 mt-1">
                      {item.sub.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="text-sm text-slate-400 hover:text-indigo-600"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
