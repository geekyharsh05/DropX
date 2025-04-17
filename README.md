<div align="center">
  <img src="./src/assets/images/logo_t.png" alt="DropX logo" width="500" height="175">
</div>

# DropX - Peer-to-Peer File Transfer Application

## Overview
DropX is a secure peer-to-peer file transfer application built with React Native, enabling direct file sharing between devices using TCP/TLS sockets. The application supports both Android and iOS platforms, providing a secure and efficient way to transfer files locally.

## Features
- Secure peer-to-peer file transfer using TLS encryption
- Support for both Android and iOS platforms
- Chunked file transfer for handling large files
- Real-time transfer progress tracking
- Automatic connection recovery
- Support for multiple file types
- QR code scanning for easy connection

## Technical Stack
- **Frontend Framework**: React Native (v0.78.0)
- **State Management**: Zustand
- **Network Protocol**: TCP with TLS encryption
- **File System**: React Native FS
- **Additional Libraries**:
  - `react-native-tcp-socket`
  - `react-native-fs`
  - `immer`
  - `react-native-device-info`
  - `react-native-vision-camera`
  - `react-native-qrcode-svg`

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Navigate to the `client` folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install --force
```

3. For iOS only: Install CocoaPods dependencies:
```bash
npm run pod-install
```

### Running the Application

For Android:
```bash
npm run android
```

For iOS:
```bash
npm run ios
```

**Note**: If the emulator runs on a different IP, the connection might fail. In such cases, use a real device or the iOS simulator.

### Steps to Create an APK

1. Navigate to the android folder:
```bash
cd android
```

2. Run the Gradle build command:
```bash
./gradlew assembleRelease
```

3. Locate the APK file at:
```bash
android/app/build/outputs/release/app-release.apk
```

## Architecture

### Core Components

#### 1. TCP Provider
- Manages TCP/TLS connections
- Handles file transfer logic
- Implements connection state management
- Provides context for the application

#### 2. Navigation System
Implements screen navigation with the following routes:
- SplashScreen
- HomeScreen
- ConnectionScreen
- SendScreen
- ReceiveScreen
- ReceivedFileScreen

#### 3. File Transfer Protocol
1. **Connection Phase**
   - TLS handshake
   - Device information exchange
   - Connection acknowledgment

2. **Transfer Phase**
   - File metadata exchange
   - Chunked data transfer
   - Progress tracking
   - Chunk acknowledgment system

3. **Completion Phase**
   - File integrity verification
   - File reconstruction
   - Success confirmation

### Security Features
- TLS encryption for all transfers
- Certificate-based authentication
- Secure socket configuration
- High-water mark implementation for flow control

## Required Permissions

### Android
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
```

### iOS
- Camera access
- Photo library access
- Local network access
- Documents folder access

## Troubleshooting

1. **Connection Issues**
   - Ensure both devices are on the same network
   - Check if the correct IP address is being used
   - Verify that required permissions are granted

2. **File Transfer Problems**
   - Check available storage space
   - Ensure all required permissions are granted
   - Verify network stability

3. **Build Issues**
   - Clean and rebuild the project
   - Check for compatible dependency versions
   - Verify development environment setup
