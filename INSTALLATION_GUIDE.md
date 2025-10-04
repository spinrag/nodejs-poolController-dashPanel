# Pool Control Dashboard - iOS App Installation Guide

## Installing as a Standalone iOS App

Your Pool Control Dashboard can now be installed as a standalone app on your iOS device! This provides a native app-like experience with offline functionality and better performance.

### Method 1: Safari Browser (Recommended)

1. **Open Safari** on your iOS device
2. **Navigate** to your pool controller dashboard URL (e.g., `http://your-pool-controller-ip:5150`)
3. **Tap the Share button** (square with arrow pointing up) at the bottom of Safari
4. **Scroll down** and tap **"Add to Home Screen"**
5. **Customize** the app name if desired (default: "Pool Control")
6. **Tap "Add"** in the top right corner

The app will now appear on your home screen with its own icon!

### Method 2: Chrome Browser

1. **Open Chrome** on your iOS device
2. **Navigate** to your pool controller dashboard URL
3. **Tap the menu** (three dots) in the top right
4. **Select "Add to Home Screen"**
5. **Customize** the app name and tap **"Add"**

### Method 3: Automatic Installation Prompt

If your browser supports it, you may see an **"Install App"** button appear in the top-right corner of the dashboard. Simply tap this button to install the app.

## Features of the Standalone App

### ✅ Native App Experience
- **Full-screen mode** without browser UI
- **App icon** on home screen
- **Splash screen** on launch
- **Standalone window** (no Safari/Chrome interface)

### ✅ Offline Functionality
- **Cached content** works without internet
- **Offline indicator** shows connection status
- **Automatic sync** when connection restored
- **Background updates** when app reopens

### ✅ iOS Optimizations
- **Touch-friendly** button sizes (44px minimum)
- **Safe area support** for devices with notches
- **Haptic feedback** on interactions
- **Optimized scrolling** and gestures

### ✅ Enhanced Features
- **Connection monitoring** with visual indicators
- **Update notifications** for new versions
- **Dark mode support** (iOS system preference)
- **High contrast** accessibility support

## Troubleshooting

### App Not Installing?
- **Ensure HTTPS**: Some browsers require secure connections
- **Check browser**: Use Safari or Chrome for best compatibility
- **Clear cache**: Try clearing browser cache and cookies
- **Update browser**: Ensure you're using the latest version

### App Not Working Offline?
- **First visit**: The app needs to be visited online first to cache content
- **Service worker**: Check browser console for service worker errors
- **Storage**: Ensure device has sufficient storage space

### Connection Issues?
- **Check network**: Ensure your device is on the same network as the pool controller
- **Firewall**: Verify firewall settings allow connections
- **Port access**: Confirm port 5150 is accessible

## Advanced Configuration

### Custom App Icon
To customize the app icon, replace the files in `/themes/icons/` with your own 180x180px PNG images.

### Offline Data Storage
The app automatically stores recent data locally for offline viewing. This includes:
- Pool status information
- Equipment states
- Recent readings
- Configuration settings

### Background Sync
When the app reconnects to the internet, it automatically syncs any offline changes made while disconnected.

## Support

If you encounter any issues with the iOS app installation or functionality:

1. **Check the console** for error messages (Safari > Develop > Your Device > Console)
2. **Verify service worker** registration in browser developer tools
3. **Test in different browsers** to isolate the issue
4. **Check network connectivity** to the pool controller

The app is designed to work seamlessly across all iOS devices from iPhone 6s to the latest models, including iPad and iPad Pro.

---

**Note**: This is a Progressive Web App (PWA) that provides a native app experience while running in a web browser. It's not distributed through the App Store but offers similar functionality and user experience.
