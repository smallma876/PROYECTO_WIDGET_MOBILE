import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Sticker } from '../../domain/entities/Sticker';
import { theme } from '../theme/theme';

interface StickerCardProps {
  sticker: Sticker;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

export function StickerCard({ sticker, onShare, onDelete }: StickerCardProps): React.JSX.Element {
  const handleDelete = () => {
    Alert.alert(
      'Delete Sticker',
      'Are you sure you want to delete this sticker?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(sticker.id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.transparencyBg} />
        <Image source={{ uri: sticker.uri }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={() => onShare(sticker.id)}>
          <Text style={styles.actionText}>Share</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={handleDelete}>
          <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  imageContainer: {
    aspectRatio: 1,
    overflow: 'hidden',
  },
  transparencyBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.surfaceLight,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.sm,
  },
  actionButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  actionText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSize.sm,
    fontWeight: '500',
  },
  deleteText: {
    color: theme.colors.error,
  },
});
