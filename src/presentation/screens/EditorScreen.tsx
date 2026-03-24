import React, { useCallback } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';
import { ActionButton } from '../components/ActionButton';
import { DrawingCanvas } from '../components/DrawingCanvas';
import { useDrawing } from '../hooks/useDrawing';
import { useAppContainer } from '../../di/ContainerContext';
import { theme } from '../theme/theme';
import { ExpoHapticsService } from '../../infrastructure/services/HapticsService';

type Props = NativeStackScreenProps<RootStackParamList, 'Editor'>;

const haptics = new ExpoHapticsService();

export function EditorScreen({ navigation, route }: Props): React.JSX.Element {
  const { frameData } = route.params;
  const container = useAppContainer();
  const { path, isDrawing, onTouchStart, onTouchMove, onTouchEnd, resetDrawing, hasValidPath } =
    useDrawing();
  const [isCropping, setIsCropping] = React.useState(false);

  const handleCrop = useCallback(async () => {
    if (!hasValidPath) return;

    try {
      setIsCropping(true);
      const croppedUri = await container.cropImageUseCase.execute({
        frameData,
        path,
      });

      await haptics.success();

      navigation.navigate('Preview', {
        stickerUri: croppedUri,
        width: frameData.width,
        height: frameData.height,
      });
    } catch (_err) {
      await haptics.error();
      setIsCropping(false);
      return;
    } finally {
      setIsCropping(false);
    }
  }, [hasValidPath, container, frameData, path, navigation]);

  const handleReset = useCallback(async () => {
    await haptics.light();
    resetDrawing();
  }, [resetDrawing]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.instruction}>
          {isDrawing ? 'Keep drawing...' : hasValidPath ? 'Looking good! Crop or redraw.' : 'Draw around what you want'}
        </Text>
      </View>

      <View style={styles.canvasContainer}>
        <DrawingCanvas
          frameData={frameData}
          path={path}
          isDrawing={isDrawing}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </View>

      <View style={styles.toolbar}>
        <ActionButton
          title="Reset"
          variant="ghost"
          onPress={handleReset}
          disabled={path.points.length === 0}
        />
        {isCropping ? (
          <ActivityIndicator color={theme.colors.primary} size="large" />
        ) : (
          <ActionButton
            title="Crop"
            variant="primary"
            onPress={handleCrop}
            disabled={!hasValidPath}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  instruction: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.md,
  },
  canvasContainer: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
});
