// AR Filter Effects Library
export const arFilters = [
    {
        id: 'none',
        name: '✨ None',
        type: 'none',
        description: 'No filter',
        overlay: () => { }
    },
    {
        id: 'beauty',
        name: '💄 Beauty',
        type: 'shader',
        description: 'Skin smoothing and glow',
        overlay: (ctx, face) => {
            if (!face) return;
            // Subtle glow
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = '#fff5f5';
            ctx.beginPath();
            ctx.ellipse(face.x, face.y, face.width * 0.8, face.height * 0.8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
            ctx.shadowBlur = 0;
        }
    },
    {
        id: 'sparkles',
        name: '✨ Sparkle',
        type: 'particles',
        description: 'Magic sparkles',
        overlay: (ctx) => {
            const width = ctx.canvas.width;
            const height = ctx.canvas.height;
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = Math.random() * 4 + 1;
                const opacity = Math.random();

                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();

                // Draw cross
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x - size * 2, y);
                ctx.lineTo(x + size * 2, y);
                ctx.moveTo(x, y - size * 2);
                ctx.lineTo(x, y + size * 2);
                ctx.stroke();
            }
        }
    },
    {
        id: 'time',
        name: '🕒 Time',
        type: 'overlay',
        description: 'Current time overlay',
        overlay: (ctx) => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const width = ctx.canvas.width;
            const height = ctx.canvas.height;

            ctx.font = 'bold 80px "Inter", sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.textAlign = 'center';
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.fillText(timeStr, width / 2, height * 0.25);
            ctx.shadowBlur = 0;
        }
    },
    {
        id: 'location',
        name: '📍 Location',
        type: 'overlay',
        description: 'Location branding',
        overlay: (ctx) => {
            const width = ctx.canvas.width;
            const height = ctx.canvas.height;

            // Gradient bar
            const grad = ctx.createLinearGradient(0, height - 150, 0, height);
            grad.addColorStop(0, 'transparent');
            grad.addColorStop(1, 'rgba(0,0,0,0.6)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, height - 150, width, 150);

            ctx.font = 'italic bold 60px "Inter", sans-serif';
            ctx.fillStyle = '#FFFC00';
            ctx.textAlign = 'center';
            ctx.letterSpacing = '10px';
            ctx.fillText('SANTA MONICA', width / 2, height - 60);

            ctx.font = '24px "Inter", sans-serif';
            ctx.fillStyle = '#fff';
            ctx.letterSpacing = '2px';
            ctx.fillText('CALIFORNIA', width / 2, height - 30);
        }
    },
    {
        id: 'dog',
        name: '🐶 Dog',
        type: 'face',
        description: 'Dog ears and nose',
        overlay: (ctx, face) => {
            if (!face) return;

            ctx.save();
            ctx.translate(face.x, face.y);
            ctx.rotate(face.roll);
            ctx.translate(-face.x, -face.y);

            // Dog ears
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.ellipse(face.x - (face.width * 0.5), face.y - (face.height * 0.4), face.width * 0.2, face.height * 0.3, -0.3, 0, Math.PI * 2);
            ctx.ellipse(face.x + (face.width * 0.5), face.y - (face.height * 0.4), face.width * 0.2, face.height * 0.3, 0.3, 0, Math.PI * 2);
            ctx.fill();

            // Inner ears
            ctx.fillStyle = '#FFB6C1';
            ctx.beginPath();
            ctx.ellipse(face.x - (face.width * 0.5), face.y - (face.height * 0.35), face.width * 0.1, face.height * 0.2, -0.3, 0, Math.PI * 2);
            ctx.ellipse(face.x + (face.width * 0.5), face.y - (face.height * 0.35), face.width * 0.1, face.height * 0.2, 0.3, 0, Math.PI * 2);
            ctx.fill();

            // Dog nose
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.ellipse(face.x, face.y + (face.height * 0.1), face.width * 0.1, face.width * 0.08, 0, 0, Math.PI * 2);
            ctx.fill();

            // Tongue
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.ellipse(face.x, face.y + (face.height * 0.25), face.width * 0.08, face.width * 0.15, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    },
    {
        id: 'glasses',
        name: '😎 Cool',
        type: 'face',
        description: 'Cool sunglasses',
        overlay: (ctx, face) => {
            if (!face) return;

            ctx.save();
            ctx.translate(face.x, face.y);
            ctx.rotate(face.roll);
            ctx.translate(-face.x, -face.y);

            // Frame
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 4;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';

            const lensW = face.width * 0.35;
            const lensH = face.height * 0.15;

            // Left lens
            ctx.beginPath();
            ctx.roundRect(face.x - lensW - 5, face.y - 10, lensW, lensH, 10);
            ctx.fill();
            ctx.stroke();

            // Right lens
            ctx.beginPath();
            ctx.roundRect(face.x + 5, face.y - 10, lensW, lensH, 10);
            ctx.fill();
            ctx.stroke();

            // Bridge
            ctx.beginPath();
            ctx.moveTo(face.x - 5, face.y);
            ctx.lineTo(face.x + 5, face.y);
            ctx.stroke();

            // Reflection
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(face.x - lensW, face.y);
            ctx.lineTo(face.x - lensW + 15, face.y - 5);
            ctx.stroke();

            ctx.restore();
        }
    },
    {
        id: 'crown',
        name: '👑 Royal',
        type: 'face',
        overlay: (ctx, face) => {
            if (!face) return;

            ctx.save();
            ctx.translate(face.x, face.y);
            ctx.rotate(face.roll);
            ctx.translate(-face.x, -face.y);

            ctx.fillStyle = '#FFD700';
            ctx.strokeStyle = '#FFA500';
            ctx.lineWidth = 2;

            const cx = face.x;
            const cy = face.y - (face.height * 0.5);
            const cw = face.width * 0.6;

            ctx.beginPath();
            ctx.moveTo(cx - cw, cy);
            ctx.lineTo(cx - cw * 0.8, cy - 40);
            ctx.lineTo(cx - cw * 0.5, cy - 20);
            ctx.lineTo(cx, cy - 50);
            ctx.lineTo(cx + cw * 0.5, cy - 20);
            ctx.lineTo(cx + cw * 0.8, cy - 40);
            ctx.lineTo(cx + cw, cy);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Jewels
            const colors = ['#FF0000', '#0000FF', '#00FF00'];
            colors.forEach((color, i) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(cx + (i - 1) * 20, cy - 10, 5, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.restore();
        }
    },
    {
        id: 'fire',
        name: '🔥 Fire',
        type: 'overlay',
        overlay: (ctx) => {
            const width = ctx.canvas.width;
            const height = ctx.canvas.height;
            const grad = ctx.createRadialGradient(width / 2, height, 0, width / 2, height, height * 0.6);
            grad.addColorStop(0, 'rgba(255, 69, 0, 0.4)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            // Floating embers
            ctx.fillStyle = '#FFA500';
            for (let i = 0; i < 30; i++) {
                const x = Math.random() * width;
                const y = height - (Math.random() * height * 0.4);
                ctx.beginPath();
                ctx.arc(x, y, Math.random() * 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
];

// Simple face detection (center of frame with slight breathing movement)
export function detectFace(videoWidth, videoHeight) {
    const time = Date.now() / 1000;
    const dy = Math.sin(time) * 5;

    return {
        x: videoWidth / 2,
        y: videoHeight / 2 + dy,
        width: videoWidth * 0.4,
        height: videoHeight * 0.5
    };
}

// Apply AR filter to canvas
export function applyARFilter(ctx, filterId, videoWidth, videoHeight, detectedFace) {
    const filter = arFilters.find(f => f.id === filterId);
    if (!filter) return;

    // Use real detection if available, otherwise fallback to mock
    const face = detectedFace || detectFace(videoWidth, videoHeight);

    if (filter.overlay) {
        filter.overlay(ctx, face);
    }
}

// === NEON HEAD-DODGE GAME ENGINE ===
let gameState = {
    isPlaying: false,
    score: 0,
    obstacles: [],
    lastFrame: 0,
    gameOver: false,
    highScore: 0
};

const SPAWN_RATE = 1500; // ms
let lastSpawn = 0;

arFilters.push({
    id: 'game-dodge',
    name: '🎮 Dodge',
    type: 'game',
    description: 'Dodge the neon blocks!',
    overlay: (ctx, face) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const now = Date.now();

        if (!gameState.isPlaying && !gameState.gameOver) {
            gameState.isPlaying = true;
            gameState.score = 0;
            gameState.obstacles = [];
            gameState.lastFrame = now;
        }

        // Draw HUD
        ctx.font = 'bold 40px "Inter", sans-serif';
        ctx.fillStyle = '#FFFC00';
        ctx.textAlign = 'right';
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.fillText(`SCORE: ${gameState.score}`, width - 20, 50);
        ctx.textAlign = 'left';
        ctx.font = 'bold 20px "Inter", sans-serif';
        ctx.fillStyle = '#FFF';
        ctx.fillText(`HIGH: ${gameState.highScore}`, 20, 50);

        if (gameState.gameOver) {
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#E91429';
            ctx.textAlign = 'center';
            ctx.font = 'bold 60px "Inter", sans-serif';
            ctx.fillText('GAME OVER', width / 2, height / 2);
            ctx.fillStyle = '#FFF';
            ctx.font = '30px "Inter", sans-serif';
            ctx.fillText('Tap to Restart', width / 2, height / 2 + 50);

            // Allow restart logic (handled by tap elsewhere or auto-reset after delay? 
            // For now, simpler to just reset on next frame if user changes filter or we add a reset trigger)
            if (now - gameState.lastFrame > 3000) { // Auto restart after 3s
                gameState.gameOver = false;
                gameState.score = 0;
            }
            return;
        }

        // 1. Update Physics
        const dt = (now - gameState.lastFrame) / 1000;
        gameState.lastFrame = now;

        // Spawn obstacles
        if (now - lastSpawn > SPAWN_RATE) {
            gameState.obstacles.push({
                x: Math.random() * (width - 60) + 30,
                y: -50,
                speed: 200 + (gameState.score * 10), // Get faster
                color: Math.random() > 0.5 ? '#00FFFF' : '#FF00FF'
            });
            lastSpawn = now;
        }

        // Move and Draw Obstacles
        gameState.obstacles.forEach((obs, index) => {
            obs.y += obs.speed * dt;

            // Draw Neon Block
            ctx.shadowBlur = 20;
            ctx.shadowColor = obs.color;
            ctx.fillStyle = obs.color;
            ctx.beginPath();
            ctx.roundRect(obs.x - 25, obs.y - 25, 50, 50, 10);
            ctx.fill();
            ctx.shadowBlur = 0; // Reset

            // 2. Collision Logic
            // Nose tip is roughly face.x, face.y + slight offset
            // We use face.x (center) and center height as player position
            const playerX = face ? face.x : width / 2;
            const playerY = face ? face.y : height / 2;

            // Simple AABB/Circle Collision
            const dist = Math.hypot(playerX - obs.x, playerY - obs.y);
            if (dist < 60) { // Collision radius
                gameState.gameOver = true;
                if (gameState.score > gameState.highScore) {
                    gameState.highScore = gameState.score;
                    // TODO: Persist high score to Supabase public.profiles
                }
            }

            // Remove if off screen
            if (obs.y > height + 50) {
                gameState.score += 1;
                gameState.obstacles.splice(index, 1);
            }
        });

        // Draw Player "Nose" Marker
        if (face) {
            ctx.beginPath();
            ctx.arc(face.x, face.y, 10, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFC00';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FFF';
            ctx.fill();
        }
    }
});

// === NOSE PAINTER GAME ===
let paintState = {
    isPainting: false,
    path: [],
    color: '#00FF00'
};

arFilters.push({
    id: 'game-paint',
    name: '🎨 Paint',
    type: 'game',
    description: 'Draw with your nose!',
    overlay: (ctx, face) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        if (!face) return;

        // Nose tip is landmark 2 in Blazeface, but here face is our unified object
        // We'll trust face.x/y is roughly nose/center

        const now = Date.now();

        // Add point
        if (paintState.path.length === 0 || now - paintState.path[paintState.path.length - 1].time > 20) {
            paintState.path.push({ x: face.x, y: face.y, time: now });
        }

        // Limit path length
        if (paintState.path.length > 100) paintState.path.shift();

        // Draw HUD
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 20px "Inter", sans-serif';
        ctx.fillText('Move nose to draw', 20, 50);

        // Draw Path
        if (paintState.path.length > 1) {
            ctx.beginPath();
            ctx.moveTo(paintState.path[0].x, paintState.path[0].y);

            // Rainbow effect based on time
            for (let i = 1; i < paintState.path.length; i++) {
                const p = paintState.path[i];
                ctx.lineTo(p.x, p.y);
            }

            ctx.lineCap = 'round';
            ctx.lineWidth = 10;
            ctx.strokeStyle = `hsl(${(now / 10) % 360}, 100%, 50%)`;
            ctx.stroke();

            // Glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        // Draw Brush Tip
        ctx.beginPath();
        ctx.arc(face.x, face.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF';
        ctx.fill();
    }
});

// === MOUTH CATCHER GAME ===
let catchState = {
    score: 0,
    items: [],
    lastSpawn: 0
};

arFilters.push({
    id: 'game-catch',
    name: '🍩 Catch',
    type: 'game',
    description: 'Eat falling donuts!',
    overlay: (ctx, face) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const now = Date.now();

        // Spawn Items
        if (now - catchState.lastSpawn > 1000) {
            catchState.items.push({
                x: Math.random() * (width - 40) + 20,
                y: -50,
                type: Math.random() > 0.3 ? '🍩' : '🥬' // Donut (good) vs Lettuce (bad - jk, random items)
            });
            catchState.lastSpawn = now;
        }

        // Draw Score
        ctx.font = 'bold 40px "Inter", sans-serif';
        ctx.fillStyle = '#FFFC00';
        ctx.fillText(`YUM: ${catchState.score}`, 20, 50);

        // Update Items
        catchState.items.forEach((item, i) => {
            item.y += 5; // Speed

            ctx.font = '40px Arial';
            ctx.fillText(item.type, item.x, item.y);

            // Collision with "Mouth" (approx face.y + offset)
            if (face) {
                const mouthY = face.y + (face.height * 0.3);
                const dist = Math.hypot(face.x - item.x, mouthY - item.y);

                if (dist < 50) {
                    catchState.score++;
                    catchState.items.splice(i, 1);
                    // Visual feedback
                    ctx.fillStyle = 'rgba(255,255,255,0.5)';
                    ctx.beginPath();
                    ctx.arc(face.x, mouthY, 40, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Remove offscreen
            if (item.y > height) {
                catchState.items.splice(i, 1);
            }
        });
    }
});
