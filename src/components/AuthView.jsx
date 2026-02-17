import React, { useState } from 'react';
import { handleGoogleSignIn } from '../lib/supabase';
import { Sparkles } from 'lucide-react';

export default function AuthView() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSignIn = async () => {
        try {
            setLoading(true);
            setError(null);
            await handleGoogleSignIn();
            // Auth state listener in App.jsx will handle navigation
        } catch (err) {
            setError('Failed to sign in. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            color: '#fff'
        }}>
            <div style={{
                width: 120,
                height: 120,
                borderRadius: 40,
                background: '#FFFC00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 40,
                boxShadow: '0 0 40px rgba(255, 252, 0, 0.3)'
            }}>
                <Sparkles size={60} color="#000" />
            </div>

            <h1 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>Zenith</h1>
            <p style={{ color: '#888', marginBottom: 60, textAlign: 'center' }}>
                The Future of AR Social. <br /> Ephemeral. Private. Real.
            </p>

            {error && (
                <div style={{ color: '#E91429', marginBottom: 20 }}>{error}</div>
            )}

            <button
                onClick={onSignIn}
                disabled={loading}
                style={{
                    width: '100%',
                    maxWidth: 300,
                    padding: '16px',
                    borderRadius: 30,
                    border: 'none',
                    background: '#fff',
                    color: '#000',
                    fontSize: 16,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    opacity: loading ? 0.7 : 1
                }}
            >
                <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    style={{ width: 20, height: 20 }}
                />
                {loading ? 'Connecting...' : 'Continue with Google'}
            </button>

            <p style={{ marginTop: 20, fontSize: 12, color: '#666' }}>
                By continuing, you accept our Terms & Privacy Policy.
            </p>
        </div>
    );
}
