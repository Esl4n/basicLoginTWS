import { useState } from "react";
import './Login.css'
import Home from "./Home";
const URl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const Login = () => {
    
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean | null>(null); // null para manejar estado inicial

    const [errorMessage, setErrorMessage] = useState<string>(""); // Para manejar el mensaje de error

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const data = {
            user: user,
            password: password
        };

        fetch(`${URl}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(data => data.json())
        .then(res => {
            if (res.token) {
                localStorage.setItem('token', res.token);
                setIsLogin(true);
                setErrorMessage(""); // Limpiar mensaje de error si el login es exitoso
            } else {
                console.log(res.message);
                setIsLogin(false);
                setErrorMessage("El nombre de usuario o la contraseña es incorrecto."); // Mostrar mensaje de error
            }
        })
        .catch(err => {
            console.log(err);
            setErrorMessage("Hubo un error al intentar iniciar sesión.");
        });
    };

    return (
        <>
            {isLogin ? <Home /> : 
                <div>
                    <h1>Log In</h1>
                    <form>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            placeholder="Enter your user name"
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <button onClick={handleClick}>LogIn</button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mostrar el mensaje de error */}
                    </form>
                </div>
            }
        </>
    );
};

export default Login;
