import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-primary)' }}>
      <div className="animate-fade-in" style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: '600' }}>
        Loading InsightAI...
      </div>
    </div>
  );

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
