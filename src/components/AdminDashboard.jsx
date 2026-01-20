import React, { useState } from 'react';
import axios from 'axios';
import { Search, FileUp, Loader2, CheckCircle2, AlertCircle, User } from 'lucide-react';

const AdminDashboard = () => {
    const [searchCedula, setSearchCedula] = useState('');
    const [searching, setSearching] = useState(false);
    const [foundUser, setFoundUser] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [examTitle, setExamTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearching(true);
        setStatus({ type: '', message: '' });
        setFoundUser(null);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/users/search/${searchCedula}`);
            setFoundUser(response.data);
        } catch (error) {
            setStatus({ type: 'error', message: 'Usuario no encontrado.' });
        } finally {
            setSearching(false);
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile || !foundUser) return;

        setUploading(true);
        setStatus({ type: '', message: '' });

        const formData = new FormData();
        formData.append('title', examTitle);
        formData.append('user_id', foundUser.id);
        formData.append('file', selectedFile);

        try {
            await axios.post('http://127.0.0.1:8000/exams/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatus({ type: 'success', message: '¡Examen cargado correctamente!' });
            setExamTitle('');
            setSelectedFile(null);
            // Reset input file manually
            document.getElementById('file-upload').value = '';
        } catch (error) {
            setStatus({ type: 'error', message: 'Error al cargar el examen.' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container">
            <div className="card" style={{ maxWidth: '800px', width: '100%' }}>
                <h1>Panel de Administrador</h1>
                <p className="subtitle">Cargue los exámenes y resultados para los pacientes.</p>

                {status.message && (
                    <div className={`alert alert-${status.type}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                        {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        {status.message}
                    </div>
                )}

                {/* Fase 1: Buscar Usuario */}
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <input
                            type="text"
                            placeholder="Buscar paciente por cédula..."
                            value={searchCedula}
                            onChange={(e) => setSearchCedula(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={{ width: 'auto', padding: '0 20px' }} disabled={searching}>
                        {searching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                    </button>
                </form>

                {/* Fase 2: Mostrar Usuario y Formulario de Carga */}
                {foundUser && (
                    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', background: '#f9fafb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#2563eb', padding: '10px', borderRadius: '50%' }}>
                                <User size={24} color="white" />
                            </div>
                            <div>
                                <h3 style={{ margin: 0 }}>{foundUser.nombre} {foundUser.apellidos}</h3>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>Cédula: {foundUser.cedula}</p>
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1.5rem 0' }} />

                        <form onSubmit={handleFileUpload}>
                            <div className="form-group">
                                <label>Título del Examen / Resultado</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Biopsia Gástrica, Hemograma..."
                                    value={examTitle}
                                    onChange={(e) => setExamTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Archivo (PDF o Imagen)</label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                    required
                                    accept=".pdf,image/*"
                                />
                            </div>

                            <button type="submit" disabled={uploading}>
                                {uploading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <Loader2 className="animate-spin" size={20} />
                                        Subiendo examen...
                                    </span>
                                ) : (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <FileUp size={20} />
                                        Cargar Examen
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
