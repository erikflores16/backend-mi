import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Home, Plus, Edit, Trash2 } from "lucide-react";

const API_URL = "http://localhost:8000/api/careers";

const CareerCatalog = () => {
  const [careers, setCareers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCareer, setCurrentCareer] = useState({
    id: null,
    name: "",
    duration: "",
    subjects: "",
    url: "",
    study_plan: null,
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await axios.get(API_URL);
      setCareers(response.data);
    } catch (error) {
      console.error("Error al obtener carreras", error);
    }
  };

  const handleAdd = () => {
    setCurrentCareer({
      id: null,
      name: "",
      duration: "",
      subjects: "",
      url: "",
      study_plan: null,
    });
    setModalOpen(true);
  };

  const handleEdit = (career) => {
    setCurrentCareer(career);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCareers(careers.filter((career) => career.id !== id));
    } catch (error) {
      console.error("Error al eliminar la carrera", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación previa para asegurarse de que los campos no estén vacíos
    if (
      !currentCareer.name ||
      !currentCareer.duration ||
      !currentCareer.subjects
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("name", currentCareer.name);
    formData.append("duration", currentCareer.duration);
    formData.append("subjects", currentCareer.subjects);
    formData.append("url", currentCareer.url);

    if (currentCareer.study_plan instanceof File) {
      formData.append("study_plan", currentCareer.study_plan);
    }

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (currentCareer.id) {
        // Si ya existe un ID, es una actualización
        setCareers(
          careers.map((career) =>
            career.id === currentCareer.id ? response.data : career
          )
        );
      } else {
        // Si no tiene ID, es una nueva carrera
        setCareers([...careers, response.data]);
      }

      setModalOpen(false);
    } catch (error) {
      console.error(
        "Error al guardar la carrera",
        error.response ? error.response.data : error.message
      );
      alert("Hubo un problema al guardar la carrera.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-72 bg-gray-900 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Catálogo de Carreras
        </h1>
        <nav className="space-y-4 flex-1">
          <Link
            to="/teacher-dashboard"
            className="flex items-center gap-2 p-3 bg-blue-500 rounded-lg"
          >
            <Home size={20} /> Volver al Dashboard
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold">Listado de Carreras</h2>
        <button
          onClick={handleAdd}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} /> Agregar Carrera
        </button>

        <table className="mt-6 w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Carrera</th>
              <th className="p-3 text-left">Duración</th>
              <th className="p-3 text-left">Materias</th>
              <th className="p-3 text-left">URL</th>
              <th className="p-3 text-left">Plan de Estudios</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((career) => (
              <tr key={career.id} className="border-t">
                <td className="p-3">{career.name}</td>
                <td className="p-3">{career.duration}</td>
                <td className="p-3">{career.subjects}</td>
                <td className="p-3">
                  <a
                    href={career.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    Ver URL
                  </a>
                </td>
                <td className="p-3">
                  {career.study_plan_url ? (
                    <a
                      href={career.study_plan_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      Ver Plan de Estudios
                    </a>
                  ) : (
                    "No disponible"
                  )}
                </td>
                <td className="p-3 flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(career)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(career.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal para agregar o editar carrera */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl mb-4">
              {currentCareer.id ? "Editar Carrera" : "Agregar Carrera"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded-lg"
                  value={currentCareer.name}
                  onChange={(e) =>
                    setCurrentCareer({
                      ...currentCareer,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="duration" className="block">
                  Duración
                </label>
                <input
                  type="text"
                  id="duration"
                  className="w-full p-2 border rounded-lg"
                  value={currentCareer.duration}
                  onChange={(e) =>
                    setCurrentCareer({
                      ...currentCareer,
                      duration: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="subjects" className="block">
                  Materias
                </label>
                <textarea
                  id="subjects"
                  className="w-full p-2 border rounded-lg"
                  value={currentCareer.subjects}
                  onChange={(e) =>
                    setCurrentCareer({
                      ...currentCareer,
                      subjects: e.target.value,
                    })
                  }
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="url" className="block">
                  URL de la carrera
                </label>
                <input
                  type="url"
                  id="url"
                  className="w-full p-2 border rounded-lg"
                  value={currentCareer.url}
                  onChange={(e) =>
                    setCurrentCareer({
                      ...currentCareer,
                      url: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="study_plan" className="block">
                  Plan de Estudios (PDF)
                </label>
                <input
                  type="file"
                  id="study_plan"
                  className="w-full p-2 border rounded-lg"
                  accept="application/pdf"
                  onChange={(e) =>
                    setCurrentCareer({
                      ...currentCareer,
                      study_plan: e.target.files[0],
                    })
                  }
                />
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  {currentCareer.id ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerCatalog;
