import { Outlet } from "react-router-dom";
import React from "react";
import "./Layout.css"

function Layout() {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="layout-content">
        <Outlet />  {/* Aquí se renderiza el contenido dinámico de las rutas */}
      </main>
    </div>
  );
}

export default Layout;