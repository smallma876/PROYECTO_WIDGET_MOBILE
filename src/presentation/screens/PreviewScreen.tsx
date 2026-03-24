import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';
import { ActionButton } from '../components/ActionButton';
import { TransparencyGrid } from '../components/TransparencyGrid';
import { useStickers } from '../hooks/useStickers';
import { useAppContainer } from '../../di/ContainerContext';
import { ExpoHapticsService } from '../../infrastructure/services/HapticsService';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Preview'>;

const haptics = new ExpoHapticsService();

export function PreviewScreen({ navigation, route }: Props): React.JSX.Element {
  const { stickerUri, width, height } = route.params;
  const container = useAppContainer();
  const { saveSticker } = useStickers(
    container.getStickersUseCase,
    container.saveStickerUseCase,
    container.deleteStickerUseCase,
    container.shareStickerUseCase,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleSave = useCallback(async () => {
    try {
      setIsSaving(true);
      const sticker = await saveSticker(stickerUri, width, height);

      await haptics.success();
      setSavedMessage('Sticker saved!');

      // Share after saving
      try {
        await container.shareStickerUseCase.execute(sticker.id);
      } catch {
        // User cancelled share, that's OK
      }

      navigation.popToTop();
    } catch (err) {
      await haptics.error();
      setSavedMessage('Failed to save. Try again.');
    } finally {
      setIsSaving(false);
    }
  }, [stickerUri, width, height, saveSticker, container, navigation]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Preview</Text>
        {savedMessage && <Text style={styles.message}>{savedMessage}</Text>}
      </View>

      <View style={styles.previewContainer}>
        <TransparencyGrid style={styles.grid}>
          <Image
            source={{ uri: stickerUri }}
            style={styles.stickerImage}
            resizeMode="contain"
          />
        </TransparencyGrid>
      </View>

      <View style={styles.toolbar}>
        <ActionButton title="Cancel" variant="ghost" onPress={handleCancel} disabled={isSaving} />
        {isSaving ? (
          <ActivityIndicator color={theme.colors.primary} size="large" />
        ) : (
          <ActionButton title="Done" variant="primary" onPress={handleSave} />
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
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
  },
  message: {
    color: theme.colors.success,
    fontSize: theme.fontSize.md,
    marginTop: theme.spacing.xs,
  },
  previewContainer: {
    flex: 1,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  grid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickerImage: {
    width: '80%',
    height: '80%',
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
