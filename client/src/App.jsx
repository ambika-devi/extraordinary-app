import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apollo/client";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          {/* Public Routes */}
          {!token && (
            <>
              <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}

          {/* Protected Routes */}
          {token && (
            <>
              <Route path="/dashboard" element={<Dashboard role={role} />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
