import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Panel from './Panel';
import Home from './screens/Home';
import Empleados from './screens/Empleados';
import AgregarEmpleado from './screens/AgregarEmpleado';
import EditarEmpleado from './screens/EditarEmpleado';
import EliminarEmpleado from './screens/EliminarEmpleado';
import Asistencia from './screens/Asistencia';
import Horario from './screens/Horario';
import Solicitudes from './screens/Solicitudes';
import EscribirSolicitud from './screens/EscribirSolicitud';
import Login from './screens/Login';
import LeerSolicitud from './screens/LeerSolicitud';
import NotFound from './screens/NotFound';
import RutaProtegida from './data/RutaProtegida';
import './stiles/Navbar.css';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth') === 'true';
  });

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuarioActual'));

  useEffect(() => {
    localStorage.setItem('auth', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('usuarioActual');
    localStorage.removeItem('auth');
    navigate('/');
  };

  return (
    <>
      {isAuthenticated && (
        <header className="navbar">
          <div className="navbar-left">
            <h1 className="navbar-title">Turnify</h1>
            {usuario && <span className="navbar-user">Hola, {usuario.nombre}</span>}
          </div>
          <nav className="navbar-right">
            {usuario?.nivel === 1 ? (
              <>
                <Link to="/empleados" className="navbar-link">Empleados</Link>
                <Link to="/Solicitudes" className="navbar-link">Solicitudes</Link>
              </>
            ) : usuario?.nivel === 2 ? (
              <>
                <Link to={`/empleados/horario/${usuario.id}`} className="navbar-link">Mi Horario</Link>
                <Link to={`/empleados/asistencia/${usuario.id}`} className="navbar-link">Mi Asistencia</Link>
                <Link to="/Solicitudes" className="navbar-link">Mis Solicitudes</Link>
              </>
            ) : null}
            <button onClick={handleLogout} className="navbar-button">Cerrar Sesión</button>
          </nav>
        </header>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/empleados" element={<RutaProtegida element={Empleados} nivelRequerido={1} />} />
          <Route path="/empleados/nuevo" element={<RutaProtegida element={AgregarEmpleado} nivelRequerido={1} />} />
          <Route path="/empleados/editar/:id" element={<RutaProtegida element={EditarEmpleado} nivelRequerido={1} />} />
          <Route path="/empleados/eliminar/:id" element={<RutaProtegida element={EliminarEmpleado} nivelRequerido={1} />} />
          <Route path="/solicitud/:id" element={<RutaProtegida element={LeerSolicitud} />} />
          <Route path="/redactar-solicitud" element={<RutaProtegida element={EscribirSolicitud} />} />
          <Route path="/Solicitudes" element={<RutaProtegida element={Solicitudes} />} />
          <Route path="/empleados/asistencia/:id" element={<RutaProtegida element={Asistencia} />} />
          <Route path="/empleados/horario/:id" element={<RutaProtegida element={Horario} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default AppWrapper;
