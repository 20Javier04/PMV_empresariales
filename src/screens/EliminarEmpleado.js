import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EliminarEmpleado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const encontrado = usuarios.find(emp => emp.id === id);
    setEmpleado(encontrado);
  }, [id]);

  const handleEliminar = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const actualizados = usuarios.filter(emp => emp.id !== id);

    localStorage.setItem('usuarios', JSON.stringify(actualizados));

    alert(`Empleado ${empleado?.nombre} eliminado correctamente.`);
    navigate('/empleados');
  };

  return (
    <div style={containerStyle}>
      <h2>Eliminar Empleado</h2>
      {empleado ? (
        <div style={cardStyle}>
          <p><strong>{empleado.nombre}</strong> — {empleado.trabajo}</p>
          <p>¿Estás seguro de que deseas eliminar a este empleado?</p>
          <div style={buttonGroupStyle}>
            <button onClick={handleEliminar} style={eliminarButtonStyle}>Eliminar</button>
            <button onClick={() => navigate('/empleados')} style={cancelarButtonStyle}>Cancelar</button>
          </div>
        </div>
      ) : (
        <p>Empleado no encontrado.</p>
      )}
    </div>
  );
}

export default EliminarEmpleado;

const containerStyle = {
  padding: '40px',
  fontFamily: 'Poppins, sans-serif',
  textAlign: 'center',
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  display: 'inline-block',
  marginTop: '20px',
};

const buttonGroupStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
};

const eliminarButtonStyle = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const cancelarButtonStyle = {
  backgroundColor: '#ccc',
  color: '#333',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
