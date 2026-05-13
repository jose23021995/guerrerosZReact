import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#242424',
      color: 'white',
      marginBottom: '2rem'
    }}>
      <h2 style={{ margin: 0 }}>DBZ Portal</h2>
      <button 
        onClick={handleLogout}
        style={{ backgroundColor: '#ed8936', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};
