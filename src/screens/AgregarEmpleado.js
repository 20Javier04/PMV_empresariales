import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usuariosIniciales from '../data/usuarios';  

function AgregarEmpleado() {
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [passwordGenerada, setPasswordGenerada] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const almacenados = JSON.parse(localStorage.getItem('usuarios'));
    if (almacenados && Array.isArray(almacenados)) {
      setUsuarios(almacenados);
    } else {
      localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
      setUsuarios(usuariosIniciales);
    }
  }, []);

  const enviar = (e) => {
    e.preventDefault();

    const password = generarPassword();
    const nuevoEmpleado = {
      id: generarRutFake(),
      nombre: nombre,
      trabajo: cargo,
      nivel: 2,
      password: password
    };

    const actualizados = [...usuarios, nuevoEmpleado];
    localStorage.setItem('usuarios', JSON.stringify(actualizados));
    setPasswordGenerada(password);


    setTimeout(() => {
      navigate('/empleados');
    }, 3000);
  };

  const generarRutFake = () => {
    const random = Math.floor(Math.random() * 100000000);
    return `${random}-${Math.floor(Math.random() * 9)}`;
  };

  const generarPassword = () => {
    return 'empleado' + Math.floor(1000 + Math.random() * 9000);
  };

  return (
    <form onSubmit={enviar} style={formStyle}>
      <h3>Agregar Empleado</h3>

      <input
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        style={inputStyle}
      />

      <input
        placeholder="Cargo o trabajo"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
        required
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>Guardar</button>

      {passwordGenerada && (
        <div style={alertaStyle}>
          <strong>Empleado agregado.</strong><br />
          Contraseña generada: <code>{passwordGenerada}</code><br />
          Redirigiendo en 3 segundos...
        </div>
      )}
    </form>
  );
}

export default AgregarEmpleado;


const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  margin: '40px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  fontFamily: 'Poppins, sans-serif',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0,0,0,0.05)'
};

const inputStyle = {
  marginBottom: '12px',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const alertaStyle = {
  marginTop: '20px',
  padding: '12px',
  backgroundColor: '#e7f3ff',
  color: '#333',
  border: '1px solid #b3d7ff',
  borderRadius: '6px',
  fontSize: '14px',
  textAlign: 'center'
};
