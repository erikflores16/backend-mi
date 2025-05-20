import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createElement } from "react";
import { routes } from "./routes/route";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import BaseDashboard from "../src/pages/Layout/BaseDashboard";
import UsersPage from "./pages/Layout/UsersPage"; // Asegúrate de que el archivo se llama "UsersPage.jsx"
// import SubscriptionsPage from "../src/pages/Layout/SubscriptionsPage"; // Asegúrate de que el archivo se llama "SubscriptionsPage.jsx"

const router = createBrowserRouter(
  routes.map((route) => ({
    ...route,
    element: route.isProtected ? (
      <ProtectedRoute>{createElement(route.element)}</ProtectedRoute>
    ) : (
      createElement(route.element)
    ),
    children: route.children?.map((child) => ({
      ...child,
      element: child.isProtected ? (
        <ProtectedRoute>{createElement(child.element)}</ProtectedRoute>
      ) : (
        createElement(child.element)
      ),
    })),
  }))
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
