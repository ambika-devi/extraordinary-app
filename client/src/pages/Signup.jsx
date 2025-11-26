import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { SIGNUP } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", role: "EMPLOYEE" });
  const [signup, { error, loading }] = useMutation(SIGNUP);

  const handleSignup = async () => {
    const { data } = await signup({ variables: form });

    localStorage.setItem("token", data.signup.token);
    localStorage.setItem("role", data.signup.role);

    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="border px-4 py-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border px-4 py-2 rounded"
      />
      <select
        className="border px-4 py-2 rounded"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="EMPLOYEE">Employee</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button
        onClick={handleSignup}
        className="bg-indigo-600 text-white px-6 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>

      {error && <p className="text-red-600">{error.message}</p>}

      <p className="text-sm">
        Already have an account?{" "}
        <span className="text-indigo-600 cursor-pointer" onClick={() => navigate("/")}>
          Login
        </span>
      </p>
    </div>
  );
}
