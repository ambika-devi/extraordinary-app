import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken, setRole }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { error, loading }] = useMutation(LOGIN);

  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: { username, password },
      });

      localStorage.setItem("token", data.login.token);
      localStorage.setItem("role", data.login.user.role);

      setToken?.(data.login.token);
      setRole?.(data.login.user.role);

      navigate("/dashboard");
    } catch {}
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-indigo-600 text-white px-6 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p className="text-red-600">{error.message}</p>}

      <p className="text-sm">
        Don't have an account?{" "}
        <span
          className="text-indigo-600 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}
