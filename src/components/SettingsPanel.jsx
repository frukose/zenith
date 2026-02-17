import React, { useState, useEffect } from 'react';
import { X, Settings, Moon, Sun, Volume2, VolumeX, Vibrate, Bell, Lock, Download, Trash2, User, Camera, Award, TrendingUp, Image } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AchievementsPanel from './AchievementsPanel';
import MemoriesPanel from './MemoriesPanel';
import PrivacyView from './PrivacyView';

export default function SettingsPanel({ onClose }) {
    const {
        theme,
        toggleTheme,
        soundEnabled,
        setSoundEnabled,
        hapticsEnabled,
        setHapticsEnabled,
        user,
        savedZeniths,
        memories
    } = useAppContext();

    const [activeTab, setActiveTab] = useState('general');
    const [showAchievements, setShowAchievements] = useState(false);
    const [showMemories, setShowMemories] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    if (showPrivacyPolicy) {
        return <PrivacyView onBack={() => setShowPrivacyPolicy(false)} />;
    }

    if (showAchievements) {
        return <AchievementsPanel onClose={() => setShowAchievements(false)} />;
    }

    if (showMemories) {
        return <MemoriesPanel onClose={() => setShowMemories(false)} />;
    }

    const tabs = [
        { id: 'general', name: 'General', icon: Settings },
        { id: 'privacy', name: 'Privacy', icon: Lock },
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'stats', name: 'Stats', icon: TrendingUp }
    ];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: theme === 'dark' ? '#000' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
                overflowY: 'auto'
            }}>
                {/* Header */}
                <div style={{
                    padding: '50px 16px 16px',
                    borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1 style={{ margin: 0, fontSize: 24 }}>Settings</h1>
                    <div onClick={onClose} style={{ cursor: 'pointer' }}>
                        <X size={28} />
                    </div>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    gap: 8,
                    padding: '16px',
                    overflowX: 'auto',
                    borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`
                }}>
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <div
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 20,
                                    background: activeTab === tab.id ? '#3CB2E2' : 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Icon size={18} />
                                <span>{tab.name}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Content */}
                <div style={{ padding: '16px' }}>
                    {activeTab === 'general' && (
                        <div>
                            <SettingItem
                                icon={theme === 'dark' ? Moon : Sun}
                                title="Theme"
                                description={`${theme === 'dark' ? 'Dark' : 'Light'} mode`}
                                action={
                                    <div
                                        onClick={toggleTheme}
                                        style={{
                                            width: 50,
                                            height: 28,
                                            borderRadius: 14,
                                            background: theme === 'dark' ? '#3CB2E2' : '#ccc',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <div style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            background: 'white',
                                            position: 'absolute',
                                            top: 2,
                                            left: theme === 'dark' ? 24 : 2,
                                            transition: 'all 0.3s'
                                        }} />
                                    </div>
                                }
                            />

                            <SettingItem
                                icon={soundEnabled ? Volume2 : VolumeX}
                                title="Sound Effects"
                                description="Play sounds for interactions"
                                action={
                                    <div
                                        onClick={() => setSoundEnabled(!soundEnabled)}
                                        style={{
                                            width: 50,
                                            height: 28,
                                            borderRadius: 14,
                                            background: soundEnabled ? '#3CB2E2' : '#ccc',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <div style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            background: 'white',
                                            position: 'absolute',
                                            top: 2,
                                            left: soundEnabled ? 24 : 2,
                                            transition: 'all 0.3s'
                                        }} />
                                    </div>
                                }
                            />

                            <SettingItem
                                icon={Vibrate}
                                title="Haptic Feedback"
                                description="Vibrate on interactions"
                                action={
                                    <div
                                        onClick={() => setHapticsEnabled(!hapticsEnabled)}
                                        style={{
                                            width: 50,
                                            height: 28,
                                            borderRadius: 14,
                                            background: hapticsEnabled ? '#3CB2E2' : '#ccc',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <div style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            background: 'white',
                                            position: 'absolute',
                                            top: 2,
                                            left: hapticsEnabled ? 24 : 2,
                                            transition: 'all 0.3s'
                                        }} />
                                    </div>
                                }
                            />
                        </div>
                    )}

                    {activeTab === 'privacy' && (
                        <div>
                            <SettingItem
                                icon={Bell}
                                title="Notifications"
                                description="Manage notification preferences"
                            />
                            <SettingItem
                                icon={Lock}
                                title="Ghost Mode"
                                description="Hide your location on the map"
                            />
                            <SettingItem
                                icon={Camera}
                                title="Screenshot Alerts"
                                description="Notify when someone screenshots"
                            />
                            <SettingItem
                                icon={Lock}
                                title="Privacy Policy"
                                description="Read our Data Safety & Privacy Promise"
                                action={
                                    <div
                                        onClick={() => setShowPrivacyPolicy(true)}
                                        style={{
                                            padding: '6px 12px',
                                            background: '#3CB2E2',
                                            borderRadius: 12,
                                            fontSize: 12,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        View
                                    </div>
                                }
                            />
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div>
                            <div style={{
                                textAlign: 'center',
                                padding: '24px 0',
                                borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`
                            }}>
                                <div style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    margin: '0 auto 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 40
                                }}>
                                    {user.avatar}
                                </div>
                                <h2 style={{ margin: '0 0 8px' }}>{user.name}</h2>
                                <p style={{ margin: 0, color: '#888' }}>@{user.name.toLowerCase()}</p>
                            </div>

                            <SettingItem
                                icon={Download}
                                title="Saved Snaps"
                                description={`${savedZeniths.length} zeniths saved`}
                            />
                            <SettingItem
                                icon={Image}
                                title="Memories"
                                description={`${memories.length} memories`}
                                action={
                                    <div
                                        onClick={() => setShowMemories(true)}
                                        style={{
                                            padding: '6px 12px',
                                            background: '#3CB2E2',
                                            borderRadius: 12,
                                            fontSize: 12,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        View
                                    </div>
                                }
                            />
                            <SettingItem
                                icon={Award}
                                title="Achievements"
                                description="View your progress"
                                action={
                                    <div
                                        onClick={() => setShowAchievements(true)}
                                        style={{
                                            padding: '6px 12px',
                                            background: '#FFFC00',
                                            color: '#000',
                                            borderRadius: 12,
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        View
                                    </div>
                                }
                            />
                        </div>
                    )}

                    {activeTab === 'stats' && (
                        <div>
                            <StatCard
                                icon={Award}
                                title="Zenith Score"
                                value={user.zenithScore.toLocaleString()}
                                color="#FFFC00"
                            />
                            <StatCard
                                icon={TrendingUp}
                                title="Streaks"
                                value={user.streaks}
                                color="#E91429"
                            />
                            <StatCard
                                icon={User}
                                title="Best Friends"
                                value={user.bestFriends.length}
                                color="#3CB2E2"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SettingItem({ icon: Icon, title, description, action }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <Icon size={24} style={{ marginRight: 16, color: '#3CB2E2' }} />
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{title}</div>
                {description && <div style={{ fontSize: 12, color: '#888' }}>{description}</div>}
            </div>
            {action}
        </div>
    );
}

function StatCard({ icon: Icon, title, value, color }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 12,
            padding: 20,
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 16
        }}>
            <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon size={24} color="#000" />
            </div>
            <div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 28, fontWeight: 'bold' }}>{value}</div>
            </div>
        </div>
    );
}
