import React, { useState } from 'react';
import { Trophy, Star, Zap, Heart, Camera, MessageCircle, Award, Target, TrendingUp, Users } from 'lucide-react';

const achievements = [
    {
        id: 'first_snap',
        title: 'First Zenith',
        description: 'Take your first zenith',
        icon: Camera,
        color: '#FFFC00',
        unlocked: true,
        progress: 100
    },
    {
        id: 'snap_master',
        title: 'Zenith Master',
        description: 'Take 100 zeniths',
        icon: Star,
        color: '#3CB2E2',
        unlocked: false,
        progress: 45
    },
    {
        id: 'social_butterfly',
        title: 'Social Butterfly',
        description: 'Chat with 10 friends',
        icon: MessageCircle,
        color: '#9B55A0',
        unlocked: false,
        progress: 70
    },
    {
        id: 'streak_legend',
        title: 'Streak Legend',
        description: 'Maintain a 30-day streak',
        icon: Zap,
        color: '#E91429',
        unlocked: false,
        progress: 20
    },
    {
        id: 'story_teller',
        title: 'Story Teller',
        description: 'Post 50 stories',
        icon: Award,
        color: '#FF6B6B',
        unlocked: false,
        progress: 60
    },
    {
        id: 'explorer',
        title: 'Explorer',
        description: 'Visit 20 locations on the map',
        icon: Target,
        color: '#4ECDC4',
        unlocked: false,
        progress: 35
    },
    {
        id: 'viral_star',
        title: 'Viral Star',
        description: 'Get 1000 views on Spotlight',
        icon: TrendingUp,
        color: '#FFE66D',
        unlocked: false,
        progress: 15
    },
    {
        id: 'friend_magnet',
        title: 'Friend Magnet',
        description: 'Have 50 friends',
        icon: Users,
        color: '#A8E6CF',
        unlocked: false,
        progress: 80
    }
];

export default function AchievementsPanel({ onClose }) {
    const [filter, setFilter] = useState('all');

    const filteredAchievements = achievements.filter(a => {
        if (filter === 'unlocked') return a.unlocked;
        if (filter === 'locked') return !a.unlocked;
        return true;
    });

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalPoints = achievements.filter(a => a.unlocked).length * 100;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 2000,
            overflowY: 'auto',
            animation: 'fadeIn 0.3s ease'
        }}>
            {/* Header */}
            <div style={{
                padding: '50px 16px 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h1 style={{ margin: 0, fontSize: 28 }}>Achievements</h1>
                    <div onClick={onClose} style={{ cursor: 'pointer', fontSize: 28 }}>×</div>
                </div>

                <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                    <div>
                        <div style={{ fontSize: 32, fontWeight: 'bold' }}>{unlockedCount}/{achievements.length}</div>
                        <div style={{ fontSize: 12, opacity: 0.8 }}>Unlocked</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 32, fontWeight: 'bold' }}>{totalPoints}</div>
                        <div style={{ fontSize: 12, opacity: 0.8 }}>Points</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div style={{
                    width: '100%',
                    height: 8,
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: 4,
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${(unlockedCount / achievements.length) * 100}%`,
                        height: '100%',
                        background: 'white',
                        transition: 'width 0.5s ease'
                    }} />
                </div>
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex',
                gap: 8,
                padding: '16px',
                background: '#000'
            }}>
                {['all', 'unlocked', 'locked'].map(f => (
                    <div
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 20,
                            background: filter === f ? '#3CB2E2' : '#1c1c1c',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            transition: 'all 0.2s'
                        }}
                    >
                        {f}
                    </div>
                ))}
            </div>

            {/* Achievements Grid */}
            <div style={{ padding: '0 16px 100px' }}>
                {filteredAchievements.map(achievement => {
                    const Icon = achievement.icon;
                    return (
                        <div
                            key={achievement.id}
                            style={{
                                background: achievement.unlocked ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                                borderRadius: 12,
                                padding: 16,
                                marginBottom: 12,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                                opacity: achievement.unlocked ? 1 : 0.6,
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                background: achievement.unlocked ? achievement.color : '#333',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Icon size={28} color={achievement.unlocked ? '#000' : '#666'} />
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 16 }}>
                                    {achievement.title}
                                </div>
                                <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
                                    {achievement.description}
                                </div>

                                {!achievement.unlocked && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{
                                            flex: 1,
                                            height: 4,
                                            background: '#333',
                                            borderRadius: 2,
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${achievement.progress}%`,
                                                height: '100%',
                                                background: achievement.color,
                                                transition: 'width 0.5s ease'
                                            }} />
                                        </div>
                                        <span style={{ fontSize: 11, color: '#888' }}>{achievement.progress}%</span>
                                    </div>
                                )}
                            </div>

                            {achievement.unlocked && (
                                <Trophy size={24} color={achievement.color} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
