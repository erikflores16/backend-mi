import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormularioUniversidad.css";

const FormularioUniversidad = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedCareers, setRecommendedCareers] = useState([]);
  const navigate = useNavigate();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [notifications, setNotifications] = useState({});

  // Todas las posibles preguntas organizadas por área de interés
  const allQuestions = {
    // Pregunta inicial para determinar el área principal
    q1: {
      id: 1,
      question: "¿Qué tipo de actividades disfrutas más?",
      options: [
        {
          id: "a",
          text: "Resolver problemas matemáticos",
          area: "ciencias",
          nextQuestion: 2,
        },
        {
          id: "b",
          text: "Leer y analizar textos",
          area: "humanidades",
          nextQuestion: 3,
        },
        {
          id: "c",
          text: "Ayudar a personas o animales",
          area: "salud",
          nextQuestion: 4,
        },
        {
          id: "d",
          text: "Crear o diseñar elementos visuales",
          area: "artes",
          nextQuestion: 5,
        },
        {
          id: "e",
          text: "Coordinar y gestionar equipos",
          area: "administrativas",
          nextQuestion: 6,
        },
      ],
    },
    // Preguntas para ciencias
    q2: {
      id: 2,
      question:
        "Dentro de las ciencias, ¿cuál de estas áreas te llama más la atención?",
      options: [
        {
          id: "a",
          text: "Matemáticas y estadísticas",
          area: "ciencias",
          subarea: "matematicas",
          nextQuestion: 7,
        },
        {
          id: "b",
          text: "Física y tecnologías aplicadas",
          area: "ciencias",
          subarea: "ingenierias",
          nextQuestion: 7,
        },
        {
          id: "c",
          text: "Tecnologías de la información",
          area: "ciencias",
          subarea: "computacion",
          nextQuestion: 7,
        },
        {
          id: "d",
          text: "Investigación científica",
          area: "ciencias",
          subarea: "investigacion",
          nextQuestion: 7,
        },
      ],
    },
    // Preguntas para humanidades
    q3: {
      id: 3,
      question:
        "En el campo de las humanidades, ¿qué tipo de estudios te interesan más?",
      options: [
        {
          id: "a",
          text: "Literatura y escritura creativa",
          area: "humanidades",
          subarea: "literatura",
          nextQuestion: 7,
        },
        {
          id: "b",
          text: "Historia y cultura global",
          area: "humanidades",
          subarea: "historia",
          nextQuestion: 7,
        },
        {
          id: "c",
          text: "Filosofía y reflexión crítica",
          area: "humanidades",
          subarea: "filosofia",
          nextQuestion: 7,
        },
        {
          id: "d",
          text: "Lenguas extranjeras y traducción",
          area: "humanidades",
          subarea: "lenguas",
          nextQuestion: 7,
        },
      ],
    },
    // Preguntas para salud
    q4: {
      id: 4,
      question: "En el ámbito de la salud, ¿qué área te atrae más?",
      options: [
        {
          id: "a",
          text: "Medicina y cirugía",
          area: "salud",
          subarea: "medicina",
          nextQuestion: 7,
        },
        {
          id: "b",
          text: "Cuidado de la salud y bienestar",
          area: "salud",
          subarea: "enfermeria",
          nextQuestion: 7,
        },
        {
          id: "c",
          text: "Psicología y salud mental",
          area: "salud",
          subarea: "psicologia",
          nextQuestion: 7,
        },
        {
          id: "d",
          text: "Prevención y nutrición",
          area: "salud",
          subarea: "nutricion",
          nextQuestion: 7,
        },
      ],
    },
    // Preguntas para artes
    q5: {
      id: 5,
      question: "Dentro del arte, ¿qué forma de expresión te inspira más?",
      options: [
        {
          id: "a",
          text: "Artes visuales (pintura, escultura)",
          area: "artes",
          subarea: "bellasartes",
          nextQuestion: 7,
        },
        {
          id: "b",
          text: "Diseño gráfico y digital",
          area: "artes",
          subarea: "diseno",
          nextQuestion: 7,
        },
        {
          id: "c",
          text: "Arquitectura y diseño de espacios",
          area: "artes",
          subarea: "arquitectura",
          nextQuestion: 7,
        },
        {
          id: "d",
          text: "Música y artes escénicas",
          area: "artes",
          subarea: "musica",
          nextQuestion: 7,
        },
      ],
    },
    // Preguntas para administrativas
    q6: {
      id: 6,
      question:
        "En el mundo de los negocios, ¿qué actividades encuentras más atractivas?",
      options: [
        {
          id: "a",
          text: "Gestión y administración de empresas",
          area: "administrativas",
          subarea: "administracion",
          nextQuestion: 7,
        },
        {
          id: "b",
          text: "Contabilidad y gestión financiera",
          area: "administrativas",
          subarea: "finanzas",
          nextQuestion: 7,
        },
        {
          id: "c",
          text: "Marketing y relaciones comerciales",
          area: "administrativas",
          subarea: "mercadotecnia",
          nextQuestion: 7,
        },
        {
          id: "d",
          text: "Emprender y desarrollar nuevos negocios",
          area: "administrativas",
          subarea: "emprendimiento",
          nextQuestion: 7,
        },
      ],
    },
    // Preguntas complementarias (se muestran después de las específicas)
    q7: {
      id: 7,
      question: "¿Qué tipo de dinámica prefieres en tu entorno de trabajo?",
      options: [
        { id: "a", text: "Trabajo en equipo colaborativo", nextQuestion: 8 },
        { id: "b", text: "Trabajo de forma autónoma", nextQuestion: 8 },
        { id: "c", text: "Trabajo práctico en campo", nextQuestion: 8 },
        {
          id: "d",
          text: "Trabajo de investigación o teórico",
          nextQuestion: 8,
        },
      ],
    },
    q8: {
      id: 8,
      question: "¿En qué tipo de entorno te sentirías más cómodo trabajando?",
      options: [
        { id: "a", text: "En una oficina tradicional", nextQuestion: 9 },
        { id: "b", text: "En un laboratorio o taller", nextQuestion: 9 },
        {
          id: "c",
          text: "Al aire libre o en un entorno móvil",
          nextQuestion: 9,
        },
        {
          id: "d",
          text: "En un ambiente remoto o desde casa",
          nextQuestion: 9,
        },
      ],
    },
    q9: {
      id: 9,
      question: "¿Qué tipo de impacto te gustaría generar en tu carrera?",
      options: [
        { id: "a", text: "Innovación tecnológica", nextQuestion: 10 },
        { id: "b", text: "Transformación social", nextQuestion: 10 },
        {
          id: "c",
          text: "Contribución cultural y artística",
          nextQuestion: 10,
        },
        {
          id: "d",
          text: "Desarrollo económico y empresarial",
          nextQuestion: 10,
        },
      ],
    },
    q10: {
      id: 10,
      question: "¿Qué tipo de estudios te gustaría seguir?",
      options: [
        { id: "a", text: "Estudios técnicos o carreras cortas" },
        { id: "b", text: "Licenciatura universitaria" },
        { id: "c", text: "Maestría o doctorado" },
        { id: "d", text: "Aún no tengo claro qué estudiar" },
      ],
    },
  };

  // Función para barajar las preguntas y hacerlas aleatorias
  function shuffleQuestions(questions) {
    const questionKeys = Object.keys(questions);
    for (let i = questionKeys.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionKeys[i], questionKeys[j]] = [questionKeys[j], questionKeys[i]];
    }

    const shuffledQuestions = {};
    questionKeys.forEach((key) => {
      shuffledQuestions[key] = questions[key];
    });

    return shuffledQuestions;
  }

  const randomQuestions = shuffleQuestions(allQuestions);

  // Carreras específicas de Yucatán organizadas por área y subárea
  const yucatanCareers = {
    ciencias: {
      matematicas: [
        "Licenciatura en Matemáticas (UADY)",
        "Ingeniería Matemática (Tec de Mérida)",
        "Actuaría (Anáhuac Mayab)",
      ],
      ingenierias: [
        "Ingeniería Industrial (UADY)",
        "Ingeniería Mecánica (Tec de Mérida)",
        "Ingeniería Civil (Anáhuac Mayab)",
        "Ingeniería en Energías Renovables (UADY)",
      ],
      computacion: [
        "Ingeniería en Software (UADY)",
        "Inteligencia Artificial (Tec de Mérida)",
        "Ciencias de la Computación (Anáhuac Mayab)",
      ],
      investigacion: [
        "Física Biomédica (UADY)",
        "Biotecnología (Tec de Mérida)",
        "Nanotecnología (Anáhuac Mayab)",
      ],
    },
    humanidades: {
      literatura: [
        "Licenciatura en Literatura (UADY)",
        "Escritura Creativa (Modelo)",
        "Edición y Publicaciones (Anáhuac Mayab)",
      ],
      historia: [
        "Historia del Arte (UADY)",
        "Arqueología (UADY)",
        "Patrimonio Cultural (Modelo)",
      ],
      filosofia: [
        "Filosofía (UADY)",
        "Ética y Valores (Anáhuac Mayab)",
        "Estudios Sociales (Modelo)",
      ],
      lenguas: [
        "Lingüística (UADY)",
        "Traducción e Interpretación (Anáhuac Mayab)",
        "Enseñanza de Idiomas (Modelo)",
      ],
    },
    salud: {
      medicina: [
        "Medicina (UADY)",
        "Cirujano Dentista (UADY)",
        "Medicina (Anáhuac Mayab)",
      ],
      enfermeria: [
        "Enfermería (UADY)",
        "Enfermería Pediátrica (SSA)",
        "Enfermería en Urgencias (ISSSTE)",
      ],
      psicologia: [
        "Psicología (UADY)",
        "Psicología Organizacional (Modelo)",
        "Psicología Clínica (Anáhuac Mayab)",
      ],
      nutricion: [
        "Nutrición (UADY)",
        "Nutrición Deportiva (Modelo)",
        "Ciencias de los Alimentos (Tec de Mérida)",
      ],
    },
    artes: {
      bellasartes: [
        "Artes Visuales (UADY)",
        "Diseño de Modas (Modelo)",
        "Pintura y Escultura (ESAY)",
      ],
      diseno: [
        "Diseño Gráfico (UADY)",
        "Diseño Digital (Modelo)",
        "Animación y Multimedia (Anáhuac Mayab)",
      ],
      arquitectura: [
        "Arquitectura (UADY)",
        "Diseño de Interiores (Modelo)",
        "Arquitectura Sustentable (Anáhuac Mayab)",
      ],
      musica: [
        "Música (ESAY)",
        "Producción Musical (Modelo)",
        "Artes Escénicas (UADY)",
      ],
    },
    administrativas: {
      administracion: [
        "Administración de Empresas (UADY)",
        "Negocios Internacionales (Tec de Mérida)",
        "Dirección de Empresas (Anáhuac Mayab)",
      ],
      finanzas: [
        "Contaduría (UADY)",
        "Finanzas y Banca (Modelo)",
        "Fiscal y Auditoría (Anáhuac Mayab)",
      ],
      mercadotecnia: [
        "Mercadotecnia (UADY)",
        "Publicidad y Medios (Modelo)",
        "Comercio Electrónico (Anáhuac Mayab)",
      ],
      emprendimiento: [
        "Innovación Empresarial (Tec de Mérida)",
        "Desarrollo de Startups (Anáhuac Mayab)",
        "Gestión de Proyectos (Modelo)",
      ],
    },
  };

  const handleOptionSelect = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });

    // Avanzar a la siguiente pregunta si no es la última
  };

  const calculateResult = () => {
    // Determinar el área principal
    const mainArea = answers[1]?.area;
    const subArea =
      answers[1]?.subarea ||
      answers[2]?.subarea ||
      answers[3]?.subarea ||
      answers[4]?.subarea ||
      answers[5]?.subarea ||
      answers[6]?.subarea;

    // Obtener carreras recomendadas basadas en el área y subárea
    let careers = [];
    if (mainArea && subArea && yucatanCareers[mainArea]?.[subArea]) {
      careers = yucatanCareers[mainArea][subArea];
    } else if (mainArea && yucatanCareers[mainArea]) {
      // Si no hay subárea clara, mostrar todas las carreras del área
      careers = Object.values(yucatanCareers[mainArea]).flat();
    }

    // Eliminar duplicados y limitar a 3-5 carreras
    const uniqueCareers = [...new Set(careers)];
    const recommended = uniqueCareers.slice(0, 5);

    setRecommendedCareers(recommended);
    setShowResults(true);
  };

  // Función para manejar notificaciones
  const handleNotification = (careerName) => {
    setSelectedCareer(careerName);
    setNotifications((prev) => ({
      ...prev,
      [careerName]: !prev[careerName],
    }));
    setShowNotificationModal(true);
  };

  const getCurrentQuestion = () => {
    return allQuestions[`q${currentStep}`];
  };

  const restartTest = () => {
    setCurrentStep(1);
    setAnswers({});
    setShowResults(false);
    setRecommendedCareers([]);
  };

  return (
    <div className="formulario-container">
      {!showResults ? (
        <>
          <h1>Test de Orientación Universitaria - Yucatán</h1>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(currentStep / 10) * 100}%` }}
            ></div>
          </div>

          <div className="question-container">
            <h2>{getCurrentQuestion()?.question}</h2>
            <div className="options-grid">
              {getCurrentQuestion()?.options.map((option) => (
                <button
                  key={option.id}
                  className={`option-button ${
                    answers[currentStep]?.id === option.id ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(currentStep, option)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button
                className="nav-button prev-button"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <i className="fas fa-arrow-left"></i> Anterior
              </button>
            )}
            <button
              className="nav-button next-button"
              onClick={() =>
                currentStep < 10
                  ? setCurrentStep(currentStep + 1)
                  : calculateResult()
              }
              disabled={!answers[currentStep]}
            >
              {currentStep === 10 ? (
                <>
                  <i className="fas fa-check-circle"></i> Ver resultados
                </>
              ) : (
                <>
                  Siguiente <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="results-modal">
          <div className="modal-content">
            <h2>¡Tus carreras recomendadas en Yucatán!</h2>

            {/* Modal de comentarios */}
            {showCommentModal && (
              <div className="comment-modal-overlay">
                <div className="comment-modal">
                  <h3>Opinión sobre los resultados para {selectedCareer}</h3>
                  <textarea
                    placeholder="Escribe tu opinión sobre estos resultados..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="comment-modal-actions">
                    <button onClick={() => setShowCommentModal(false)}>
                      Cancelar
                    </button>
                    <button
                      className="send-button"
                      onClick={() => {
                        console.log(
                          `Comentario enviado para ${selectedCareer}: ${commentText}`
                        );
                        setShowCommentModal(false);
                        setCommentText("");
                        alert("¡Gracias por tu opinión!");
                      }}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal de notificaciones */}
            {showNotificationModal && (
              <div className="notification-modal-overlay">
                <div className="notification-modal">
                  <p>
                    ¡Notificaciones{" "}
                    {notifications[selectedCareer]
                      ? "activadas"
                      : "desactivadas"}{" "}
                    para {selectedCareer}!
                  </p>
                  <button onClick={() => setShowNotificationModal(false)}>
                    Aceptar
                  </button>
                </div>
              </div>
            )}

            <div className="careers-list">
              {recommendedCareers.length > 0 ? (
                <>
                  <p className="results-description">
                    Basado en tus respuestas, estas son las carreras que mejor
                    se adaptan a tu perfil:
                  </p>
                  <ul>
                    {recommendedCareers.map((career, index) => {
                      const getCareerDescription = (careerName) => {
                        const descriptions = {
                          "Licenciatura en Matemáticas":
                            "Formación en matemáticas puras y aplicadas",
                          "Ingeniería Industrial":
                            "Enfoque en optimización de procesos productivos",
                          "Ingeniería en Software":
                            "Desarrollo de sistemas y aplicaciones tecnológicas",
                          "Física Biomédica":
                            "Aplicación de la física en medicina y biología",
                          "Licenciatura en Literatura":
                            "Estudio de obras literarias y creación escrita",
                          "Historia del Arte":
                            "Análisis de manifestaciones artísticas históricas",
                          Medicina:
                            "Carrera dedicada al diagnóstico y tratamiento de enfermedades",
                          Enfermería: "Cuidado profesional de pacientes",
                          "Artes Visuales":
                            "Expresión artística a través de medios visuales",
                          "Diseño Gráfico":
                            "Comunicación visual y diseño de mensajes",
                          "Administración de Empresas":
                            "Gestión y dirección de organizaciones",
                          Contaduría:
                            "Gestión financiera y contable de empresas",
                        };
                        return (
                          descriptions[careerName] ||
                          "Carrera profesional con amplio campo laboral"
                        );
                      };

                      const getInstitutionDescription = (inst) => {
                        const descriptions = {
                          UADY: "Universidad Autónoma de Yucatán - Institución pública líder en la región",
                          "Tec de Mérida":
                            "Instituto Tecnológico de Mérida - Enfoque en ingenierías y tecnología",
                          "Anáhuac Mayab":
                            "Universidad Anáhuac Mayab - Excelencia académica con visión internacional",
                          ESAY: "Escuela Superior de Artes de Yucatán - Formación artística profesional",
                          Modelo:
                            "Universidad Modelo - Enfoque práctico y vinculación empresarial",
                        };
                        return (
                          descriptions[inst] ||
                          `Institución educativa en Yucatán`
                        );
                      };

                      const careerMatch = career.match(/^(.*?)\s*\((.*?)\)$/);
                      const careerName = careerMatch
                        ? careerMatch[1].trim()
                        : career;
                      const institutionName = careerMatch
                        ? careerMatch[2].trim()
                        : "";

                      return (
                        <li key={index} className="career-item">
                          <div className="career-header">
                            <span className="career-name">{careerName}</span>
                            <span className="institution-name">
                              {" "}
                              - {institutionName}
                            </span>
                          </div>
                          <p className="career-description">
                            {getCareerDescription(careerName)} •{" "}
                            {getInstitutionDescription(institutionName)}
                          </p>
                          <div className="career-actions">
                            <button
                              className="discover-button career-search-button"
                              onClick={() => {
                                const query = `${careerName} ${
                                  institutionName ? "en " + institutionName : ""
                                } Yucatán`;
                                window.open(
                                  `https://www.google.com/search?q=${encodeURIComponent(
                                    query
                                  )}`,
                                  "_blank"
                                );
                              }}
                            >
                              <i className="fas fa-search"></i> Explorar esta
                              carrera
                            </button>

                            <button
                              className="comment-button"
                              onClick={() => {
                                setSelectedCareer(careerName);
                                setShowCommentModal(true);
                              }}
                            >
                              <i className="fas fa-comment"></i> Comentar
                            </button>

                            <button
                              className={`notify-button ${
                                notifications[careerName] ? "active" : ""
                              }`}
                              onClick={() => handleNotification(careerName)}
                            >
                              <i className="fas fa-bell"></i> Notificaciones
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <p className="no-results">
                  No pudimos determinar carreras específicas. Te recomendamos
                  explorar las opciones de la{" "}
                  <a
                    href="https://www.uady.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    UADY
                  </a>
                  , el{" "}
                  <a
                    href="https://www.merida.tecnm.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tec de Mérida
                  </a>{" "}
                  o la{" "}
                  <a
                    href="https://www.anahuac.mx/merida"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Anáhuac Mayab
                  </a>
                  .
                </p>
              )}
            </div>

            <div className="modal-buttons">
              <button className="modal-button secondary" onClick={restartTest}>
                <i className="fas fa-redo"></i> Realizar test nuevamente
              </button>
              <button
                className="modal-button tertiary"
                onClick={() => navigate("/welcome")} // pequeño detalle de volver al "/welcome" o inicio
              >
                <i className="fas fa-home"></i> Volver al inicio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioUniversidad;
