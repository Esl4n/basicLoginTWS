import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Estaciones from './pages/Estaciones';
import Navbar from './components/Navbar';
function App() {


// Define la interfaz para el payload del JWT
interface JwtPayload {
  sub?: string;
  name?: string;
  iat?: number;
  exp?: number;
  [key: string]: any; // Permite claves adicionales si no conoces todos los campos
}

// Función tipada para decodificar el JWT
function parseJwt(token: string): JwtPayload {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
      window.atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
  );

  return JSON.parse(jsonPayload) as JwtPayload; // Indica que el resultado será del tipo JwtPayload
}



const rawToken = localStorage.getItem('token');
let tokenExist = false;

if (rawToken) {
  try {
      const decodedToken = parseJwt(rawToken);

      if (decodedToken.exp && typeof decodedToken.exp === 'number') {
          tokenExist = decodedToken.exp * 1000 > Date.now();
      }
  } catch (error) {
      console.error('Error al decodificar el token:', error);
  }
}




  return (
    <>  
    <Router>
      {
        tokenExist ?
        <>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/estaciones' element={<Estaciones/>}/>
        </Routes>
        </>
        :
        <>
          <Routes>
            <Route path='/' element={<Login/>}/>
          </Routes> 
        </>
   

      }
      
    </Router>
    </>
  )
}

export default App
