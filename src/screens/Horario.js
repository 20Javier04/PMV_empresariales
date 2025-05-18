import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Horario() {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const encontrado = usuarios.find((u) => u.id === id);
    setEmpleado(encontrado || { id, nombre: 'Empleado desconocido' });
  }, [id]);

  const horas = [
    '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'
  ];

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
      <h2>Horario de {empleado?.nombre}</h2>
      <p>ID del empleado: {empleado?.id}</p>

      <table>
        <thead>
          <tr>
            <th>Hora</th>
            {dias.map((dia, index) => (
              <th key={index}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horas.map((hora, i) => (
            <tr key={i}>
              <td>{hora}</td>
              {dias.map((dia, j) => (
                <td key={j}>vacío</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
}

export default Horario;
