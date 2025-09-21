import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/login.css'

export default function LogIn() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function dataSubmit(e) {
        e.preventDefault();
        console.log("Form submitted:", email);
        
        //api call

        /*
        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();
        console.log("Login successful:", data);

        // 👉 Save token (optional)
        localStorage.setItem("token", data.token);

        // 👉 Redirect to dashboard/home
        navigate("/");
        } catch (err) {
        console.error("Login failed:", err);
        setError(err.message);
        }
        */
    }

    return (
        <form className="login" onSubmit={dataSubmit}>
            <h1>Iniciar Sesión</h1>
            {error && <p>Error</p>}
            <div className="field">
                <p>Email:</p>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="field">
                <p>Contraseña:</p>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <button className="submit" type="submit">Ingresar</button>
            <div>
                <img className="logo"src='/logo.png' alt='Logo'/>
            </div>
        </form>
    );

};