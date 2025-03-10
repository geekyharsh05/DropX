import React, {useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import {requestPhotoPermission} from './src/utils/Constants';
import {checkFilePermissions} from './src/utils/libraryHelpers';
import {Platform} from 'react-native';

const App = () => {
  
  useEffect(() => {
    requestPhotoPermission();
    checkFilePermissions(Platform.OS);
  }, []);

  return <Navigation />;
};

export default App;
