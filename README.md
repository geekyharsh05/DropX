go to client folder
run command "npm install --force"
run command "npm run pod-install" for ios Only
run command "npm run android" or "npm run ios"

Note: Emulator run on different ip might not be able to 
establish connection you have to use real device or ios simulator

Create APK using command
cd android && ./gradlew assembleRelease

check folder 
android/app/build/output/release/app-release.apk