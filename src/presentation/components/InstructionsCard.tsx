import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme/theme';

const steps = [
  { number: '1', text: 'Open TikTok and find a video' },
  { number: '2', text: 'Pause on the moment you want' },
  { number: '3', text: 'Tap Share → Sticker Master' },
  { number: '4', text: 'Draw around what you want' },
  { number: '5', text: 'Save & share your sticker!' },
];

export function InstructionsCard(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to create a sticker</Text>
      {steps.map((step) => (
        <View key={step.number} style={styles.step}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>{step.number}</Text>
          </View>
          <Text style={styles.stepText}>{step.text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    margin: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  numberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  number: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
  stepText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    flex: 1,
  },
});
