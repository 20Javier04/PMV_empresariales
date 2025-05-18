import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarEmpleado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);
  const [nombre, setNombre] = useState('');
  const [trabajo, setTrabajo] = useState('');

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const encontrado = usuarios.find(emp => emp.id === id && emp.nivel === 2);
    if (encontrado) {
      setEmpleado(encontrado);
      setNombre(encontrado.nombre);
      setTrabajo(encontrado.trabajo);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const actualizados = usuarios.map(emp => {
      if (emp.id === id) {
        return { ...emp, nombre, trabajo };
      }
      return emp;
    });

    localStorage.setItem('usuarios', JSON.stringify(actualizados));
    alert(`Empleado actualizado correctamente.`);
    navigate('/empleados');
  };

  return (
    <div style={containerStyle}>
      <h2>Editar Empleado</h2>
      {empleado ? (
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroup}>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroup}>
            <label>Trabajo o Cargo:</label>
            <input
              type="text"
              value={trabajo}
              onChange={(e) => setTrabajo(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={buttonGroup}>
            <button type="submit" style={guardarButton}>Guardar cambios</button>
            <button type="button" onClick={() => navigate('/empleados')} style={cancelarButton}>Cancelar</button>
          </div>
        </form>
      ) : (
        <p>Empleado no encontrado</p>
      )}
    </div>
  );
}

export default EditarEmpleado;


const containerStyle = {
  padding: '40px',
  fontFamily: 'Poppins, sans-serif',
  textAlign: 'center',
};

const formStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  maxWidth: '400px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const inputGroup = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  width: '100%',
};

const buttonGroup = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
};

const guardarButton = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const cancelarButton = {
  backgroundColor: '#ccc',
  color: '#333',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
