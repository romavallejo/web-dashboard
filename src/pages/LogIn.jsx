import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthenticationContext";
import '../css/login.css'

export default function LogIn() {

    const {login} = useAuthentication();
    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);

    async function dataSubmit() {
        setError(null)
        const res = await login(email,password);
        if (res) navigate("/");
        else setError("Credenciales Incorrectas");
    }

    return (
        <div className="login-holder finisher-header">
            <div className="login">
                <h1>Iniciar Sesión</h1>
                <div className="field">
                    <p>Email:</p>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="field">
                    <p>Contraseña:</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className="submit" onClick={dataSubmit}>Ingresar</button>

                {error && <p>{error}</p>}

                <div>
                    <img className="logo"src='/logo.png' alt='Logo'/>
                </div>
            </div>
        </div>
    );

};