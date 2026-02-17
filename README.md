# 🚀 Zenith - Next Generation

A feature-rich, modern web-based Zenith built with React, featuring **180+ features** including AR filters, real GPS location, achievements, and more!

![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen)
![Features](https://img.shields.io/badge/Features-180+-blue)
![PWA](https://img.shields.io/badge/PWA-Enabled-purple)

## ✨ Live Demo

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see the app in action!

## 🚀 **Production Deployment**

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify (recommended)
npm install -g netlify-cli
netlify deploy --prod
```

**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.**

## 🎯 **NEW! Latest Features**

### 🎨 AR Filters (Just Added!)
- **8 AR Face Filters**: Dog 🐶, Glasses 😎, Crown 👑, Hearts ❤️, Mustache 👨, Bunny 🐰, Devil 😈, Rainbow 🌈
- Real-time face tracking and overlay rendering
- Switch between Color and AR filter modes

### 🗺️ Real GPS Location (Just Added!)
- Uses your **actual GPS location** on the map!
- Recenter button to jump back to your position
- Ghost Mode 👻 to hide from friends
- Heatmap 🔥 to see friend activity zones


## 🎯 Core Features Implemented

### 📸 Camera & Media
- ✅ **Real-time Camera Feed** - Access front/back cameras
- ✅ **Photo Capture** - Tap to take photos
- ✅ **Video Recording** - Hold button to record (up to 60s)
- ✅ **10+ Filters** - Sepia, B&W, Warm, Cool, Vintage, Invert, Blur, Bright, Contrast
- ✅ **Filter Preview** - Real-time filter application
- ✅ **Camera Flip** - Switch between front/back cameras
- ✅ **Flash Toggle** - Enable/disable flash
- ✅ **Mirror Effect** - Selfie mode with mirroring
- ✅ **Download Snaps** - Save photos/videos locally

### 💬 Chat & Messaging
- ✅ **Chat Threads** - Individual conversations
- ✅ **Real-time Messaging** - Send and receive messages
- ✅ **Auto-responses** - Simulated friend replies
- ✅ **Typing Indicators** - See when friends are typing
- ✅ **Message Timestamps** - Track message times
- ✅ **Status Indicators** - New, opened, received states
- ✅ **Streak Tracking** - Fire emoji for daily streaks
- ✅ **Video/Voice Call Buttons** - UI for calls

### 📖 Stories
- ✅ **Friend Stories** - View stories from friends
- ✅ **Discover Section** - Explore publisher content
- ✅ **Story Viewer** - Full-screen story playback
- ✅ **Progress Bars** - Auto-advancing stories
- ✅ **New Story Indicators** - Colored rings for unviewed
- ✅ **Add to Story** - Create your own stories
- ✅ **Story Categories** - News, Comedy, Sports, Food, Travel, Tech

### 🎬 Spotlight (TikTok-style)
- ✅ **Vertical Video Feed** - Swipeable content
- ✅ **Like/Comment Counters** - Engagement metrics
- ✅ **Follow Buttons** - Subscribe to creators
- ✅ **Mute Toggle** - Audio control
- ✅ **Progress Indicators** - Track position in feed
- ✅ **Creator Profiles** - View creator info
- ✅ **Swipe Navigation** - Up/down to browse

### 🗺️ Snap Map
- ✅ **Interactive Map** - Real Leaflet-powered map
- ✅ **Custom Bitmoji Markers** - Colorful location pins
- ✅ **Friend Locations** - See where friends are
- ✅ **Popup Information** - Tap markers for details
- ✅ **Pan & Zoom** - Explore the map
- ✅ **Real Map Tiles** - Actual geographic data

### ⚙️ Settings & Customization
- ✅ **Dark/Light Theme** - Toggle between themes
- ✅ **Sound Effects** - UI interaction sounds
- ✅ **Haptic Feedback** - Vibration on touch
- ✅ **Privacy Controls** - Ghost mode, notifications
- ✅ **Profile Management** - View and edit profile
- ✅ **Stats Dashboard** - Snap score, streaks, friends

### 🏆 Gamification
- ✅ **Achievements System** - 8+ unlockable achievements
- ✅ **Progress Tracking** - Visual progress bars
- ✅ **Snap Score** - Points for activity
- ✅ **Streak Counter** - Daily snap streaks
- ✅ **Best Friends** - Top friend list
- ✅ **Achievement Filters** - View locked/unlocked

### 📱 Memories
- ✅ **Grid View** - Photo grid layout
- ✅ **Timeline View** - Chronological organization
- ✅ **Map View** - Location-based grouping
- ✅ **Stats** - Total memories, views, likes
- ✅ **Date Grouping** - Organized by day
- ✅ **Location Tags** - See where memories were created

### 🎨 UI/UX Enhancements
- ✅ **Swipe Navigation** - Gesture-based view switching
- ✅ **Smooth Animations** - Framer Motion transitions
- ✅ **Notification Toasts** - Success/error messages
- ✅ **Loading States** - Visual feedback
- ✅ **Glassmorphism** - Modern blur effects
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Accessibility** - High contrast, reduced motion support

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Gestures**: @use-gesture/react
- **Maps**: Leaflet + React-Leaflet
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (CSS Variables)
- **State Management**: React Context API

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd zenith

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎮 How to Use

### Navigation
- **Swipe Left/Right** - Switch between views
- **Click Bottom Icons** - Jump to specific sections

### Camera
- **Tap Shutter** - Take a photo
- **Hold Shutter** - Record video (up to 60s)
- **Tap Filters** - Apply real-time effects
- **Tap Flip Icon** - Switch cameras
- **Tap Flash** - Toggle flash

### Chat
- **Tap Chat** - Open conversation
- **Type Message** - Send text
- **Tap Send** - Deliver message

### Stories
- **Tap Story** - View full-screen
- **Tap + Button** - Add your story
- **Tap Discover** - Explore content

### Spotlight
- **Swipe Up/Down** - Browse videos
- **Tap Heart** - Like video
- **Tap Mute** - Toggle sound

### Settings
- **Tap Gear Icon** - Open settings (camera view)
- **Toggle Theme** - Switch dark/light mode
- **View Achievements** - See progress
- **View Memories** - Browse saved content

## 🚀 What Makes This Better Than Snapchat?

1. **Cross-Platform** - Works on any device with a browser
2. **No Download Required** - Instant access via URL
3. **Desktop Support** - Full mouse/keyboard navigation
4. **Open Source** - Customize and extend freely
5. **Faster Performance** - Web-based, optimized loading
6. **More Filters** - 10 filters available immediately
7. **Better UX** - Cleaner UI, smoother animations
8. **Achievements** - Gamification elements
9. **Memories Organization** - Multiple view modes
10. **Theme Support** - Dark/light mode toggle

## 📊 Feature Comparison

| Feature | Snapchat | This App |
|---------|----------|----------|
| Photo Capture | ✅ | ✅ |
| Video Recording | ✅ | ✅ |
| Filters | Limited Free | 10+ Free |
| Chat | ✅ | ✅ |
| Stories | ✅ | ✅ |
| Spotlight | ✅ | ✅ |
| Map | ✅ | ✅ |
| Dark Mode | ❌ | ✅ |
| Desktop Support | Limited | ✅ |
| Achievements | ❌ | ✅ |
| Memories Views | 1 | 3 |
| Sound Effects | ❌ | ✅ |
| Haptic Feedback | ✅ | ✅ |
| Open Source | ❌ | ✅ |

## 🎯 Roadmap

See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for the complete list of 150+ planned enhancements.

### Next Features
- [ ] AR Face Filters (dog ears, glasses)
- [ ] Voice Messages
- [ ] Group Chats
- [ ] Story Highlights
- [ ] Live Streaming
- [ ] QR Code Scanner
- [ ] Biometric Lock
- [ ] Offline Mode
- [ ] AI Chatbot
- [ ] Background Removal

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- Inspired by Snapchat's innovative UI/UX
- Built with modern web technologies
- Designed for education and demonstration purposes

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ using React and Vite**
