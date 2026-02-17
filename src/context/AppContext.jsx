import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [hapticsEnabled, setHapticsEnabled] = useState(true);
    const [user, setUser] = useState({
        id: 1,
        name: 'You',
        avatar: '😊',
        snapScore: 12450,
        streaks: 15,
        bestFriends: [],
        achievements: []
    });
    const [notifications, setNotifications] = useState([]);
    const [savedSnaps, setSavedSnaps] = useState([]);
    const [memories, setMemories] = useState([]);

    // Play sound effect
    const playSound = (type) => {
        if (!soundEnabled) return;

        const sounds = {
            snap: 440,
            send: 523,
            receive: 392,
            notification: 659
        };

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = sounds[type] || 440;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    };

    // Haptic feedback
    const vibrate = (pattern = [10]) => {
        if (!hapticsEnabled) return;
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    };

    // Remove notification
    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Add notification
    const addNotification = (notification) => {
        const id = Date.now();
        setNotifications(prev => [{ id, ...notification }, ...prev]);
        playSound('notification');
        vibrate([10, 50, 10]);

        // Auto remove after 4 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 4000);
    };

    // Save snap
    const saveSnap = (snap) => {
        setSavedSnaps(prev => [{ id: Date.now(), ...snap }, ...prev]);
        addNotification({ type: 'success', message: 'Snap saved!' });
    };

    // Add memory
    const addMemory = (memory) => {
        setMemories(prev => [{ id: Date.now(), timestamp: new Date(), ...memory }, ...prev]);
    };

    // Toggle theme
    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const value = {
        theme,
        setTheme,
        toggleTheme,
        soundEnabled,
        setSoundEnabled,
        hapticsEnabled,
        setHapticsEnabled,
        user,
        setUser,
        notifications,
        addNotification,
        removeNotification,
        savedSnaps,
        saveSnap,
        memories,
        addMemory,
        playSound,
        vibrate
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
