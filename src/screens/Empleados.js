import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stiles/Empleados.css';

function Empleados() {
  const navigate = useNavigate();
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const empleadosFiltrados = usuarios.filter(u => u.nivel === 2);
    setEmpleados(empleadosFiltrados);
  }, []);

  return (
    <div className="empleados-container">
      <div className="empleados-box">
        <h2 className="empleados-title">Listado de empleados</h2>
        <button onClick={() => navigate('/empleados/nuevo')} className="empleados-add-button">
          Agregar nuevo empleado
        </button>

        {empleados.length === 0 ? (
          <p className="empleados-empty">No hay empleados registrados.</p>
        ) : (
          <table className="empleados-tabla">
            <thead>
              <tr>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Trabajo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.nombre}</td>
                  <td>{emp.trabajo}</td>
                  <td>
                    <div className="empleados-actions">
                      <button onClick={() => navigate(`/empleados/editar/${emp.id}`)} className="action-button editar">
                        Editar
                      </button>
                      <button onClick={() => navigate(`/empleados/eliminar/${emp.id}`)} className="action-button eliminar">
                        Eliminar
                      </button>
                      <button onClick={() => navigate(`/empleados/asistencia/${emp.id}`)} className="action-button asistencia">
                        Asistencia
                      </button>
                      <button onClick={() => navigate(`/empleados/horario/${emp.id}`)} className="action-button horario">
                        Horario
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Empleados;
