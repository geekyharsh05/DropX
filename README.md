# DropX

## Getting Started

Follow these steps to set up and run the project.

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
2. Install dependencies
  ```bash
  npm install --force
  ```
3. For iOS only: Install CocoaPods dependencies
  ```bash
  npm run pod-install
  ```
4. Run the project

   For Android:
   ```bash
   npm run android
   ```

   For iOS:
   ```bash
   npm run ios
   ```

### Note: If the emulator runs on a different IP, the connection might fail. In such cases, use a real device or the iOS simulator.

### Steps to Create an APK

1. Navigate to the android folder
   ```bash
   cd android
   ```

2. Run the Gradle build command
   ```bash
    ./gradlew assembleRelease
   ```
3. Locate the APK file
   ```bash
    android/app/build/outputs/release/app-release.apk
   ```
