import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { User, MapPin, Navigation, Crosshair, Users, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// Fix for default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom Bitmoji Marker
const createBitmojiIcon = (color, emoji = '😊') => L.divIcon({
    className: 'custom-bitmoji-icon',
    html: `<div style="
    background: ${color};
    width: 44px;
    height: 44px;
    border-radius: 50% 50% 0 50%;
    border: 3px solid white;
    transform: rotate(45deg);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <div style="transform: rotate(-45deg); font-size: 20px;">${emoji}</div>
  </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -44]
});

// Component to recenter map
function RecenterMap({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom());
        }
    }, [position, map]);
    return null;
}

// Generate friends near user's location
function generateNearbyFriends(userPos) {
    const friends = [
        { id: 1, name: "Sarah", avatar: '😎', color: '#FF6B6B', status: 'Active 2m ago' },
        { id: 2, name: "Mike", avatar: '🎮', color: '#4ECDC4', status: 'Active now' },
        { id: 3, name: "Jessica", avatar: '🌸', color: '#95E1D3', status: 'Active 15m ago' },
        { id: 4, name: "David", avatar: '⚡', color: '#FFE66D', status: 'Active 1h ago' },
        { id: 5, name: "Emma", avatar: '🎨', color: '#A8E6CF', status: 'Active 30m ago' },
    ];

    return friends.map(friend => ({
        ...friend,
        position: [
            userPos[0] + (Math.random() - 0.5) * 0.02,
            userPos[1] + (Math.random() - 0.5) * 0.02
        ]
    }));
}

export default function MapView() {
    const [userPosition, setUserPosition] = useState(null);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [ghostMode, setGhostMode] = useState(false);

    // Safe context access with fallbacks
    const context = useAppContext();
    const user = context?.user || { name: 'You', avatar: '😊' };
    const addNotification = context?.addNotification || (() => { });
    const vibrate = context?.vibrate || (() => { });

    // Get user's real location
    useEffect(() => {
        const defaultPos = [40.7128, -74.0060]; // NYC fallback

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = [position.coords.latitude, position.coords.longitude];
                    setUserPosition(pos);
                    setFriends(generateNearbyFriends(pos));
                    setLoading(false);
                    setError(null);
                    addNotification({ type: 'success', message: '📍 Location found!' });
                    vibrate([10]);
                },
                (err) => {
                    console.warn('Geolocation error:', err.message);
                    setUserPosition(defaultPos);
                    setFriends(generateNearbyFriends(defaultPos));
                    setError('Using default location (NYC)');
                    setLoading(false);
                    addNotification({ type: 'error', message: '📍 Using default location' });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            setUserPosition(defaultPos);
            setFriends(generateNearbyFriends(defaultPos));
            setError('Geolocation not supported');
            setLoading(false);
        }
    }, []);

    const recenterMap = () => {
        if ('geolocation' in navigator) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = [position.coords.latitude, position.coords.longitude];
                    setUserPosition(pos);
                    setFriends(generateNearbyFriends(pos));
                    setLoading(false);
                    setError(null);
                    addNotification({ type: 'success', message: '📍 Location updated!' });
                    vibrate([10, 50, 10]);
                },
                (err) => {
                    setLoading(false);
                    addNotification({ type: 'error', message: '❌ Could not get location' });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        }
    };

    if (loading) {
        return (
            <div style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#aadaff',
                flexDirection: 'column',
                gap: 16
            }}>
                <div className="loading-spinner"></div>
                <p style={{ color: '#333' }}>Finding your location...</p>
            </div>
        );
    }

    if (!userPosition) {
        return (
            <div style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#aadaff',
                flexDirection: 'column',
                gap: 16
            }}>
                <MapPin size={48} color="#E91429" />
                <p style={{ color: '#333' }}>Unable to load map</p>
            </div>
        );
    }

    return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <MapContainer
                center={userPosition}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <RecenterMap position={userPosition} />

                {/* User Location */}
                {!ghostMode && (
                    <>
                        <Marker position={userPosition} icon={createBitmojiIcon('#FFFC00', user.avatar)}>
                            <Popup>
                                <div style={{ textAlign: 'center' }}>
                                    <strong>{user.name}</strong><br />
                                    <span style={{ fontSize: 12, color: '#888' }}>You are here</span>
                                </div>
                            </Popup>
                        </Marker>

                        {/* Accuracy circle */}
                        <Circle
                            center={userPosition}
                            radius={50}
                            pathOptions={{
                                color: '#FFFC00',
                                fillColor: '#FFFC00',
                                fillOpacity: 0.1,
                                weight: 2
                            }}
                        />
                    </>
                )}

                {/* Friends */}
                {friends.map(friend => (
                    <Marker
                        key={friend.id}
                        position={friend.position}
                        icon={createBitmojiIcon(friend.color, friend.avatar)}
                    >
                        <Popup>
                            <div style={{ minWidth: 120 }}>
                                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{friend.name}</div>
                                <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>{friend.status}</div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button style={{
                                        flex: 1,
                                        padding: '6px 12px',
                                        background: '#3CB2E2',
                                        border: 'none',
                                        borderRadius: 12,
                                        color: 'white',
                                        fontSize: 11,
                                        cursor: 'pointer'
                                    }}>
                                        Chat
                                    </button>
                                    <button style={{
                                        flex: 1,
                                        padding: '6px 12px',
                                        background: '#E91429',
                                        border: 'none',
                                        borderRadius: 12,
                                        color: 'white',
                                        fontSize: 11,
                                        cursor: 'pointer'
                                    }}>
                                        Snap
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Heatmap circles */}
                {showHeatmap && friends.map(friend => (
                    <Circle
                        key={`heat-${friend.id}`}
                        center={friend.position}
                        radius={100}
                        pathOptions={{
                            color: friend.color,
                            fillColor: friend.color,
                            fillOpacity: 0.2,
                            weight: 1
                        }}
                    />
                ))}
            </MapContainer>

            {/* Top Stats Bar */}
            <div style={{
                position: 'absolute',
                top: 60,
                left: 16,
                right: 16,
                display: 'flex',
                gap: 8,
                zIndex: 1000
            }}>
                <div className="glass" style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                }}>
                    <Users size={16} color="white" />
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 'bold' }}>{friends.length}</div>
                        <div style={{ fontSize: 10, opacity: 0.8 }}>Nearby</div>
                    </div>
                </div>

                <div className="glass" style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                }}>
                    <TrendingUp size={16} color="white" />
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 'bold' }}>12</div>
                        <div style={{ fontSize: 10, opacity: 0.8 }}>Active</div>
                    </div>
                </div>
            </div>

            {/* Control Buttons */}
            <div style={{
                position: 'absolute',
                bottom: 120,
                right: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                zIndex: 1000
            }}>
                {/* Recenter Button */}
                <div
                    onClick={recenterMap}
                    className="glass"
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Crosshair size={24} color="white" />
                </div>

                {/* Ghost Mode Toggle */}
                <div
                    onClick={() => {
                        setGhostMode(!ghostMode);
                        addNotification({
                            type: 'success',
                            message: ghostMode ? '👻 Ghost mode OFF' : '👻 Ghost mode ON'
                        });
                        vibrate([10]);
                    }}
                    className="glass"
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        background: ghostMode ? 'rgba(233, 20, 41, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.2s'
                    }}
                >
                    <span style={{ fontSize: 24 }}>👻</span>
                </div>

                {/* Heatmap Toggle */}
                <div
                    onClick={() => {
                        setShowHeatmap(!showHeatmap);
                        vibrate([10]);
                    }}
                    className="glass"
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        background: showHeatmap ? 'rgba(60, 178, 226, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.2s'
                    }}
                >
                    <span style={{ fontSize: 24 }}>🔥</span>
                </div>
            </div>

            {/* Bottom Info */}
            {error && (
                <div style={{
                    position: 'absolute',
                    bottom: 100,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(233, 20, 41, 0.9)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontSize: 12,
                    zIndex: 1000,
                    backdropFilter: 'blur(10px)'
                }}>
                    {error}
                </div>
            )}
        </div>
    );
}
