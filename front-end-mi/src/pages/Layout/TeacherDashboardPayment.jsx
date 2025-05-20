import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Home, CreditCard } from "lucide-react";

const TeacherDashboardPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { planId } = location.state || {};
  const [plan, setPlan] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });

  useEffect(() => {
    if (planId) {
      const fetchPlan = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/study-plans/${planId}`
          );
          setPlan(response.data);
        } catch (error) {
          console.error("Error al obtener el plan:", error);
        }
      };
      fetchPlan();
    }
  }, [planId]);

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pago procesado correctamente.");
    window.location.reload();
  };

  if (!plan) {
    return <div>Cargando detalles del plan...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <aside style={{ width: "18rem", backgroundColor: "#1f2937", color: "white", padding: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center", marginBottom: "1.5rem" }}>Panel de Pago</h1>
        <nav>
          <button
            onClick={() => navigate("/teacher-dashboard")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem", backgroundColor: "#3b82f6", borderRadius: "0.5rem", color: "white", border: "none", cursor: "pointer" }}
          >
            <Home size={20} /> Volver al Dashboard
          </button>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "2rem" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>Detalles del Plan</h2>
        <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
          <div style={{ backgroundColor: "white", padding: "2rem", boxShadow: "0px 4px 10px rgba(0,0,0,0.15)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{plan.nombre}</h3>
            <p style={{ fontSize: "1.2rem", color: "#10b981" }}>Precio: ${plan.precio} / mes</p>
            <ul>{plan.descripcion}</ul>
          </div>

          <form onSubmit={handleSubmit} style={{ backgroundColor: "white", padding: "2rem", boxShadow: "0px 4px 10px rgba(0,0,0,0.15)", borderRadius: "0.75rem", width: "100%" }}>
            <div style={{ backgroundColor: "#2563eb", padding: "1.5rem", borderRadius: "0.75rem", color: "white", width: "22rem", margin: "auto", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: "bold" }}>
                <span>{paymentDetails.cardNumber || "1234 5678 9012 3456"}</span>
                <CreditCard size={24} />
              </div>
              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
                <span>{paymentDetails.cardHolder || "Juan Pérez"}</span>
                <span>{paymentDetails.expiryDate || "MM/AA"}</span>
              </div>
            </div>

            <label>Número de Tarjeta</label>
            <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" value={paymentDetails.cardNumber} onChange={handleChange} required style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem" }} />

            <div style={{ display: "flex", gap: "1rem" }}>
              <div>
                <label>Fecha de Expiración</label>
                <input type="text" name="expiryDate" placeholder="MM/AA" value={paymentDetails.expiryDate} onChange={handleChange} required style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem" }} />
              </div>
              <div>
                <label>CVV</label>
                <input type="password" name="cvv" placeholder="123" value={paymentDetails.cvv} onChange={handleChange} required style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem" }} />
              </div>
            </div>
            <label>Nombre en la Tarjeta</label>
            <input type="text" name="cardHolder" placeholder="Juan Pérez" value={paymentDetails.cardHolder} onChange={handleChange} required style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "0.5rem" }} />
            <button type="submit" style={{ width: "100%", padding: "0.9rem", backgroundColor: "#10b981", color: "white", borderRadius: "0.75rem", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", border: "none", cursor: "pointer", marginTop: "1rem" }}>
              <CreditCard size={24} /> Procesar Pago
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboardPayment;
