import React, { useState } from 'react';
import { Plus, Lock, Play } from 'lucide-react';

const friendStories = [
    { id: 1, user: 'Sarah', avatar: '😎', hasNew: true, color: '#FF6B6B' },
    { id: 2, user: 'Mike', avatar: '🎮', hasNew: true, color: '#4ECDC4' },
    { id: 3, user: 'Jessica', avatar: '🌸', hasNew: false, color: '#95E1D3' },
    { id: 4, user: 'David', avatar: '⚡', hasNew: true, color: '#FFE66D' },
    { id: 5, user: 'Emma', avatar: '🎨', hasNew: false, color: '#A8E6CF' },
];

const discoverStories = [
    { id: 1, publisher: 'Daily News', category: 'News', img: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '📰' },
    { id: 2, publisher: 'Comedy Central', category: 'Comedy', img: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: '😂' },
    { id: 3, publisher: 'Sports Zone', category: 'Sports', img: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '⚽' },
    { id: 4, publisher: 'Food Network', category: 'Food', img: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', icon: '🍕' },
    { id: 5, publisher: 'Travel Guide', category: 'Travel', img: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', icon: '✈️' },
    { id: 6, publisher: 'Tech Today', category: 'Tech', img: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', icon: '💻' },
];

export default function StoriesView() {
    const [selectedStory, setSelectedStory] = useState(null);
    const [storyProgress, setStoryProgress] = useState(0);

    const viewStory = (story) => {
        setSelectedStory(story);
        setStoryProgress(0);

        // Simulate story progress
        const interval = setInterval(() => {
            setStoryProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setSelectedStory(null);
                    return 0;
                }
                return prev + 2;
            });
        }, 100);
    };

    if (selectedStory) {
        return (
            <div
                onClick={() => setSelectedStory(null)}
                style={{
                    height: '100%',
                    background: selectedStory.img || selectedStory.color,
                    position: 'relative',
                    cursor: 'pointer'
                }}
            >
                {/* Progress Bar */}
                <div style={{
                    position: 'absolute',
                    top: 50,
                    left: 0,
                    right: 0,
                    padding: '0 8px',
                    zIndex: 10
                }}>
                    <div style={{
                        width: '100%',
                        height: 3,
                        background: 'rgba(255,255,255,0.3)',
                        borderRadius: 2
                    }}>
                        <div style={{
                            width: `${storyProgress}%`,
                            height: '100%',
                            background: 'white',
                            borderRadius: 2,
                            transition: 'width 0.1s linear'
                        }} />
                    </div>
                </div>

                {/* Story Header */}
                <div style={{
                    position: 'absolute',
                    top: 70,
                    left: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    zIndex: 10
                }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20
                    }}>
                        {selectedStory.avatar || selectedStory.icon}
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{selectedStory.user || selectedStory.publisher}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>2h ago</div>
                    </div>
                </div>

                {/* Story Content */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    fontSize: 64
                }}>
                    {selectedStory.avatar || selectedStory.icon}
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: 120,
                    left: 16,
                    right: 16,
                    color: 'white',
                    fontSize: 14
                }}>
                    <p>Tap to close story</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '60px 16px 100px', background: '#000', height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h1 style={{ fontSize: 24, margin: 0 }}>Stories</h1>
                <Lock size={20} color="#888" />
            </div>

            {/* My Story */}
            <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>My Story</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        cursor: 'pointer'
                    }}>
                        <Plus size={32} color="white" />
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold' }}>Add to Story</div>
                        <div style={{ fontSize: 12, color: '#888' }}>Share a moment</div>
                    </div>
                </div>
            </div>

            {/* Friends Stories */}
            <h3 style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>Friends</h3>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, marginBottom: 24 }}>
                {friendStories.map(story => (
                    <div
                        key={story.id}
                        onClick={() => viewStory(story)}
                        style={{
                            minWidth: 80,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{
                            width: 72,
                            height: 72,
                            borderRadius: '50%',
                            border: story.hasNew ? `3px solid ${story.color}` : '3px solid #333',
                            padding: 3,
                            background: '#000'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: story.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 32
                            }}>
                                {story.avatar}
                            </div>
                        </div>
                        <span style={{ fontSize: 12, marginTop: 6, color: story.hasNew ? '#fff' : '#888' }}>
                            {story.user}
                        </span>
                    </div>
                ))}
            </div>

            {/* Discover */}
            <h3 style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>Discover</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {discoverStories.map(story => (
                    <div
                        key={story.id}
                        onClick={() => viewStory(story)}
                        style={{
                            height: 240,
                            background: story.img,
                            borderRadius: 12,
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: 48
                        }}>
                            {story.icon}
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: 12,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                        }}>
                            <div style={{ fontWeight: 'bold', fontSize: 14 }}>{story.publisher}</div>
                            <div style={{ fontSize: 11, color: '#ccc' }}>{story.category}</div>
                        </div>
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Play size={14} color="white" fill="white" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
