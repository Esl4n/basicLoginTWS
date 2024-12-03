import { useState } from "react";
import './Login.css'
import Home from "./Home";

const Login = () => {
    
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const[isLogin,setIsLogin] = useState<boolean>(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const data ={
            user:user,
            password:password,
        };

        // useEffect(()=>{
        // },[])
        fetch('http://localhost:8000/login',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(data =>
             data.json()
            )
        .then(res =>{
            if (res.token){
                localStorage.setItem('token',res.token)

                setIsLogin(true)

            } else {
                setIsLogin(false)
             }
        })
        .catch(err =>{
            console.log(err)
        })

    };

    return (
        <>{isLogin ? <Home/> :
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
                </form>

            </div>
}
                    </>
    );
};

export default Login;
