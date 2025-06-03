import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Home, CreditCard } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const MySwal = withReactContent(Swal);

// Validación con yup
const schema = yup.object({
  cardNumber: yup
    .string()
    .required("El número de tarjeta es obligatorio")
    .matches(/^\d{16}$/, "Debe tener 16 dígitos"),
  expiryDate: yup
    .string()
    .required("La fecha de expiración es obligatoria")
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Formato MM/AA"),
  cvv: yup
    .string()
    .required("El CVV es obligatorio")
    .matches(/^\d{3}$/, "El CVV debe tener exactamente 3 dígitos"),
  cardHolder: yup.string().required("El nombre en la tarjeta es obligatorio"),
}).required();

const TeacherDashboardPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { planId } = location.state || {};
  const [plan, setPlan] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const paymentDetails = watch();

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

  const onSubmit = async (data) => {
    await MySwal.fire({
      title: "Pago exitoso",
      text: `Gracias por suscribirte al plan ${plan.nombre}`,
      icon: "success",
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Continuar",
      backdrop: true,
      timer: 3000,
      timerProgressBar: true,
    });
    navigate("/teacher-dashboard");
  };

  if (!plan) {
    return (
      <div className="flex justify-center items-center min-h-screen font-sans text-gray-600 text-lg">
        Cargando detalles del plan...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100 font-sans">
      <aside className="w-80 bg-gray-900 text-white p-10 flex flex-col shadow-2xl">
        <h1 className="text-4xl font-extrabold tracking-widest mb-12 select-none">
          Pago Seguro
        </h1>
        <button
          onClick={() => navigate("/teacher-dashboard")}
          className="flex items-center gap-4 px-6 py-4 bg-blue-700 rounded-3xl font-semibold text-xl hover:bg-blue-800 transition-shadow shadow-md hover:shadow-lg select-none"
          aria-label="Volver al dashboard"
        >
          <Home size={28} /> Volver al Dashboard
        </button>
      </aside>

      <main className="flex-1 p-16 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-black text-gray-900 mb-16 select-none"
        >
          Detalles del Plan
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-200 p-12"
          >
            <h3 className="text-4xl font-extrabold text-indigo-600 mb-6 select-none">
              {plan.nombre}
            </h3>
            <p className="text-3xl font-bold text-green-600 mb-6 select-none">
              ${plan.precio} <span className="text-lg font-normal">/ mes</span>
            </p>
            <p className="text-gray-700 leading-relaxed text-lg select-text">
              {plan.descripcion}
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-200 p-12 space-y-8 max-w-md mx-auto"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-xl text-white shadow-2xl select-none">
              <div className="flex justify-between font-extrabold text-2xl tracking-wide mb-3">
                <span>{paymentDetails.cardNumber || "1234 5678 9012 3456"}</span>
                <CreditCard size={30} />
              </div>
              <div className="flex justify-between tracking-widest text-lg">
                <span>{paymentDetails.cardHolder || "Juan Pérez"}</span>
                <span>{paymentDetails.expiryDate || "MM/AA"}</span>
              </div>
            </div>

            <div>
              <label
                htmlFor="cardNumber"
                className="block text-gray-900 font-semibold mb-3 text-lg"
              >
                Número de Tarjeta
              </label>
              <input
                id="cardNumber"
                type="text"
                {...register("cardNumber")}
                className={`w-full rounded-xl border p-4 text-xl font-medium transition focus:outline-none focus:ring-4 focus:ring-indigo-400 ${
                  errors.cardNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="1234 5678 9012 3456"
                maxLength={16}
                inputMode="numeric"
                autoComplete="cc-number"
                aria-invalid={errors.cardNumber ? "true" : "false"}
                aria-describedby="cardNumber-error"
              />
              {errors.cardNumber && (
                <p
                  id="cardNumber-error"
                  className="mt-2 text-red-600 font-semibold text-sm select-text"
                >
                  {errors.cardNumber.message}
                </p>
              )}
            </div>

            <div className="flex gap-8">
              <div className="flex-1">
                <label
                  htmlFor="expiryDate"
                  className="block text-gray-900 font-semibold mb-3 text-lg"
                >
                  Fecha de Expiración
                </label>
                <input
                  id="expiryDate"
                  type="text"
                  {...register("expiryDate")}
                  className={`w-full rounded-xl border p-4 text-xl font-medium transition focus:outline-none focus:ring-4 focus:ring-indigo-400 ${
                    errors.expiryDate ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="MM/AA"
                  maxLength={5}
                  aria-invalid={errors.expiryDate ? "true" : "false"}
                  aria-describedby="expiryDate-error"
                />
                {errors.expiryDate && (
                  <p
                    id="expiryDate-error"
                    className="mt-2 text-red-600 font-semibold text-sm select-text"
                  >
                    {errors.expiryDate.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="cvv"
                  className="block text-gray-900 font-semibold mb-3 text-lg"
                >
                  CVV
                </label>
                <input
                  id="cvv"
                  type="password"
                  {...register("cvv")}
                  className={`w-full rounded-xl border p-4 text-xl font-medium transition focus:outline-none focus:ring-4 focus:ring-indigo-400 ${
                    errors.cvv ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="123"
                  maxLength={3}
                  inputMode="numeric"
                  aria-invalid={errors.cvv ? "true" : "false"}
                  aria-describedby="cvv-error"
                />
                {errors.cvv && (
                  <p
                    id="cvv-error"
                    className="mt-2 text-red-600 font-semibold text-sm select-text"
                  >
                    {errors.cvv.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="cardHolder"
                className="block text-gray-900 font-semibold mb-3 text-lg"
              >
                Nombre en la Tarjeta
              </label>
              <input
                id="cardHolder"
                type="text"
                {...register("cardHolder")}
                className={`w-full rounded-xl border p-4 text-xl font-medium transition focus:outline-none focus:ring-4 focus:ring-indigo-400 ${
                  errors.cardHolder ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Juan Pérez"
                autoComplete="cc-name"
                aria-invalid={errors.cardHolder ? "true" : "false"}
                aria-describedby="cardHolder-error"
              />
              {errors.cardHolder && (
                <p
                  id="cardHolder-error"
                  className="mt-2 text-red-600 font-semibold text-sm select-text"
                >
                  {errors.cardHolder.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-3xl py-5 font-extrabold text-white text-xl shadow-lg shadow-indigo-300/30 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Pagar ahora"
            >
              {isSubmitting ? "Procesando..." : "Pagar ahora"}
            </button>
          </motion.form>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboardPayment;
