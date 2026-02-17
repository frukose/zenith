import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyView({ onBack }) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#fff',
            color: '#000',
            overflowY: 'auto',
            padding: '20px',
            position: 'relative',
            zIndex: 20
        }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <div onClick={onBack} style={{ cursor: 'pointer', padding: 10 }}>
                    <ArrowLeft size={24} />
                </div>
                <h1 style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 10 }}>Privacy Policy</h1>
            </div>

            <div style={{ padding: '0 10px' }}>
                <section style={{ marginBottom: 30 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#E91429' }}>The Zenith Promise: Data Deletion</h2>
                    <p style={{ lineHeight: 1.6, color: '#333' }}>
                        Zenith is <strong>Ephemeral by Design</strong>. All multimedia content (Snaps) is stored only in temporary memory or on encrypted cloud buffers.
                        Once a message is marked as read, our PostgreSQL Deletion Trigger immediately purges the record and the associated media from our servers.
                        We do not retain your conversations history.
                    </p>
                </section>

                <section style={{ marginBottom: 30 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#3CB2E2' }}>Spatial Privacy (The Blurred Map)</h2>
                    <p style={{ lineHeight: 1.6, color: '#333' }}>
                        We use your location only for the "Friend Map." If <strong>Blurred Mode</strong> is active, Zenith uses the ST_Buffer algorithm
                        to offset your location by a randomized 300m–500m radius, ensuring your precise location is never exposed to non-Close Friends.
                    </p>
                </section>

                <section style={{ marginBottom: 30 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#FFFC00', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>On-Device AR Intelligence</h2>
                    <p style={{ lineHeight: 1.6, color: '#333' }}>
                        AR Lenses (including "Neon Head-Dodge") process your facial landmarks locally using on-device computer vision.
                        Zenith never uploads raw biometric data or facial maps to the cloud. Your face data stays on your device.
                    </p>
                </section>

                <section style={{ marginTop: 50, borderTop: '1px solid #eee', paddingTop: 20 }}>
                    <p style={{ fontSize: 12, color: '#999' }}>Last Updated: 2026</p>
                </section>
            </div>
        </div>
    );
}
