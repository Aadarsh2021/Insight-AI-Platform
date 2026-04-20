import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FileUp, Sparkles, Loader2, ArrowLeft } from 'lucide-react';

const InputPage = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          userId: user?.id,
          type: 'text'
        })
      });

      const data = await response.json();
      if (data.success) {
        navigate(`/results?id=${data.data.result.id}`);
      } else {
        throw new Error(data.error);
      }
    } catch (err: unknown) {
      const error = err as Error;
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '2rem', border: 'none' }}>
        <ArrowLeft size={18} /> Back
      </button>

      <div style={{ marginBottom: '3rem' }}>
        <h1>New Analysis</h1>
        <p>Paste your text or upload a document to get AI-powered insights.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="glass" style={{ padding: '1.5rem' }}>
          <textarea 
            placeholder="Paste your content here (articles, reports, notes...)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ 
              width: '100%', 
              minHeight: '300px', 
              background: 'transparent', 
              border: 'none', 
              color: 'white', 
              fontSize: '1.1rem', 
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', cursor: 'pointer' }}>
              <FileUp size={20} /> Upload File (PDF, DOCX)
              <input type="file" style={{ display: 'none' }} />
            </label>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading || !content.trim()} style={{ flex: 1, padding: '1rem' }}>
            {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={20} /> Process with AI</>}
          </button>
        </div>
      </form>
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.05)', border: '1px dashed var(--accent-primary)' }}>
        <p style={{ fontSize: '0.9rem', textAlign: 'center' }}>
          <Sparkles size={14} /> Tip: Longer and more detailed content provides better analysis results.
        </p>
      </div>
    </div>
  );
};

export default InputPage;
