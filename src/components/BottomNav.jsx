import React from 'react';
import { Map, MessageSquare, Camera, Users, Play } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav({ currentView, setView }) {
    const navItems = [
        { id: 'map', icon: Map, color: '#3CB2E2' },
        { id: 'chat', icon: MessageSquare, color: '#3CB2E2' },
        { id: 'camera', icon: Camera, color: '#FFFC00' },
        { id: 'stories', icon: Users, color: '#9B55A0' },
        { id: 'spotlight', icon: Play, color: '#E91429' }
    ];

    const isCamera = currentView === 'camera';

    return (
        <div className={`bottom-nav ${!isCamera ? 'solid-bg' : ''}`}>
            {navItems.map((item) => {
                const isActive = currentView === item.id;
                const Icon = item.icon;

                // Dynamic coloring based on active state and background
                let iconColor = '#999';
                if (isCamera) iconColor = 'white';
                if (isActive) iconColor = item.color;

                return (
                    <div
                        key={item.id}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setView(item.id)}
                    >
                        <Icon
                            size={isActive ? 28 : 28}
                            color={iconColor}
                            fill={isActive ? iconColor : 'none'}
                            strokeWidth={2}
                        />
                    </div>
                )
            })}
        </div>
    )
}
