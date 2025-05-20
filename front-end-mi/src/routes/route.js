import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Welcome from "../pages/Welcome/Welcome";
import Customers from "../pages/Customers/Customers";
import BaseDashboard from "../pages/Layout/BaseDashboard";
import Layout from "../pages/Layout/Layout";
import UsersPage from "../pages/Layout/UsersPage";
import SubscriptionsPage from "../pages/Layout/SuscriptionsPage";
import FormularioUniversidad from "../pages/formulario/FormularioUniversidad";
import Roles from "../pages/Layout/Roles";
import TeacherDashboard from "../pages/Layout/TeacherDashboard";
import TeacherDashboardPayment from "../pages/Layout/TeacherDashboardPayment";
import CareerCatalog from "../pages/Layout/CareerCatalog"; // Asegúrate de importar el componente correctamente

export const routes = [
  {
    path: "/Welcome",
    element: Welcome,
    isProtected: false,
  },
  {
    path: "/Login", // Ruta principal
    element: Login, // Asegura que sea el componente correcto
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/register",
    element: Register,
  },
  {
    path: "/usuarios",
    element: UsersPage,
  },
  {
    path: "/Roles",
    element: Roles,
  },
  {
    path: "/formulario",
    element: FormularioUniversidad,
  },
  {
    path: "/suscripciones",
    element: SubscriptionsPage, // La página que mostrarás al hacer clic en "Suscripciones"
    isProtected: false,
  },
  {
    path: "/dashboard",
    element: BaseDashboard,
    isProtected: false,
    children: [
      {
        path: "", // Dejar la ruta base sin subruta, manteniéndolo en el mismo dashboard
        element: Customers, // La vista inicial que se muestra en el dashboard
      },
    ],
  },
  {
    path: "/teacher-dashboard",
    element: TeacherDashboard,
    isProtected: false, // Puedes usar esto para restringir el acceso solo a maestros
  },
  {
    path: "/teacher-dashboard-payment",
    element: TeacherDashboardPayment,
    isProtected: false, // Puedes usar esto para restringir el acceso solo a maestros
  },
  {
    path: "/career-catalog",  // Nueva ruta para el catálogo de carreras
    element: CareerCatalog,  // Asegúrate de asignar el componente correctamente
    isProtected: false,  // Esto lo puedes cambiar si quieres restringir el acceso
  },
];
