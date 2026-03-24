import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Sticker } from '../../domain/entities/Sticker';
import { theme } from '../theme/theme';

import { StickerCard } from './StickerCard';

interface StickerGridProps {
  stickers: Sticker[];
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

export function StickerGrid({ stickers, onShare, onDelete }: StickerGridProps): React.JSX.Element {
  if (stickers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No stickers yet</Text>
        <Text style={styles.emptySubtext}>
          Share a video from TikTok to create your first sticker
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={stickers}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <StickerCard sticker={item} onShare={onShare} onDelete={onDelete} />
      )}
      contentContainerStyle={styles.grid}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    padding: theme.spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.md,
    textAlign: 'center',
  },
});
