import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import CustomText from '../global/CustomText';
import {commonStyles} from '../../styles/commonStyles';

const Misc = () => {
  return (
    <View style={styles.container}>
      <CustomText fontSize={13} fontFamily="Okra-Bold">
        Explore
      </CustomText>

      <Image
        source={require('../../assets/icons/adbanner.png')}
        style={styles.adBanner}
      />

      <View style={commonStyles.flexRowBetween}>
        <CustomText fontFamily="Okra-Bold" style={styles.text} fontSize={22}>
          #1 World Best File Sharing App!
        </CustomText>
        <Image
          source={require('../../assets//icons/share_logo.jpg')}
          style={styles.image}
        />
      </View>

      <CustomText fontFamily="Okra-Bold" style={styles.text2}>
        Made with ❤️ - Ritik Prasad
      </CustomText>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  adBanner: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 25,
  },
  text: {
    opacity: 0.5,
    width: '60%',
  },
  text2: {
    opacity: 0.5,
    marginTop: 10,
  },
  image: {
    resizeMode: 'contain',
    height: 120,
    width: '35%',
  },
});

export default Misc;
