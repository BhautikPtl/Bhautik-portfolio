import React, { useState, useRef, useEffect } from 'react';
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import { messagesAPI } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          el.querySelectorAll('.reveal').forEach(r => r.classList.add('in'));
        }
      }),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await messagesAPI.create(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--bg)',
    border: '1px solid var(--line-strong)',
    borderRadius: 10,
    padding: '12px 16px',
    color: 'var(--txt)',
    fontSize: '.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: '.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '.78rem',
    color: 'var(--muted)',
    fontFamily: "'JetBrains Mono', monospace",
    textTransform: 'uppercase',
    letterSpacing: '.1em',
    marginBottom: 8,
  };

  return (
    <section id="contact" ref={sectionRef}>
      <div className="wrap">
        {/* CTA Box */}
        <div
          className="cta-box reveal"
          style={{
            marginBottom: 64,
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius)',
            padding: 32,
          }}
        >
          <h2>
            Ready to build something{' '}
            <span style={{
              background: 'linear-gradient(120deg, var(--accent), var(--accent-2))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              great?
            </span>
          </h2>
          <p>
            Whether it's a new project, a quick question, or a collaboration opportunity — I'm available
            and ready to build. Let's talk.
          </p>
          <div className="cta-buttons" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', background: 'transparent' }}>
            <a href="mailto:vachhanib485@gmail.com" className="btn btn-primary">
              Send an Email →
            </a>
            <a href="https://www.linkedin.com/in/bhautik-vachhani-427540304" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Contact Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 32 }}>
          {/* Left: contact info */}
          <div className="reveal" style={{
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius)',
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', marginBottom: 24 }}>
              Get in Touch
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 44, height: 44,
                  background: 'linear-gradient(135deg, rgba(94,234,212,.16), rgba(124,131,255,.16))',
                  border: '1px solid var(--line-strong)',
                  borderRadius: 12,
                  display: 'grid', placeItems: 'center',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '.78rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>Email</div>
                  <div style={{ color: 'var(--txt)', fontSize: '.95rem' }}>vachhanib485@gmail.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 44, height: 44,
                  background: 'linear-gradient(135deg, rgba(94,234,212,.16), rgba(124,131,255,.16))',
                  border: '1px solid var(--line-strong)',
                  borderRadius: 12,
                  display: 'grid', placeItems: 'center',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '.78rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>Location</div>
                  <div style={{ color: 'var(--txt)', fontSize: '.95rem' }}>Junagadh, Gujarat, India</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', gap: 12 }}>
              <a
                href="https://github.com/BhautikPtl"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/bhautik-vachhani-427540304"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal" style={{
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius)',
            padding: 32,
          }}>
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '40px 0', gap: 16 }}>
                <div style={{
                  width: 72, height: 72,
                  background: 'rgba(94,234,212,.15)',
                  borderRadius: '50%',
                  display: 'grid', placeItems: 'center',
                  color: 'var(--accent)',
                  border: '1px solid rgba(94,234,212,.3)',
                }}>
                  <CheckCircle size={34} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--muted)', maxWidth: 320, fontSize: '.95rem' }}>
                  Thank you for reaching out. I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn btn-ghost"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', marginBottom: 4 }}>
                  Send a Message
                </h3>

                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--line-strong)'}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--line-strong)'}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--line-strong)'}
                  />
                </div>

                {status === 'error' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f87171', fontSize: '.9rem' }}>
                    <AlertCircle size={16} /> Failed to send. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary"
                  style={{ justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  {status === 'loading' ? 'Sending...' : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .wrap > div[style*="grid"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
