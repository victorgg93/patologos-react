import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        apellidos: '',
        email: '',
        telefono: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('http://127.0.0.1:8000/users/', formData);
            setStatus({
                type: 'success',
                message: '¡Registro exitoso! Tu usuario y contraseña es tu número de cédula.'
            });
            setFormData({ cedula: '', nombre: '', apellidos: '', email: '', telefono: '' });
        } catch (error) {
            const message = error.response?.data?.detail || 'Ocurrió un error inesperado al registrar.';
            setStatus({ type: 'error', message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '50%' }}>
                        <UserPlus size={32} color="#2563eb" />
                    </div>
                </div>
                <h1>Crear Cuenta</h1>
                <p className="subtitle">Ingrese los datos del paciente para registrarlo en el sistema.</p>

                {status.message && (
                    <div className={`alert alert-${status.type}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cedula">Número de Cédula</label>
                        <input
                            type="text"
                            id="cedula"
                            name="cedula"
                            value={formData.cedula}
                            onChange={handleChange}
                            required
                            placeholder="Ej: 12345678"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                                placeholder="Apellidos"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="correo@ejemplo.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono (Opcional)</label>
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Ej: 300 000 0000"
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Loader2 className="animate-spin" size={20} />
                                Registrando...
                            </span>
                        ) : (
                            'Registrar Paciente'
                        )}
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    ¿Ya tienes cuenta? <a href="/login" style={{ color: '#2563eb' }}>Inicia sesión aquí</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
