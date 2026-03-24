import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';
import { InstructionsCard } from '../components/InstructionsCard';
import { StickerGrid } from '../components/StickerGrid';
import { useStickers } from '../hooks/useStickers';
import { theme } from '../theme/theme';
import { useAppContainer } from '../../di/ContainerContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props): React.JSX.Element {
  const container = useAppContainer();
  const {
    stickers,
    isLoading,
    error,
    shareSticker,
    deleteSticker,
  } = useStickers(
    container.getStickersUseCase,
    container.saveStickerUseCase,
    container.deleteStickerUseCase,
    container.shareStickerUseCase,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sticker Master</Text>
        <Text style={styles.subtitle}>Turn TikTok moments into stickers</Text>
      </View>

      <InstructionsCard />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!isLoading && !error && (
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Your Stickers</Text>
          <StickerGrid
            stickers={stickers}
            onShare={shareSticker}
            onDelete={deleteSticker}
          />
        </View>
      )}
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
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xxl,
    fontWeight: '800',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.md,
    marginTop: theme.spacing.xs,
  },
  historySection: {
    flex: 1,
    paddingTop: theme.spacing.md,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  errorContainer: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.md,
  },
});
