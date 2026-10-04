import { useState, type FormEvent } from "react";
import { register } from "../features/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEnvelope, FaLock, FaEyeSlash, FaChartLine } from "react-icons/fa";
import "./Register.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success,setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await register(email, password);
            setLoading(false);
            setSuccess (true);
             setTimeout(() => {
             navigate("/login");
             }, 2500);
        } catch (err) {
            setLoading(false);
        }
    };

    return (
        
            <div className="register-page">
                {success &&(
                    <div className="toast-success">
                        <div className="icon"><FaCheckCircle/></div>
                        <div>
                            <h4>Registration successful</h4>
                            <p>Welcome!Your account is ready</p>
                            </div>
                          </div>
                )}
            <div className="register-card">
                <div className="card-header">
                    <FaChartLine className="header-icon" />
                    <h2>Register</h2>
                    <p className="subtitle">Create an account to start tracking your finances</p>
                </div>
            <form onSubmit={handleSubmit}>
                < div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                < div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required
                    />
                    <FaEyeSlash className="password-toggle" />
                </div>

                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required
                    />
                    <FaEyeSlash className="password-toggle" />
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
            </div>
            </div>
        
    );
}