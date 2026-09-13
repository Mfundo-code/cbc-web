import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResourceList from "./pages/ResourceList";

// Everything under /admin/* — login plus the protected dashboard and
// per-resource management pages. Mounted directly in the top-level App.js.
function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path=":resourceKey" element={<ResourceList />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default AdminRoutes;
