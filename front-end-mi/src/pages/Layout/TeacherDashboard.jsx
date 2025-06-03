import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Edit,
  Trash2,
  PlusCircle,
  Check,
  X,
} from "lucide-react";
import axios from "axios";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [carreras, setCarreras] = useState([]);
  const [planEstudio, setPlanEstudio] = useState({
    carrera: "Ingeniería en Sistemas",
    contenido: "Este es el plan de estudio para la carrera de Ingeniería en Sistemas.",
    pdf: null,
  });
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/careers");
        setCarreras(response.data);
      } catch (error) {
        console.error("Error al obtener las carreras:", error);
      }
    };

    const fetchSubscriptionPlans = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/study-plans");
        setSubscriptionPlans(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error al obtener los planes de suscripción:", error);
      }
    };

    fetchCarreras();
    fetchSubscriptionPlans();
  }, []);

  const handleDeleteCarrera = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/careers/${id}`);
      setCarreras(carreras.filter((carrera) => carrera.id !== id));
    } catch (error) {
      console.error("Error al eliminar la carrera:", error);
      alert("No se pudo eliminar la carrera");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.type === "application/pdf") {
      setPlanEstudio({ ...planEstudio, pdf: file });
    } else {
      alert("Por favor, selecciona un archivo PDF.");
    }
  };

  const handleSelectPlan = (plan) => {
    navigate("/teacher-dashboard-payment", { state: { planId: plan.id } });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white p-6 flex flex-col shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Panel de Maestros</h1>
        <nav className="space-y-4 flex-1">
          <Link to="/teacher-dashboard" className="flex items-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            <Home size={20} /> Dashboard
          </Link>
          <Link to="/Login" className="flex items-center gap-2 p-3 hover:bg-gray-800 rounded-lg transition">
            Cerrar Sesión
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Gestión de Carreras y Planes de Estudio
        </h2>

        {/* Carreras */}
        <section>
          <h3 className="text-2xl font-semibold mb-4">Carreras</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carreras.length > 0 ? (
              carreras.map((carrera) => (
                <div key={carrera.id} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
                  <h4 className="text-lg font-semibold text-gray-800">{carrera.name}</h4>
                  <p className="text-gray-600 text-sm">Duración: {carrera.duration}</p>
                  <p className="text-gray-600 text-sm">Materias: {carrera.subjects}</p>
                  <div className="flex gap-4 mt-4">
                    <button className="text-blue-600 hover:underline flex items-center gap-1">
                      <Edit size={16} /> Editar
                    </button>
                    <button onClick={() => handleDeleteCarrera(carrera.id)} className="text-red-600 hover:underline flex items-center gap-1">
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Cargando...</p>
            )}
          </div>
          <button
            onClick={() => navigate("/career-catalog")}
            className="mt-6 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition"
          >
            <PlusCircle size={20} /> Agregar Nueva Carrera
          </button>
        </section>

        {/* Plan de estudio */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Plan de Estudio</h3>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-lg font-bold text-gray-800">{planEstudio.carrera}</h4>
            <p className="text-gray-700 mt-2">{planEstudio.contenido}</p>
            {planEstudio.pdf && (
              <div className="mt-4">
                <span className="font-medium text-gray-700">Documento PDF: </span>
                <a href={URL.createObjectURL(planEstudio.pdf)} download className="text-blue-600 hover:underline ml-2">
                  Descargar PDF
                </a>
              </div>
            )}
            <div className="mt-6">
              <label htmlFor="pdf-upload" className="block text-blue-600 font-medium cursor-pointer">
                Subir nuevo PDF
              </label>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="mt-2 w-full p-2 border rounded-lg text-sm"
              />
            </div>
          </div>
        </section>

        {/* Planes de suscripción */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Planes de Suscripción</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.length > 0 ? (
              subscriptionPlans.map((plan, index) => (
                <div key={index} className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                  <h5 className="text-xl font-semibold text-gray-700">{plan.nombre}</h5>
                  <div className="mt-4 text-gray-900 text-4xl font-extrabold">
                    ${plan.precio}
                    <span className="text-sm text-gray-500 font-medium"> /mes</span>
                  </div>
                  <p className="mt-4 text-gray-600 text-sm">{plan.descripcion}</p>
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
                  >
                    Elegir plan
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Cargando planes de suscripción...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
  