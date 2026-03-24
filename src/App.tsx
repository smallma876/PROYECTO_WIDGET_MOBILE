import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import { createContainer } from './di/container';
import { ContainerProvider } from './di/ContainerContext';
import { ExpoStickerRepository } from './infrastructure/repositories/ExpoStickerRepository';
import { ExpoMediaRepository } from './infrastructure/repositories/ExpoMediaRepository';
import { SkiaImageProcessingService } from './infrastructure/services/SkiaImageProcessingService';
import { AppNavigator } from './presentation/navigation/AppNavigator';

const stickerRepository = new ExpoStickerRepository();
const mediaRepository = new ExpoMediaRepository();
const imageProcessingService = new SkiaImageProcessingService();

const container = createContainer(stickerRepository, mediaRepository, imageProcessingService);

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <ContainerProvider container={container}>
        <StatusBar style="light" />
        <AppNavigator />
      </ContainerProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
