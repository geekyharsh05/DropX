import {StyleSheet, Dimensions} from 'react-native';
import {Colors, screenHeight, screenWidth} from '../utils/Constants';

// Get device dimensions
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

// Calculate responsive units
const vw = deviceWidth / 100; // 1% of viewport width
const vh = deviceHeight / 100; // 1% of viewport height
const responsiveUnit = Math.min(vw, vh); // Use the smaller value for consistency

export const homeHeaderStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.primary,
  },
  container: {
    padding: responsiveUnit * 2.5, // Responsive padding
    zIndex: 4,
  },
  curve: {
    position: 'absolute',
    bottom: -deviceHeight * 0.09,
    zIndex: 3,
    width: '100%',
  },
  logo: {
    width: deviceWidth * 0.4,
    height: deviceHeight * 0.048,
    resizeMode: 'contain',
  },
  profile: {
    width: responsiveUnit * 11, // Makes profile size relative to screen size
    height: responsiveUnit * 11, // Maintains square aspect ratio
    borderRadius: responsiveUnit * 5.5, // Half of width/height for circular shape
    resizeMode: 'cover',
  },
});
