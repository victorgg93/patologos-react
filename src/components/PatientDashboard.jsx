import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Download, Loader2, Calendar, User } from 'lucide-react';

const PatientDashboard = ({ user }) => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/exams/user/${user.id}`);
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching exams:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchExams();
    }, [user]);

    return (
        <div className="container">
            <div className="card" style={{ maxWidth: '900px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1>Mis Exámenes</h1>
                        <p className="subtitle">Consulte y descargue sus resultados de laboratorio.</p>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ margin: 0, fontWeight: 'bold' }}>{user.nombre} {user.apellidos}</p>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>ID: {user.cedula}</p>
                        </div>
                        <div style={{ background: '#f3f4f6', padding: '8px', borderRadius: '50%' }}>
                            <User size={20} color="#374151" />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                        <Loader2 className="animate-spin" size={40} color="#2563eb" />
                    </div>
                ) : exams.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '2px dashed #e5e7eb', borderRadius: '16px' }}>
                        <FileText size={48} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
                        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Aún no tienes exámenes cargados en el sistema.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {exams.map((exam) => (
                            <div key={exam.id} className="exam-card" style={{
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                transition: 'all 0.2s ease',
                                background: 'white'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '10px' }}>
                                        <FileText size={24} color="#2563eb" />
                                    </div>
                                    <a
                                        href={`http://127.0.0.1:8000/view-exams/${exam.filename}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            background: '#f3f4f6',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            color: '#374151',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        title="Descargar"
                                    >
                                        <Download size={18} />
                                    </a>
                                </div>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{exam.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '0.85rem' }}>
                                    <Calendar size={14} />
                                    <span>{new Date(exam.upload_date).toLocaleDateString()}</span>
                                </div>
                                <button
                                    onClick={() => window.open(`http://127.0.0.1:8000/view-exams/${exam.filename}`, '_blank')}
                                    style={{
                                        marginTop: '1.5rem',
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '0.9rem',
                                        background: '#2563eb',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Ver Resultado
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .exam-card:hover {
                    border-color: #2563eb !important;
                    transform: translateY(-4px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
};

export default PatientDashboard;
