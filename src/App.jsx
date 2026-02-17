import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { Settings } from 'lucide-react';
import CameraView from './components/CameraView';
import ChatView from './components/ChatView';
import StoriesView from './components/StoriesView';
import SpotlightView from './components/SpotlightView';
import MapView from './components/MapView';
import BottomNav from './components/BottomNav';
import SettingsPanel from './components/SettingsPanel';
import { useAppContext } from './context/AppContext';

const viewOrder = ['map', 'chat', 'camera', 'stories', 'spotlight'];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1,
    zIndex: 1
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 1
  })
};

import { supabase } from './lib/supabase';
import AuthView from './components/AuthView';

import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [view, setView] = useState('camera');
  const [[page, direction], setPage] = useState([2, 0]);
  const [showSettings, setShowSettings] = useState(false);
  const { theme, notifications, removeNotification } = useAppContext();
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    console.log('App: Checking session...');
    // Fallback timer to prevent hanging
    const timeout = setTimeout(() => {
      if (authLoading) {
        console.warn('App: Auth check timed out, continuing...');
        setAuthLoading(false);
      }
    }, 5000);

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      clearTimeout(timeout);
      if (error) {
        console.error('App: GetSession Error:', error);
        setAuthLoading(false);
        return;
      }
      console.log('App: Session retrieved:', session);
      setSession(session);
      setAuthLoading(false);
    }).catch(err => {
      clearTimeout(timeout);
      console.error('App: GetSession Catch Error:', err);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('App: Auth State Changed:', _event, session);
      setSession(session);
      // Only set authLoading to false if it's the initial load or a significant change
      // Otherwise, keep it true if we're still waiting for the first session check
      if (_event === 'INITIAL_SESSION' || _event === 'SIGNED_IN' || _event === 'SIGNED_OUT') {
        setAuthLoading(false);
      }
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const handleSetView = (newView) => {
    const newIndex = viewOrder.indexOf(newView);
    const currentDir = newIndex > page ? 1 : -1;
    setPage([newIndex, currentDir]);
    setView(newView);
  }

  // Swipe gesture handling
  const bind = useDrag(({ swipe: [swipeX], direction: [dirX], cancel }) => {
    if (Math.abs(swipeX) > 0) {
      const currentIndex = viewOrder.indexOf(view);
      let newIndex;

      if (swipeX < 0) { // Swipe left
        newIndex = Math.min(currentIndex + 1, viewOrder.length - 1);
      } else { // Swipe right
        newIndex = Math.max(currentIndex - 1, 0);
      }

      if (newIndex !== currentIndex) {
        handleSetView(viewOrder[newIndex]);
      }
      cancel();
    }
  }, {
    axis: 'x',
    swipe: { distance: 50, velocity: 0.3 },
    filterTaps: true
  });

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
  }, [theme]);

  // Main Render Logic
  if (authLoading) {
    return (
      <div style={{
        background: '#000',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFC00',
        flexDirection: 'column',
        gap: 20
      }}>
        <div style={{ fontSize: 24, fontWeight: 'bold' }}>Loading Zenith...</div>
        <div style={{ fontSize: 14, color: '#888' }}>Checking Authentication...</div>
      </div>
    );
  }

  if (!session) {
    return <AuthView />;
  }

  return (
    <ErrorBoundary>
      {/* Notifications */}
      <div style={{ position: 'fixed', top: 60, left: 16, right: 16, zIndex: 10000, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
        <AnimatePresence>
          {notifications.slice(0, 3).map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className={`notification-toast ${notif.type || ''}`}
              onClick={() => removeNotification(notif.id)}
              style={{
                margin: '0 auto',
                pointerEvents: 'auto',
                cursor: 'pointer'
              }}
            >
              {notif.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Settings Button */}
      {view === 'camera' && (
        <div
          onClick={() => setShowSettings(true)}
          style={{
            position: 'fixed',
            top: 50,
            right: 16,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 100,
            backdropFilter: 'blur(4px)'
          }}
        >
          <Settings size={24} color="white" />
        </div>
      )}

      <div
        {...bind()}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: theme === 'dark' ? 'black' : 'white',
          touchAction: 'pan-y' // Allow vertical scrolling within views
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={view}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}
          >
            {view === 'map' && <MapView />}
            {view === 'chat' && <ChatView />}
            {view === 'camera' && <CameraView />}
            {view === 'stories' && <StoriesView />}
            {view === 'spotlight' && <SpotlightView />}
          </motion.div>
        </AnimatePresence>
      </div>
      <BottomNav currentView={view} setView={handleSetView} />

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </ErrorBoundary>
  );
}
