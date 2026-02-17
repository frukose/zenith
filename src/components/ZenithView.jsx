import React, { useEffect, useRef, useState } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';

import { Camera, RefreshCw, Zap, Image as ImageIcon, Search, User, Music, Plus, X, Download, Send, Smile, Video, Sparkles, Grid3x3, Timer } from 'lucide-react';
import { arFilters, applyARFilter } from '../utils/arFilters';
import { useAppContext } from '../context/AppContext';
import './ZenithView.css';



// Define filters OUTSIDE component to ensure availability in all scopes
const colorFilters = [
  { id: 'normal', name: 'Original', filter: 'none', color: '#fff' },
  { id: 'vivid', name: 'Vivid', filter: 'saturate(1.8) contrast(1.1)', color: '#ff4d4d' },
  { id: 'golden', name: 'Golden', filter: 'sepia(0.3) saturate(1.6) brightness(1.1)', color: '#ffd700' },
  { id: 'tokyo', name: 'Tokyo', filter: 'saturate(1.2) hue-rotate(30deg) brightness(1.1)', color: '#ff69b4' },
  { id: 'london', name: 'London', filter: 'grayscale(0.2) contrast(1.1) brightness(0.9) saturate(0.8)', color: '#708090' },
  { id: 'paris', name: 'Paris', filter: 'contrast(1.2) sepia(0.1) brightness(1.05)', color: '#f5f5dc' },
  { id: 'drama', name: 'Drama', filter: 'contrast(1.5) grayscale(1)', color: '#333' },
  { id: 'retro', name: 'Retro', filter: 'contrast(1.1) sepia(0.4) saturate(1.3)', color: '#8b4513' },
  { id: 'aura', name: 'Aura', filter: 'hue-rotate(180deg) saturate(1.5)', color: '#9370db' },
  { id: 'ghost', name: 'Ghost', filter: 'invert(1) hue-rotate(180deg) brightness(1.2)', color: '#e0ffff' },
];

export default function ZenithView() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const animationFrameRef = useRef(null);
  const faceDetectionRef = useRef(null); // Ref for face data to avoid re-renders

  const [hasPermission, setHasPermission] = useState(null);
  const [model, setModel] = useState(null); // ML Model
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);
  const [activeFilterId, setActiveFilterId] = useState('normal');
  const [activeARFilter, setActiveARFilter] = useState(null);
  const [filterMode, setFilterMode] = useState('color'); // 'color' or 'ar'
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [facingMode, setFacingMode] = useState('user');
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [showFilterName, setShowFilterName] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  const { playSound, vibrate, addNotification, addMemory } = useAppContext();

  // Load ML Model
  useEffect(() => {
    async function loadModel() {
      try {
        console.log("Loading Face Model...");
        const loadedModel = await blazeface.load();
        setModel(loadedModel);
        console.log("Face Model Loaded!");
      } catch (err) {
        console.error("Failed to load face model", err);
      }
    }
    loadModel();
  }, []);

  useEffect(() => {
    console.log('ZenithView: Mounting...');
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 720 }, height: { ideal: 1280 } },
          audio: true
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (e) {
        console.error("Camera access denied", e);
        setHasPermission(false);
      }
    }
    if (!capturedImage && !capturedVideo) {
      setupCamera();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  }, [capturedImage, capturedVideo, facingMode]);

  // Detection Loop
  useEffect(() => {
    if (!model || !videoRef.current) return;

    let isActive = true;
    const detect = async () => {
      if (!isActive) return;

      if (videoRef.current && videoRef.current.readyState === 4) {
        try {
          const returnTensors = false;
          const predictions = await model.estimateFaces(videoRef.current, returnTensors);

          if (predictions.length > 0) {
            const p = predictions[0];
            // Store raw coordinates from the model (video-space)
            // We will handle mirroring and scaling in the render loop to match visual layout
            faceDetectionRef.current = {
              start: p.topLeft,
              end: p.bottomRight,
              landmarks: p.landmarks
            };
          } else {
            // faceDetectionRef.current = null;
          }
        } catch (e) {
          console.error("Detection error", e);
        }
      }
      if (isActive) requestAnimationFrame(detect);
    };

    detect();

    return () => { isActive = false; };
  }, [model, facingMode]);

  // Ref for smoothed face state
  const smoothedFaceRef = useRef(null);

  // Helper: Linear Interpolation
  const lerp = (start, end, factor) => start + (end - start) * factor;

  // AR Filter rendering loop
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || filterMode !== 'ar' || !activeARFilter) return;

    const renderARFilter = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      // Set canvas to SCREEN size (or container size) to match the visual video
      const rect = video.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear

      // Calculate Scaling: mimics object-fit: cover
      // The video is intrinsically video.videoWidth x video.videoHeight
      // It is displayed in rect.width x rect.height
      const videoRatio = video.videoWidth / video.videoHeight;
      const screenRatio = rect.width / rect.height;

      let renderScale, offsetX, offsetY;

      if (screenRatio > videoRatio) {
        // Screen is wider than video: Video is scaled to match width, top/bottom cropped
        renderScale = rect.width / video.videoWidth;
        const displayHeight = video.videoHeight * renderScale;
        offsetX = 0;
        offsetY = (rect.height - displayHeight) / 2;
      } else {
        // Screen is taller than video: Video is scaled to match height, left/right cropped
        renderScale = rect.height / video.videoHeight;
        const displayWidth = video.videoWidth * renderScale;
        offsetX = (rect.width - displayWidth) / 2;
        offsetY = 0;
      }

      // Prepare Target Face Data (Screen Space)
      let targetFace = null;
      if (faceDetectionRef.current) {
        const { start, end, landmarks } = faceDetectionRef.current;
        const rawW = end[0] - start[0];
        const rawH = end[1] - start[1];
        const rawCenterX = start[0] + rawW / 2;
        const rawCenterY = start[1] + rawH / 2;

        let x = rawCenterX * renderScale + offsetX;
        let y = rawCenterY * renderScale + offsetY;

        // Calculate Rotation (Roll) from Eyes
        // Landmarks: 0=right eye, 1=left eye (from model perspective)
        const rightEye = landmarks[0];
        const leftEye = landmarks[1];
        // Note: Model right eye is user's left eye in mirroring, but relative angle holds if we flip consistent
        const dy = leftEye[1] - rightEye[1];
        const dx = leftEye[0] - rightEye[0];
        let roll = Math.atan2(dy, dx);

        // Apply Mirroring for selfie mode
        if (facingMode === 'user') {
          // In selfie mode, the video is CSS mirrored (scaleX(-1))
          // But coordinates are from the raw video stream (unmirrored)
          // To draw correctly on top of a mirrored element, we need to flip the X coordinate
          // relative to the center of the DISPLAYED video
          // Actually, simplest is to mirror the coordinate relative to the CANVAS width
          x = rect.width - x;
          roll = -roll; // Flip rotation for mirror
        }

        targetFace = {
          x: x,
          y: y,
          width: rawW * renderScale,
          height: rawH * renderScale,
          roll: roll
        };
      }

      // SMOOTHING (LERP)
      if (targetFace) {
        if (!smoothedFaceRef.current) {
          smoothedFaceRef.current = targetFace; // Snap to first detection
        } else {
          const smoothFactor = 0.2; // 0.1 = very floaty, 0.5 = snappy
          smoothedFaceRef.current = {
            x: lerp(smoothedFaceRef.current.x, targetFace.x, smoothFactor),
            y: lerp(smoothedFaceRef.current.y, targetFace.y, smoothFactor),
            width: lerp(smoothedFaceRef.current.width, targetFace.width, smoothFactor),
            height: lerp(smoothedFaceRef.current.height, targetFace.height, smoothFactor),
            roll: lerp(smoothedFaceRef.current.roll, targetFace.roll, smoothFactor)
          };
        }
      } else {
        // If lost tracking, maybe keep last known for a bit or fade out? 
        // For now, reset
        smoothedFaceRef.current = null;
      }

      // We do NOT draw the video frame here because the video element serves as the background
      // The canvas is transparent and sits on top

      applyARFilter(ctx, activeARFilter, canvas.width, canvas.height, smoothedFaceRef.current);

      animationFrameRef.current = requestAnimationFrame(renderARFilter);
    };

    renderARFilter();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeARFilter, filterMode, facingMode]);

  // Timer countdown
  useEffect(() => {
    if (timerActive && timerSeconds > 0) {
      const timeout = setTimeout(() => {
        setTimerSeconds(prev => prev - 1);
        vibrate([10]);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (timerActive && timerSeconds === 0) {
      setTimerActive(false);
      takePicture();
    }
  }, [timerActive, timerSeconds]);

  const takePicture = () => {
    if (videoRef.current && !isRecording) {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 150);
      playSound('snap');
      vibrate([10, 50, 10]);

      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');

      // Apply color filter
      const activeFilter = colorFilters.find(f => f.id === activeFilterId);
      if (activeFilter && activeFilter.filter !== 'none') {
        ctx.filter = activeFilter.filter;
      }

      // Mirror for selfie
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(videoRef.current, 0, 0);

      // Apply AR filter if active
      if (filterMode === 'ar' && activeARFilter) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        applyARFilter(ctx, activeARFilter, canvas.width, canvas.height);
      }

      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
      addMemory({ type: 'photo', filter: activeFilterId, arFilter: activeARFilter });
      addNotification({ type: 'success', message: '📸 Zenith captured!' });
    }
  };

  const startRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const chunks = [];
      const stream = videoRef.current.srcObject;

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setCapturedVideo(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const switchCamera = async () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const currentFilter = colorFilters.find(f => f.id === activeFilterId);
  const currentIndex = colorFilters.findIndex(f => f.id === activeFilterId);

  const getNextFilter = (direction) => {
    const nextIdx = direction > 0
      ? (currentIndex - 1 + colorFilters.length) % colorFilters.length
      : (currentIndex + 1) % colorFilters.length;
    return colorFilters[nextIdx];
  };

  const [nextFilter, setNextFilter] = useState(null);

  const startTimer = (seconds) => {
    setTimerSeconds(seconds);
    setTimerActive(true);
    addNotification({ type: 'success', message: `⏱️ Timer set: ${seconds}s` });
  };

  const [lastTap, setLastTap] = useState(0);

  const handleTouchStart = (e) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      switchCamera();
    }
    setLastTap(now);
    setTouchStart(e.targetTouches[0].clientX);
  };


  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchEnd - touchStart;

    if (Math.abs(diff) > 50) {
      const targetFilter = getNextFilter(-diff);
      setActiveFilterId(targetFilter.id);
      setShowFilterName(true);
      vibrate([5]);
      setTimeout(() => setShowFilterName(false), 1500);
    }
    setTouchStart(null);
    setSwipeOffset(0);
    setNextFilter(null);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    setSwipeOffset(diff);
    setNextFilter(getNextFilter(-diff));
  };

  // Preview captured media
  if (capturedImage || capturedVideo) {
    return (
      <div className="camera-container">
        {capturedImage && (
          <img src={capturedImage} className="camera-feed" style={{ transform: 'none' }} alt="Captured" />
        )}
        {capturedVideo && (
          <video src={capturedVideo} className="camera-feed" style={{ transform: 'none' }} controls autoPlay loop />
        )}
        <div className="top-bar">
          <div className="icon-circle" onClick={() => {
            setCapturedImage(null);
            setCapturedVideo(null);
          }} style={{ cursor: 'pointer' }}>
            <X size={24} color="white" />
          </div>
        </div>
        <div className="camera-controls">
          <div className="secondary-action" onClick={() => {
            const link = document.createElement('a');
            link.download = capturedImage ? `zenith_${activeFilterId}.png` : 'zenith_video.webm';
            link.href = capturedImage || capturedVideo;
            link.click();
          }}>
            <Download size={24} color="white" />
          </div>
          <div style={{ padding: '10px 20px', background: '#3CB2E2', borderRadius: 20, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <span>Send to Friends</span> <Send size={16} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="camera-container">
      {hasPermission === false ? (
        <div className="camera-placeholder">
          <Camera size={48} />
          <p>Camera access required</p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-feed"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: facingMode === 'user' ? 'scaleX(-1)' : 'none'
            }}
          />

          {/* Active Filter Overlay */}
          <div
            className="filter-overlay"
            style={{
              backdropFilter: currentFilter.filter,
              WebkitBackdropFilter: currentFilter.filter,
              clipPath: swipeOffset > 0
                ? `inset(0 0 0 ${swipeOffset}px)`
                : `inset(0 ${Math.abs(swipeOffset)}px 0 0)`
            }}
          />

          {/* Next Filter Overlay during swipe */}
          {nextFilter && (
            <div
              className="filter-overlay"
              style={{
                backdropFilter: nextFilter.filter,
                WebkitBackdropFilter: nextFilter.filter,
                clipPath: swipeOffset > 0
                  ? `inset(0 ${window.innerWidth - swipeOffset}px 0 0)`
                  : `inset(0 0 0 ${window.innerWidth - Math.abs(swipeOffset)}px)`
              }}
            />
          )}

          {showFilterName && (
            <div className="filter-name-overlay">
              {currentFilter.name}
            </div>
          )}
          {isRecording && (
            <div style={{
              position: 'absolute',
              top: 60,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#E91429',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 20,
              fontWeight: 'bold',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'white',
                animation: 'pulse-ring 1.5s infinite'
              }}></div>
              {recordingTime}s
            </div>
          )}
        </>
      )}

      {/* Flash Overlay */}
      {isFlashing && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          zIndex: 1000,
          pointerEvents: 'none'
        }} />
      )}

      {/* Filter Mode Toggle */}
      <div style={{
        position: 'absolute',
        top: 120,
        left: 16,
        display: 'flex',
        gap: 8,
        zIndex: 50
      }}>
        <div
          onClick={() => setFilterMode('color')}
          style={{
            padding: '8px 16px',
            borderRadius: 20,
            background: filterMode === 'color' ? '#FFFC00' : 'rgba(0,0,0,0.4)',
            color: filterMode === 'color' ? '#000' : '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)'
          }}
        >
          🎨 Color
        </div>
        <div
          onClick={() => {
            console.log("Toggling Filter Mode: AR");
            setFilterMode('ar');
            // Auto-select the first AR filter if none selected
            if (!activeARFilter) setActiveARFilter(arFilters[1].id); // Select 'Beauty' by default
          }}
          style={{
            padding: '8px 16px',
            borderRadius: 20,
            background: filterMode === 'ar' ? '#FFFC00' : 'rgba(0,0,0,0.4)',
            color: filterMode === 'ar' ? '#000' : '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)'
          }}
        >
          ✨ AR
        </div>
      </div>

      {/* Filter Carousel */}
      <div className="filter-carousel">
        {filterMode === 'color' && colorFilters.map(filter => (
          <div
            key={filter.id}
            className={`filter-item ${activeFilterId === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilterId(filter.id)}
            style={{ backgroundColor: filter.color }}
          >
            {activeFilterId === filter.id && filter.name}
          </div>
        ))}
        {filterMode === 'ar' && arFilters.map(filter => (
          <div
            key={filter.id}
            className={`filter-item ${activeARFilter === filter.id ? 'active' : ''}`}
            onClick={() => {
              setActiveARFilter(filter.id);
              vibrate([10]);
            }}
            style={{
              fontSize: 24,
              background: activeARFilter === filter.id ? '#FFFC00' : 'rgba(255,255,255,0.2)'
            }}
          >
            {filter.name.split(' ')[0]}
          </div>
        ))}
      </div>

      {/* Grid Overlay */}
      {showGrid && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 5
        }}>
          <svg width="100%" height="100%" style={{ opacity: 0.3 }}>
            <line x1="33.33%" y1="0" x2="33.33%" y2="100%" stroke="white" strokeWidth="1" />
            <line x1="66.66%" y1="0" x2="66.66%" y2="100%" stroke="white" strokeWidth="1" />
            <line x1="0" y1="33.33%" x2="100%" y2="33.33%" stroke="white" strokeWidth="1" />
            <line x1="0" y1="66.66%" x2="100%" y2="66.66%" stroke="white" strokeWidth="1" />
          </svg>
        </div>
      )}

      {/* Timer Countdown */}
      {timerActive && timerSeconds > 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 120,
          fontWeight: 'bold',
          color: '#FFFC00',
          textShadow: '0 0 20px rgba(0,0,0,0.8)',
          zIndex: 100,
          animation: 'heartbeat 1s infinite'
        }}>
          {timerSeconds}
        </div>
      )}

      {/* AR Canvas Overlay */}
      {filterMode === 'ar' && activeARFilter && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10
          }}
        />
      )}

      <div className="top-bar">
        <div className="header-left">
          <div className="icon-circle profile-icon"><User color="white" size={24} /></div>
          <div className="icon-circle search-icon"><Search color="white" size={24} /></div>
        </div>

        <div className="top-right-controls">
          <div onClick={switchCamera} style={{ cursor: 'pointer' }}>
            <RefreshCw size={24} color="white" />
          </div>
          <div onClick={() => setFlashEnabled(!flashEnabled)} style={{ cursor: 'pointer' }}>
            <Zap size={24} color={flashEnabled ? '#FFFC00' : 'white'} fill={flashEnabled ? '#FFFC00' : 'none'} />
          </div>
          <div onClick={() => setShowGrid(!showGrid)} style={{ cursor: 'pointer' }}>
            <Grid3x3 size={24} color={showGrid ? '#FFFC00' : 'white'} />
          </div>
          <div onClick={() => {
            if (timerSeconds === 0) startTimer(3);
            else if (timerSeconds === 3) startTimer(10);
            else setTimerSeconds(0);
          }} style={{ cursor: 'pointer', position: 'relative' }}>
            <Timer size={24} color={timerSeconds > 0 ? '#FFFC00' : 'white'} />
            {timerSeconds > 0 && (
              <div style={{
                position: 'absolute',
                top: -4,
                right: -4,
                background: '#E91429',
                borderRadius: '50%',
                width: 16,
                height: 16,
                fontSize: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {timerSeconds}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="camera-controls">
        <div className="secondary-action">
          <ImageIcon size={20} color="white" />
        </div>

        <div
          className={`shutter-button ${isRecording ? 'recording' : ''}`}
          onClick={takePicture}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          style={{
            background: isRecording ? '#E91429' : 'transparent',
            borderRadius: isRecording ? '8px' : '50%',
            transition: 'all 0.3s ease'
          }}
        ></div>

        <div className="secondary-action">
          <Smile size={20} color="white" />
        </div>
      </div>
    </div>
  );
}
