import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Home, Users as UsersIcon, FileText, BarChart3 } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate(); // Hook para controlar la navegación

  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ingresos",
        data: [500, 300, 700, 200, 800],
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0"],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Función para mantener en el Dashboard sin cambiar de página
  const handleDashboardClick = () => {
    // Solo navega a la misma ruta para recargar el componente
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
        <nav className="space-y-4 flex-1">
          {/* Al hacer clic en "Dashboard", no cambia la ruta, solo recarga el componente */}
          <button onClick={handleDashboardClick} className="flex items-center gap-2 p-3 bg-blue-500 rounded-lg">
            <Home size={20} /> Dashboard
          </button>

          {/* Enlace para roles */}
          <Link to="/Roles" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded-lg">
            <FileText size={20} /> Roles
          </Link>

          {/* Enlace para Suscripciones */}
          <Link to="/suscripciones" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded-lg">
            <BarChart3 size={20} /> Suscripciones
          </Link>

          {/* Enlace para Usuarios */}
          <Link to="/usuarios" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded-lg">
            <UsersIcon size={20} /> Usuarios
          </Link>

          <Link to="/Login" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded-lg">
            <UsersIcon size={20} /> Logout
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow rounded-lg">
            <p className="text-gray-600">Total de usuarios:</p>
            <h2 className="text-xl font-bold">3</h2>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <p className="text-gray-600">Dinero generado:</p>
            <h2 className="text-xl font-bold">1500</h2>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <p className="text-gray-600">Tipo de Suscripciones:</p>
            <p>Plan Básico: 2</p>
            <p>Plan Max: 0</p>
            <p>Plan Premium: 0</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-6">Gráficas</h2>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold">Crecimiento</h3>
            <Bar data={data} options={options} />
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold">Ingresos</h3>
            <Bar data={data} options={options} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
