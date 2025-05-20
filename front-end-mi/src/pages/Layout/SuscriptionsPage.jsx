import React from "react";
import { Link, useLocation } from "react-router-dom";  // Usar useLocation
import { Home, Users as UsersIcon, FileText, BarChart3 } from "lucide-react";
import DataTable from 'react-data-table-component'; // Importa DataTable

const SubscriptionsPage = () => {
  const location = useLocation();  // Usar useLocation para obtener la ruta actual

  const columns = [
    {
      name: 'Usuario',
      selector: row => row.usuario,
      sortable: true,
    },
    {
      name: 'Escuela',
      selector: row => row.escuela,
      sortable: true,
    },
    {
      name: 'Planes',
      selector: row => row.planes,
      sortable: true,
    },
    {
      name: 'Precio',
      selector: row => row.precio,
      sortable: true,
    },
  ];

  const data = [
    { usuario: 'Juan Pérez', escuela: 'Universidad Nacional Autónoma de México (UNAM)', planes: 'Licenciaturas y Posgrados en diversas áreas del conocimiento.', precio: 1500 },
    { usuario: 'Ana López', escuela: 'Instituto Politécnico Nacional (IPN)', planes: 'Carreras técnicas y profesionales en ingeniería, ciencias y tecnología.', precio: 1200 },
    { usuario: 'Carlos García', escuela: 'Universidad de Guadalajara (UdeG)', planes: 'Programas de Licenciatura y Posgrado en áreas como ciencias sociales, salud y arte.', precio: 1800 },
    { usuario: 'Laura Martínez', escuela: 'Universidad Autónoma de Nuevo León (UANL)', planes: 'Oferta educativa en ciencias de la salud, ingeniería y ciencias sociales.', precio: 2000 },
    { usuario: 'José Hernández', escuela: 'Universidad del Bienestar Benito Juárez García', planes: 'Licenciaturas gratuitas en modalidad presencial y en línea, enfocadas en el desarrollo social y comunitario.', precio: 1000 },
    { usuario: 'María Rodríguez', escuela: 'Universidad Autónoma Metropolitana (UAM)', planes: 'Carreras en ciencias, ingeniería, humanidades y artes.', precio: 1700 },
    { usuario: 'Luis Martínez', escuela: 'Tecnológico de Monterrey (ITESM)', planes: 'Programas en negocios, tecnología, ingeniería y ciencias sociales.', precio: 2500 },
    { usuario: 'Patricia López', escuela: 'Universidad Autónoma de Puebla', planes: 'Oferta en ciencias sociales, ciencias exactas y arte.', precio: 1300 },
    { usuario: 'Miguel Torres', escuela: 'Universidad Veracruzana (UV)', planes: 'Carreras en arte, ciencias de la salud, y ciencias exactas.', precio: 1400 },
    { usuario: 'Carmen Pérez', escuela: 'Universidad de Sonora', planes: 'Licenciaturas y posgrados en diversas ramas académicas.', precio: 1600 },
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
            className={`flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition ${location.pathname === "/Roles" ? "bg-blue-500" : ""}`}  // Agregar condición para el enlace activo
          >
            <UsersIcon size={22} /> <span>Roles</span>
          </Link>
          <Link
            to="/suscripciones"
            className={`flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition ${location.pathname === "/suscripciones" ? "bg-blue-500" : ""}`}  // Agregar condición para el enlace activo
          >
            <FileText size={22} /> <span>Suscripciones</span>
          </Link>
          <Link
            to="/usuarios"
            className={`flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition ${location.pathname === "/usuarios" ? "bg-blue-500" : ""}`}  // Agregar condición para el enlace activo
          >
            <UsersIcon size={22} /> <span>Usuarios</span>
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
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Gestión de Suscripciones</h2>

          {/* DataTable */}
          <DataTable
            columns={columns}
            data={data}
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

export default SubscriptionsPage;
