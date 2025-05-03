import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [idEmpleado, setIdEmpleado] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Aquí se puede simular una validación simple
    if (idEmpleado === '12345' && password === 'admin') {
      alert('Inicio de sesión exitoso');
      // Aquí iría una redirección a otra pantalla
    } else {
      alert('ID o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Turnify</h2>

        <label htmlFor="idEmpleado">Rut de Empleado</label>
        <input
          type="text"
          id="idEmpleado"
          value={idEmpleado}
          onChange={(e) => setIdEmpleado(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
