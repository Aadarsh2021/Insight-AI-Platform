import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, PlusCircle, History, LogOut, Search, Clock, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HistoryItem {
  id: string;
  created_at: string;
  result_text: string;
  ai_model: string;
  saas_user_inputs: {
    content: string;
    input_type: string;
  };
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('saas_results')
      .select('*, saas_user_inputs(content, input_type)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) setHistory(data as any || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="dashboard-grid">
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: '8px' }}>
            <LayoutDashboard size={20} color="white" />
          </div>
          <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>InsightAI</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/dashboard" className="btn btn-secondary" style={{ border: 'none', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>
            <History size={18} /> History
          </Link>
          <Link to="/input" className="btn btn-secondary" style={{ border: 'none', justifyContent: 'flex-start' }}>
            <PlusCircle size={18} /> New Analysis
          </Link>
          <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <button onClick={handleSignOut} className="btn btn-secondary" style={{ width: '100%', border: 'none', justifyContent: 'flex-start', color: 'var(--error)' }}>
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h2>Dashboard</h2>
            <p>Welcome back, {user?.email}</p>
          </div>
          <div className="glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search history..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none' }} />
          </div>
        </header>

        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="glass" style={{ padding: '1.5rem' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Analyses</p>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>{history.length}</div>
          </div>
          <div className="glass" style={{ padding: '1.5rem' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Plan</p>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-primary)' }}>Free</div>
          </div>
        </div>

        <section>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} color="var(--accent-primary)" /> Recent Activity
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {loading ? (
              <p>Loading history...</p>
            ) : history.length > 0 ? (
              history.map((item) => (
                <Link to={`/results?id=${item.id}`} key={item.id} className="glass" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit', transition: 'var(--transition)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '10px' }}>
                      <FileText size={20} color="var(--text-secondary)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600' }}>Analysis #{item.id.slice(0, 8)}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {new Date(item.created_at).toLocaleDateString()} • {item.saas_user_inputs?.input_type}
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>View</button>
                </Link>
              ))
            ) : (
              <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
                <p>No analysis history found. Start your first one!</p>
                <Link to="/input" className="btn btn-primary" style={{ marginTop: '1rem', textDecoration: 'none' }}>New Analysis</Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
