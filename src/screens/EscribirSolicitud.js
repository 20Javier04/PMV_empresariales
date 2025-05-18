import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EscribirSolicitud = () => {
  const [asunto, setAsunto] = useState('');
  const [textoSolicitud, setTextoSolicitud] = useState('');
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioActual'));
    setUsuario(user);
  }, []);

  const manejarEnvio = (e) => {
    e.preventDefault();

    const hora = new Date().toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const nuevaSolicitud = {
      id: generarID(),
      idEmpleado: usuario.id,
      asunto: asunto,
      hora: hora,
      mensaje: textoSolicitud
    };

    const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    const actualizadas = [...solicitudes, nuevaSolicitud];
    localStorage.setItem('solicitudes', JSON.stringify(actualizadas));

    alert('Solicitud enviada correctamente.');
    navigate('/Solicitudes');
  };

  const generarID = () => {
    return 'sol-' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="escribir-solicitud-container" style={containerStyle}>
      <h2 style={titleStyle}>Redactar Solicitud</h2>
      <form onSubmit={manejarEnvio} style={formStyle}>
        <label style={labelStyle}>
          Asunto:
          <input
            type="text"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Redactar Solicitud:
          <textarea
            value={textoSolicitud}
            onChange={(e) => setTextoSolicitud(e.target.value)}
            required
            rows={5}
            style={textareaStyle}
          />
        </label>

        <button type="submit" style={submitButton}>Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default EscribirSolicitud;

const containerStyle = {
  padding: '30px',
  fontFamily: 'Poppins, sans-serif',
  maxWidth: '600px',
  margin: '0 auto',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '24px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 'bold',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginTop: '4px',
};

const textareaStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginTop: '4px',
};

const submitButton = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '12px',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
};
