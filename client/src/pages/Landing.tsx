import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="landing-page">
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles color="var(--accent-primary)" />
          <span>InsightAI</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Login</Link>
          <Link to="/signup" className="btn btn-primary" style={{ textDecoration: 'none' }}>Get Started</Link>
        </div>
      </nav>

      <section className="container section" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1 className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
          Scale Your Intelligence <br /> 
          <span style={{ background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Powered by Gemini AI
          </span>
        </h1>
        <p className="animate-fade-in" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem', opacity: 0.8 }}>
          Transform complex data into actionable insights in seconds. The ultimate AI assistant for your professional workflow.
        </p>
        <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <Link to="/signup" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Start for Free <ArrowRight size={20} />
          </Link>
          <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            View Demo
          </button>
        </div>
      </section>

      <section className="container section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2.5rem' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Zap color="var(--accent-primary)" />
          </div>
          <h3>Lightning Fast</h3>
          <p>Real-time processing and analysis using state-of-the-art AI models.</p>
        </div>
        <div className="glass" style={{ padding: '2.5rem' }}>
          <div style={{ background: 'rgba(168, 85, 247, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Shield color="var(--accent-secondary)" />
          </div>
          <h3>Secure & Private</h3>
          <p>Your data is encrypted and protected with enterprise-grade security via Supabase.</p>
        </div>
        <div className="glass" style={{ padding: '2.5rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Sparkles color="#fff" />
          </div>
          <h3>Intelligent Insights</h3>
          <p>Get recommendations that matter, tailored to your specific input and context.</p>
        </div>
      </section>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
        <p>&copy; 2026 InsightAI Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
