import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthenticationContext";
import "../css/login.css";

export default function LogIn() {
  const { login } = useAuthentication();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const res = await login(email, password);
    if (res) {
      navigate("/");
    } else {
      setError("Credenciales Incorrectas");
    }
  }

  return (
    <div className="login-holder finisher-header">
      <form className="login" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>

        <div className="field">
          <p>Email:</p>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <p>Contraseña:</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit">
          Ingresar
        </button>

        {error && <p className="error">{error}</p>}

        <div>
          <img className="logo" src="/logo.png" alt="Logo" />
        </div>
      </form>
    </div>
  );
}
