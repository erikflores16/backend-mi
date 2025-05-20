import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";  // Usar useLocation
import { Home, Users as UsersIcon, FileText, BarChart3 } from "lucide-react";
import DataTable from 'react-data-table-component'; // Importa DataTable

const Roles = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Erik", email: "erik@gmail.com", role: "Administrador" },
    { id: 2, name: "Jair", email: "jair@gmail.com", role: "Usuario" },
    { id: 3, name: "Carlos", email: "carlos@gmail.com", role: "Usuario" },
    { id: 4, name: "Laura", email: "laura@gmail.com", role: "Administrador" },
    { id: 5, name: "José", email: "jose@gmail.com", role: "Usuario" },
    { id: 6, name: "Ana", email: "ana@gmail.com", role: "Administrador" },
    { id: 7, name: "Luis", email: "luis@gmail.com", role: "Usuario" },
    { id: 8, name: "María", email: "maria@gmail.com", role: "Administrador" },
    { id: 9, name: "Pedro", email: "pedro@gmail.com", role: "Usuario" },
    { id: 10, name: "Sofía", email: "sofia@gmail.com", role: "Administrador" },
  ]);

  const location = useLocation();  // Usar useLocation para obtener la ruta actual

  const handleRoleChange = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, role: user.role === "Administrador" ? "Usuario" : "Administrador" }
          : user
      )
    );
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Rol',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <button
          onClick={() => handleRoleChange(row.id)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition"
        >
          Cambiar Rol
        </button>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
        <nav className="space-y-4 flex-1">
          <Link to="/Dashboard" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition">
            <Home size={22} /> <span>Dashboard</span>
          </Link>
          <Link
            to="/Roles"
            className={`flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition ${location.pathname === "/Roles" ? "bg-blue-500" : ""}`}
          >
            <FileText size={22} /> <span>Roles</span>
          </Link>
          <Link to="/suscripciones" className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition">
            <BarChart3 size={22} /> <span>Suscripciones</span>
          </Link>
          <Link
            to="/usuarios"
            className={`flex items-center gap-2 p-2 ${location.pathname === "/usuarios" ? "bg-blue-500" : ""}`}
          >
            <UsersIcon size={20} /> Usuarios
          </Link>
          <Link to="/Login" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded-lg">
            <UsersIcon size={20} /> Logout
          </Link>
        </nav>
        <div className="mt-auto text-center text-sm opacity-75">
          © {new Date().getFullYear()} Admin Panel
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Gestión de Roles</h2>

          {/* DataTable */}
          <DataTable
            columns={columns}
            data={users}
            pagination
            responsive
            highlightOnHover
            striped
            dense
          />
        </div>
      </main>
    </div>
  );
};

export default Roles;
