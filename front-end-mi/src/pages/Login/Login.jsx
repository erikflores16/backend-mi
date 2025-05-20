import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Formik } from "formik";
import InputLabel from "../../components/Input/InputLabel";
import Button from "../../components/Button/Button";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = (values) => {
    // Verificar las credenciales para redirigir
    if (values.email === "erik@gmail.com" && values.password === "123456789") {
      navigate("/dashboard");
    } else if (values.email === "jair@gmail.com" && values.password === "12345678") {
      navigate("/welcome");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };
  return (
    <div className="login-container">
      {/* Sección de formulario */}
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <Formik initialValues={initialValues} onSubmit={handleLogin}>
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <InputLabel
                label="Correo Electrónico"
                name="email"
                placeholder="Ingrese su correo"
                onChange={handleChange}
                value={values.email}
              />
              <InputLabel
                label="Contraseña"
                name="password"
                type="password"
                placeholder="Ingrese su contraseña"
                onChange={handleChange}
                value={values.password}
              />
              {error && <p className="error-message">{error}</p>}
              <Button value="Ingresar" type="submit" />
            </form>
          )}
        </Formik>
      </div>

      {/* Sección de imagen */}
      <div className="login-image">
        <img src="/public/MI.png" alt="Imagen" className="login-img" />
      </div>
    </div>
  );
};

export default Login;
