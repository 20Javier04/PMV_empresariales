import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarios from '../data/usuarios'; 
import '../stiles/Login.css';

function Login({ setIsAuthenticated }) {
  const [idEmpleado, setIdEmpleado] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuario = usuarios.find(
      (u) => u.id === idEmpleado && u.password === password
    );

    if (usuario) {
      setIsAuthenticated(true);
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
      navigate('/home');
    } else {
      alert('ID o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Turnify</h2>

        <label htmlFor="idEmpleado">RUT de Empleado</label>
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
