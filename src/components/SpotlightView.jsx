import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Volume2, VolumeX, Play, Pause } from 'lucide-react';

const spotlightVideos = [
    {
        id: 1,
        creator: 'TechGuru',
        avatar: '🎮',
        description: 'Amazing tech hack you need to try! #tech #viral',
        likes: '1.2M',
        comments: '5.2k',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        id: 2,
        creator: 'FoodieLife',
        avatar: '🍕',
        description: 'Best pizza recipe ever! 🍕 #cooking #food',
        likes: '890K',
        comments: '3.1k',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        id: 3,
        creator: 'FitnessKing',
        avatar: '💪',
        description: '30-day transformation challenge! #fitness #motivation',
        likes: '2.1M',
        comments: '8.9k',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        id: 4,
        creator: 'TravelBug',
        avatar: '✈️',
        description: 'Hidden gems in Bali you must visit! #travel #adventure',
        likes: '1.5M',
        comments: '6.3k',
        color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        id: 5,
        creator: 'ComedyGold',
        avatar: '😂',
        description: 'When your code finally works... #programming #funny',
        likes: '3.2M',
        comments: '12k',
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
];

export default function SpotlightView() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const [muted, setMuted] = useState(true);
    const containerRef = useRef(null);
    const touchStartY = useRef(0);

    const currentVideo = spotlightVideos[currentIndex];

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY.current - touchEndY;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < spotlightVideos.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setLiked(false);
            } else if (diff < 0 && currentIndex > 0) {
                setCurrentIndex(prev => prev - 1);
                setLiked(false);
            }
        }
    };

    const handleWheel = (e) => {
        if (e.deltaY > 0 && currentIndex < spotlightVideos.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setLiked(false);
        } else if (e.deltaY < 0 && currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setLiked(false);
        }
    };

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            style={{
                height: '100%',
                width: '100%',
                background: '#111',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Video Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: currentVideo.color,
                transition: 'all 0.5s ease'
            }}>
                {/* Simulated video content */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 48
                }}>
                    {currentVideo.avatar}
                </div>
            </div>

            {/* Top Progress Bars */}
            <div style={{
                position: 'absolute',
                top: 50,
                left: 0,
                right: 0,
                display: 'flex',
                gap: 4,
                padding: '0 8px',
                zIndex: 10
            }}>
                {spotlightVideos.map((_, idx) => (
                    <div
                        key={idx}
                        style={{
                            flex: 1,
                            height: 3,
                            background: idx === currentIndex ? 'white' : 'rgba(255,255,255,0.3)',
                            borderRadius: 2,
                            transition: 'all 0.3s'
                        }}
                    />
                ))}
            </div>

            {/* Right Side Actions */}
            <div style={{
                position: 'absolute',
                right: 10,
                bottom: 120,
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                zIndex: 10
            }}>
                <div
                    onClick={toggleLike}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Heart
                        color="white"
                        size={32}
                        fill={liked ? '#E91429' : 'none'}
                        stroke={liked ? '#E91429' : 'white'}
                    />
                    <span style={{ fontSize: 12, marginTop: 4 }}>{currentVideo.likes}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                    <MessageCircle color="white" size={32} />
                    <span style={{ fontSize: 12, marginTop: 4 }}>{currentVideo.comments}</span>
                </div>
                <Share2 color="white" size={32} style={{ cursor: 'pointer' }} />
                <div onClick={() => setMuted(!muted)} style={{ cursor: 'pointer' }}>
                    {muted ? <VolumeX color="white" size={32} /> : <Volume2 color="white" size={32} />}
                </div>
                <MoreHorizontal color="white" size={32} style={{ cursor: 'pointer' }} />
            </div>

            {/* Bottom Creator Info */}
            <div style={{
                position: 'absolute',
                left: 16,
                bottom: 120,
                zIndex: 10,
                maxWidth: '70%'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, gap: 10 }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20
                    }}>
                        {currentVideo.avatar}
                    </div>
                    <span style={{ fontWeight: 'bold', fontSize: 16 }}>{currentVideo.creator}</span>
                    <button style={{
                        background: '#E91429',
                        border: 'none',
                        color: 'white',
                        padding: '4px 16px',
                        borderRadius: 4,
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        Follow
                    </button>
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.4 }}>{currentVideo.description}</p>
            </div>

            {/* Scroll Indicator */}
            <div style={{
                position: 'absolute',
                bottom: 100,
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.5)',
                fontSize: 12,
                zIndex: 10,
                animation: 'bounce 2s infinite'
            }}>
                {currentIndex < spotlightVideos.length - 1 ? '↓ Swipe up' : '↑ Swipe down'}
            </div>
        </div>
    )
}
