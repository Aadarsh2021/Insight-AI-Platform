import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Share2, Copy, Download, Sparkles, RefreshCcw } from 'lucide-react';

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchResult();
  }, [id]);

  const fetchResult = async () => {
    const { data, error } = await supabase
      .from('saas_results')
      .select('*, saas_user_inputs(content)')
      .eq('id', id)
      .single();

    if (!error) setData(data);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.result_text);
    alert('Result copied to clipboard!');
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <RefreshCcw className="animate-spin" color="var(--accent-primary)" size={48} />
    </div>
  );

  if (!data) return <div className="container section">Result not found.</div>;

  return (
    <div className="container section" style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ border: 'none' }}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={copyToClipboard} className="btn btn-secondary"><Copy size={18} /> Copy</button>
          <button className="btn btn-secondary"><Download size={18} /> Export</button>
          <button className="btn btn-primary"><Share2 size={18} /> Share</button>
        </div>
      </div>

      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
          <Sparkles size={24} />
          <span style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Intelligence Report</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Analysis Results</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Generated on {new Date(data.created_at).toLocaleString()}</p>
      </div>

      <div className="glass" style={{ padding: '3rem', marginBottom: '3rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
        {data.result_text.split('\n').map((para: string, i: number) => (
          <p key={i} style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{para}</p>
        ))}
      </div>

      <div style={{ padding: '2rem', borderTop: '1px solid var(--glass-border)' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Original Input</h3>
        <div className="glass" style={{ padding: '1.5rem', opacity: 0.6, maxHeight: '200px', overflowY: 'auto', fontSize: '0.9rem' }}>
          {data.saas_user_inputs?.content}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
