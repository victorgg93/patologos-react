import { LogOut, FlaskConical } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
    return (
        <nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FlaskConical color="#2563eb" size={24} />
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#1e293b' }}>Patólogos del Cauca</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div className="nav-links">
                    {user?.role_id === 1 ? (
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Modo Administrador</span>
                    ) : (
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Portal del Paciente</span>
                    )}
                </div>
                <button className="btn-logout" onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <LogOut size={16} />
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
