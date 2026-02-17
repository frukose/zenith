import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Users, TrendingUp, Eye, Heart, MessageCircle, Share2, Download } from 'lucide-react';

export default function MemoriesPanel({ onClose }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // grid, timeline, map

    // Generate mock memories
    const memories = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        type: ['photo', 'video'][Math.floor(Math.random() * 2)],
        emoji: ['😊', '🎉', '🌟', '❤️', '🎨', '🌈', '🔥', '✨'][Math.floor(Math.random() * 8)],
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 100),
        location: ['New York', 'Paris', 'Tokyo', 'London', 'Sydney'][Math.floor(Math.random() * 5)]
    }));

    const groupedByDate = memories.reduce((acc, memory) => {
        const dateKey = memory.date.toDateString();
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(memory);
        return acc;
    }, {});

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#000',
            zIndex: 2000,
            overflowY: 'auto',
            animation: 'fadeIn 0.3s ease'
        }}>
            {/* Header */}
            <div style={{
                padding: '50px 16px 16px',
                borderBottom: '1px solid #333',
                position: 'sticky',
                top: 0,
                background: '#000',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h1 style={{ margin: 0, fontSize: 24 }}>Memories</h1>
                    <div onClick={onClose} style={{ cursor: 'pointer', fontSize: 28 }}>×</div>
                </div>

                {/* View Mode Selector */}
                <div style={{ display: 'flex', gap: 8 }}>
                    {[
                        { id: 'grid', icon: '▦', label: 'Grid' },
                        { id: 'timeline', icon: '📅', label: 'Timeline' },
                        { id: 'map', icon: '🗺️', label: 'Map' }
                    ].map(mode => (
                        <div
                            key={mode.id}
                            onClick={() => setViewMode(mode.id)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: 20,
                                background: viewMode === mode.id ? '#3CB2E2' : '#1c1c1c',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                transition: 'all 0.2s'
                            }}
                        >
                            <span>{mode.icon}</span>
                            <span>{mode.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
                padding: 16,
                background: 'rgba(255,255,255,0.05)',
                borderBottom: '1px solid #333'
            }}>
                <StatBox icon={Calendar} label="Total" value={memories.length} />
                <StatBox icon={Eye} label="Views" value="12.5K" />
                <StatBox icon={Heart} label="Likes" value="2.3K" />
            </div>

            {/* Content */}
            <div style={{ padding: '16px 16px 100px' }}>
                {viewMode === 'grid' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 4
                    }}>
                        {memories.map(memory => (
                            <div
                                key={memory.id}
                                style={{
                                    aspectRatio: '1',
                                    background: `linear-gradient(135deg, ${getRandomGradient()})`,
                                    borderRadius: 4,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 40,
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {memory.emoji}
                            </div>
                        ))}
                    </div>
                )}

                {viewMode === 'timeline' && (
                    <div>
                        {Object.entries(groupedByDate).map(([date, mems]) => (
                            <div key={date} style={{ marginBottom: 24 }}>
                                <div style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: '#888',
                                    marginBottom: 12,
                                    position: 'sticky',
                                    top: 120,
                                    background: '#000',
                                    padding: '8px 0',
                                    zIndex: 5
                                }}>
                                    {new Date(date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                                    gap: 8
                                }}>
                                    {mems.map(memory => (
                                        <div
                                            key={memory.id}
                                            style={{
                                                aspectRatio: '9/16',
                                                background: `linear-gradient(135deg, ${getRandomGradient()})`,
                                                borderRadius: 8,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: 32,
                                                cursor: 'pointer',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {memory.emoji}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                                padding: '20px 8px 8px',
                                                fontSize: 10
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <Eye size={10} />
                                                    <span>{memory.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {viewMode === 'map' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 12
                    }}>
                        {['New York', 'Paris', 'Tokyo', 'London', 'Sydney'].map(location => {
                            const locationMems = memories.filter(m => m.location === location);
                            return (
                                <div
                                    key={location}
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: 12,
                                        padding: 16,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                        <MapPin size={16} color="#3CB2E2" />
                                        <span style={{ fontWeight: 'bold' }}>{location}</span>
                                    </div>
                                    <div style={{ fontSize: 24, color: '#888' }}>{locationMems.length} memories</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

function StatBox({ icon: Icon, label, value }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 8,
            padding: 12,
            textAlign: 'center'
        }}>
            <Icon size={20} color="#3CB2E2" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 11, color: '#888' }}>{label}</div>
        </div>
    );
}

function getRandomGradient() {
    const gradients = [
        '#667eea 0%, #764ba2 100%',
        '#f093fb 0%, #f5576c 100%',
        '#4facfe 0%, #00f2fe 100%',
        '#43e97b 0%, #38f9d7 100%',
        '#fa709a 0%, #fee140 100%',
        '#30cfd0 0%, #330867 100%'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}
