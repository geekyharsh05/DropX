import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {modalStyles} from '../../styles/modalStyles';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import {multiColor} from '../../utils/Constants';
import CustomText from '../global/CustomText';
import {TouchableOpacity} from 'react-native';
import Icon from '../global/Icon';
import {useTCP} from '../../service/TCPProvider';
import DeviceInfo from 'react-native-device-info';
import {getLocalIPAddress} from '../../utils/networkUtils';
import {navigate} from '../../utils/NavigationUtil';
import { Base64 } from 'js-base64'; // Import a compatible base64 library

// Simple encoding function - uses base64 with a simple transformation
const encodeData = (data: string): string => {
  try {
    // Apply a simple transformation (reverse the string and add a salt)
    const salt = 'DropX';
    const transformed = salt + data.split('').reverse().join('');
    // Convert to base64 using js-base64 library
    return Base64.encode(transformed);
  } catch (error) {
    console.error('Error encoding data:', error);
    // Fallback to plain string if encoding fails
    return data;
  }
};

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const QRGenerateModal: FC<ModalProps> = ({visible, onClose}) => {
  const {isConnected, startServer, server} = useTCP();

  const [loading, setLoading] = useState(true);
  const [qrValue, setQRValue] = useState('profile');
  const shimmerTranslateX = useSharedValue(-300);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{translateX: shimmerTranslateX.value}],
  }));

  const setupServer = async () => {
    try {
      const deviceName = await DeviceInfo.getDeviceName();
      const ip = await getLocalIPAddress();
      const port = 4000;

      console.log('Raw data to encode:', { deviceName, ip, port });

      // Hash the values instead of using encodeURIComponent
      const hashedDeviceName = encodeData(deviceName);
      const hashedIpPort = encodeData(`${ip}:${port}`);
      
      console.log('Encoded data:', { hashedDeviceName, hashedIpPort });

      const qrData = `tcp://${hashedIpPort}|${hashedDeviceName}`;
      console.log('Final QR data:', qrData);
      
      if (server) {
        setQRValue(qrData);
        setLoading(false);
        return;
      }

      startServer(port);
      setQRValue(qrData);
      console.log(`Server Info: ${ip}:${port}`);
      setLoading(false);
    } catch (error) {
      console.error('Error setting up server:', error);
      // Set a fallback QR value
      setQRValue(`tcp://localhost:4000|fallback`);
      setLoading(false);
    }
  };

  useEffect(() => {
    shimmerTranslateX.value = withRepeat(
      withTiming(300, {duration: 1500, easing: Easing.linear}),
      -1,
      false,
    );

    if (visible) {
      setLoading(true);
      setupServer();
    }
  }, [visible]);

  useEffect(() => {
    console.log('TCPProvider: isConnected updated to', isConnected);
    if (isConnected) {
      onClose();
      navigate('ConnectionScreen');
    }
  }, [isConnected]);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="formSheet"
      onRequestClose={onClose}
      onDismiss={onClose}>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.qrContainer}>
          {loading || qrValue === null || qrValue == '' ? (
            <View style={modalStyles.skeleton}>
              <Animated.View style={[modalStyles.shimmerOverlay, shimmerStyle]}>
                <LinearGradient
                  colors={['#f3f3f3', '#fff', '#f3f3f3']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={modalStyles.shimmerGradient}
                />
              </Animated.View>
            </View>
          ) : (
            <QRCode
              value={qrValue}
              size={250}
              logoSize={60}
              logoBackgroundColor="#fff"
              logoMargin={2}
              logoBorderRadius={10}
              logo={require('../../assets/images/profile.jpg')}
              linearGradient={multiColor}
              enableLinearGradient
            />
          )}
        </View>

        <View style={modalStyles.info}>
          <CustomText style={modalStyles.infoText1}>
            Ensure you're on the same Wi-Fi network.
          </CustomText>
          <CustomText style={modalStyles.infoText2}>
            Ask the sender to scan this QR code to connect and transfer files.
          </CustomText>
        </View>

        <ActivityIndicator
          size="small"
          color="#000"
          style={{alignSelf: 'center'}}
        />

        <TouchableOpacity
          onPress={() => onClose()}
          style={modalStyles.closeButton}>
          <Icon name="close" iconFamily="Ionicons" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default QRGenerateModal;
