import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Asistencia() {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState(null);
  const [asistencias, setAsistencias] = useState([]);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const encontrado = usuarios.find((u) => u.id === id);
    setEmpleado(encontrado || { id, nombre: 'Empleado desconocido' });

    const diasDelMes = getDaysInCurrentMonth();
    const dataFalsa = diasDelMes.map((dia) => ({
      dia,
      estado: estadoAleatorio()
    }));
    setAsistencias(dataFalsa);
  }, [id]);

  const estadoAleatorio = () => {
    const estados = ['asistio', 'falta', 'justificada'];
    const rand = Math.floor(Math.random() * estados.length);
    return estados[rand];
  };

  const getDaysInCurrentMonth = () => {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    const dias = new Date(año, mes + 1, 0).getDate();
    return Array.from({ length: dias }, (_, i) => i + 1);
  };

  const getColor = (estado) => {
    switch (estado) {
      case 'asistio': return '#007bff'; 
      case 'falta': return '#e74c3c';   
      case 'justificada': return '#f39c12'; 
      default: return '#ccc';
    }
  };

  const nombreMes = new Date().toLocaleString('es-ES', { month: 'long' });

  const totalFaltas = asistencias.filter((a) => a.estado === 'falta').length;
  const totalAsistencias = asistencias.filter((a) => a.estado === 'asistio').length;
  const totalJustificadas = asistencias.filter((a) => a.estado === 'justificada').length;

  return (
    <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
      <h2>Asistencia de {empleado?.nombre}</h2>
      <p>ID del empleado: {empleado?.id}</p>
      <h3 style={{ textTransform: 'capitalize' }}>{nombreMes} {new Date().getFullYear()}</h3>

      <div className="calendario">
        {asistencias.map(({ dia, estado }) => (
          <div
            key={dia}
            className="calendario-dia"
            style={{ backgroundColor: getColor(estado) }}
          >
            {dia}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Leyenda:</h3>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li><span className="leyenda-box" style={{ backgroundColor: '#e74c3c' }}></span> Faltas: {totalFaltas}</li>
          <li><span className="leyenda-box" style={{ backgroundColor: '#007bff' }}></span> Asistencias: {totalAsistencias}</li>
          <li><span className="leyenda-box" style={{ backgroundColor: '#f39c12' }}></span> Faltas Justificadas: {totalJustificadas}</li>
        </ul>
      </div>

      <style>{`
        .calendario {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
          margin-top: 20px;
        }
        .calendario-dia {
          width: 100%;
          padding: 20px 0;
          color: white;
          font-weight: bold;
          text-align: center;
          border-radius: 6px;
        }
        .leyenda-box {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 8px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

export default Asistencia;
