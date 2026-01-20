import React, { useState } from 'react';
import axios from 'axios';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        username_or_email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/login', credentials);
            const { access_token, user } = response.data;

            // Guardar en localStorage
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            onLogin(user);
        } catch (error) {
            const message = error.response?.data?.detail || 'Error al iniciar sesión.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '50%' }}>
                        <LogIn size={32} color="#2563eb" />
                    </div>
                </div>
                <h1>Iniciar Sesión</h1>
                <p className="subtitle">Ingrese sus credenciales para acceder al sistema.</p>

                {error && (
                    <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username_or_email">Usuario o Email</label>
                        <input
                            type="text"
                            id="username_or_email"
                            name="username_or_email"
                            value={credentials.username_or_email}
                            onChange={handleChange}
                            required
                            placeholder="Cédula o Email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            placeholder="********"
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Loader2 className="animate-spin" size={20} />
                                Autenticando...
                            </span>
                        ) : (
                            'Ingresar'
                        )}
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    ¿No tienes cuenta? <a href="/register" style={{ color: '#2563eb' }}>Regístrate aquí</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
