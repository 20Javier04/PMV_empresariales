import React from 'react';
import '../stiles/Home.css'

function Home() {
  const usuario = JSON.parse(localStorage.getItem('usuarioActual'));

  if (!usuario) {
    return <h2>No se ha iniciado sesión correctamente.</h2>;
  }

  const nivelTexto = usuario.nivel === 1 ? 'Administrador' : 'Empleado';

  return (
    <div>
      <h2>Bienvenido a Turnify</h2>
      <h3>
        Hola {usuario.nombre}, su cuenta es de nivel <strong>{nivelTexto}</strong>, lo que le permite:
      </h3>

      {usuario.nivel === 1 ? (
        <>
          <h3>- Administrar los horarios de todos los empleados</h3>
          <h3>- Administrar la asistencia de todos los empleados</h3>
          <h3>- Administrar las solicitudes de los empleados</h3>
        </>
      ) : (
        <>
          <h3>- Ver su horario personal</h3>
          <h3>- Registrar su asistencia</h3>
          <h3>- Enviar solicitudes a administración</h3>
        </>
      )}
    </div>
  );
}

export default Home;
