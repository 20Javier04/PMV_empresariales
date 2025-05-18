import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LeerSolicitud = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [solicitud, setSolicitud] = useState(null);
  const [remitente, setRemitente] = useState('');

  useEffect(() => {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const encontrada = solicitudes.find(s => s.id === id);
    if (!encontrada) {
      navigate('/NotFound');
      return;
    }

    setSolicitud(encontrada);

    const autor = usuarios.find(u => u.id === encontrada.idEmpleado);
    setRemitente(autor?.nombre || 'Desconocido');
  }, [id, navigate]);

  const handleAceptar = () => {
    alert(`Solicitud de ${remitente} aceptada.`);
    navigate('/Solicitudes');
  };

  const handleDenegar = () => {
    alert(`Solicitud de ${remitente} denegada.`);
    navigate('/Solicitudes');
  };

  if (!solicitud) return null;

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Detalles de la Solicitud</h2>

      <div style={cardStyle}>
        <p><strong>Remitente:</strong> {remitente}</p>
        <p><strong>Asunto:</strong> {solicitud.asunto}</p>
        <p><strong>Hora:</strong> {solicitud.hora}</p>
        <p><strong>Mensaje:</strong></p>
        <p style={mensajeStyle}>{solicitud.mensaje}</p>

        <div style={buttonGroup}>
          <button onClick={handleAceptar} style={btnAceptar}>Aceptar</button>
          <button onClick={handleDenegar} style={btnDenegar}>Denegar</button>
        </div>
      </div>
    </div>
  );
};

export default LeerSolicitud;

const containerStyle = {
  padding: '40px',
  fontFamily: 'Poppins, sans-serif',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  maxWidth: '600px',
  margin: '0 auto',
};

const mensajeStyle = {
  backgroundColor: '#f9f9f9',
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #eee',
  marginTop: '6px',
  whiteSpace: 'pre-wrap',
};

const buttonGroup = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  marginTop: '20px',
};

const btnAceptar = {
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const btnDenegar = {
  backgroundColor: '#dc3545',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};
