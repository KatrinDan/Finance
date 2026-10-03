import { useState } from "react";
import { login } from "../features/auth/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaEnvelope, FaLock, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError("Failed to login. Please check your credentials.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="card-header">
                    <FaChartLine className="header-icon" />
                    <h2>Login</h2>
                    <p className="subtitle">Track your finances with ease</p>
                </div>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required
                    />
                </div>

                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required
                    />
                    <FaEyeSlash className="password-toggle" />
                    </div>

                    <br /><br />
                    
                <button type="submit" className="btn-submit">
                    Login 
                </button>
            </form>
            <p className="auth-footer">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
        </div>
    );
}