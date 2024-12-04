import axios from 'axios';
import {useNavigate } from 'react-router-dom'

// const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const URL = 'https://backendlogin-y5dk.onrender.com'


const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No hay token en el almacenamiento');
        return;
      }

      const response = await axios.post(
        `${URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data.message);
      localStorage.removeItem('token');
      navigate('/'); // Redirige al login
      window.location.reload();

    } catch (error) {
      console.error('Error en el logout:', error);
    }
  };
  return (
      <>
        <div className="navbar navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Offcanvas navbar</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  Offcanvas
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Link
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="offcanvasNavbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="offcanvasNavbarDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={handleClick}>
                          Cerrar Sesion
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Navbar;
  