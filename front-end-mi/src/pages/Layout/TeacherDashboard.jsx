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
  const [carreras, setCarreras] = useState([]); // Cambié la inicialización a un array vacío
  const [planEstudio, setPlanEstudio] = useState({
    carrera: "Ingeniería en Sistemas",
    contenido:
      "Este es el plan de estudio para la carrera de Ingeniería en Sistemas.",
    pdf: null,
  });
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    // Obtener las carreras desde la API
    const fetchCarreras = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/careers");
        console.log("Carreras obtenidas:", response.data);
        setCarreras(response.data);
      } catch (error) {
        console.error("Error al obtener las carreras:", error);
        setCarreras([]);
      }
    };

    fetchCarreras();

    // Obtener los planes de estudio
    const fetchSubscriptionPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/study-plans"
        );
        console.log("Planes de suscripción obtenidos:", response.data);

        if (Array.isArray(response.data)) {
          setSubscriptionPlans(response.data);
        } else {
          setSubscriptionPlans([]);
        }
      } catch (error) {
        console.error("Error al obtener los planes de suscripción:", error);
        setSubscriptionPlans([]);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  const handleDeleteCarrera = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/careers/${id}`);
      // Actualizar el estado local después de eliminar
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
      <aside className="w-72 bg-gray-900 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Panel de Maestros
        </h1>
        <nav className="space-y-4 flex-1">
          <Link
            to="/teacher-dashboard"
            className="flex items-center gap-2 p-3 bg-blue-500 rounded-lg"
          >
            <Home size={20} /> Dashboard
          </Link>
          <Link
            to="/Login"
            className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded-lg"
          >
            Cerrar Sesión
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold">
          Gestión de Carreras y Planes de Estudio
        </h2>
        <div className="mt-8">
          <h3 className="text-xl font-bold">Carreras</h3>
          <div className="flex gap-4 mt-4">
            {carreras.length > 0 ? (
              carreras.map((carrera) => (
                <div
                  key={carrera.id}
                  className="bg-white p-4 shadow rounded-lg w-full"
                >
                  <h4 className="text-lg font-bold">{carrera.name}</h4>
                  <p>Duración: {carrera.duration}</p>
                  <p>Materias: {carrera.subjects}</p>
                  <div className="flex gap-3 mt-2">
                    <button className="text-blue-500 flex items-center gap-1">
                      <Edit size={16} /> Editar
                    </button>
                    <button
                      onClick={() => handleDeleteCarrera(carrera.id)}
                      className="text-red-500 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>cargando..</p>
            )}
          </div>
          <button
            onClick={() => navigate("/career-catalog")}
            className="mt-6 p-3 bg-green-500 text-white rounded-lg flex items-center gap-2"
          >
            <PlusCircle size={20} /> Agregar Nueva Carrera
          </button>
        </div>

        {/* Sección de Planes de Estudio */}
        <div className="mt-8">
          <h3 className="text-xl font-bold">Plan de Estudio</h3>
          <div className="bg-white p-4 shadow rounded-lg mt-4">
            <h4 className="text-lg font-bold">{planEstudio.carrera}</h4>
            <p>{planEstudio.contenido}</p>
            {planEstudio.pdf && (
              <div className="mt-4">
                <h5 className="font-bold">Documento PDF:</h5>
                <a
                  href={URL.createObjectURL(planEstudio.pdf)}
                  download
                  className="text-blue-500"
                >
                  Descargar PDF
                </a>
              </div>
            )}
            <div className="mt-4">
              <label
                htmlFor="pdf-upload"
                className="block text-blue-500 cursor-pointer"
              >
                Subir Plan de Estudio (PDF)
              </label>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="mt-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold">Planes de Suscripción</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.length > 0 ? (
              subscriptionPlans.map((plan, index) => (
                <div
                  key={index}
                  className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <h5 className="mb-4 text-xl font-medium text-gray-500">
                    {plan.nombre}
                  </h5>
                  <div className="flex items-baseline text-gray-900">
                    <span className="text-3xl font-semibold">$</span>
                    <span className="text-5xl font-extrabold tracking-tight">
                      {plan.precio}
                    </span>
                    <span className="ms-1 text-xl font-normal text-gray-500">
                      /mes
                    </span>
                  </div>
                  <ul className="space-y-4 my-7">{plan.descripcion}</ul>
                  <button
                    className="text-white font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Elegir plan
                  </button>
                </div>
              ))
            ) : (
              <p>Cargando planes de suscripción...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
