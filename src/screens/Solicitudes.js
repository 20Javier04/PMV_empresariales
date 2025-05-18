import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import solicitudesIniciales from '../data/solicitudes';

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const empleados = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (!localStorage.getItem('solicitudes')) {
      localStorage.setItem('solicitudes', JSON.stringify(solicitudesIniciales));
    }

    const lista = JSON.parse(localStorage.getItem('solicitudes')) || [];

    setUsuario(usuarioActual);
    setUsuarios(empleados);

    const filtradas = usuarioActual?.nivel === 1
      ? lista
      : lista.filter(sol => sol.idEmpleado === usuarioActual?.id);

    setSolicitudes(filtradas);
  }, []);

  const obtenerNombre = (rut) => {
    const emp = usuarios.find(u => u.id === rut);
    return emp?.nombre || 'Desconocido';
  };

  return (
    <div className="solicitudes-container" style={containerStyle}>
      <h2 style={titleStyle}>
        {usuario?.nivel === 1 ? 'Todas las Solicitudes' : 'Mis Solicitudes'}
      </h2>

      {solicitudes.length === 0 ? (
        <p>No hay solicitudes registradas.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Remitente</th>
              <th style={thStyle}>Asunto</th>
              <th style={thStyle}>Hora</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((sol) => (
              <tr key={sol.id}>
                <td style={tdStyle}>{obtenerNombre(sol.idEmpleado)}</td>
                <td style={tdStyle}>{sol.asunto}</td>
                <td style={tdStyle}>{sol.hora}</td>
                <td style={tdStyle}>
                  <Link to={`/solicitud/${sol.id}`} style={linkButton}>
                    Leer
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    <Link to="/redactar-solicitud" style={fabButton}>+
    </Link>

    </div>
  );
};

export default Solicitudes;

const containerStyle = {
  padding: '30px',
  fontFamily: 'Poppins, sans-serif',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '24px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '24px',
  boxShadow: '0 0 10px rgba(0,0,0,0.05)',
};

const thStyle = {
  backgroundColor: '#f2f2f2',
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const linkButton = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '6px 12px',
  borderRadius: '6px',
  textDecoration: 'none',
};

const newBtn = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '12px 20px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 'bold',
};

const fabButton = {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  width: '60px',
  height: '60px',
  backgroundColor: '#28a745',
  color: 'white',
  fontSize: '24px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'none',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  zIndex: 1000,
};
