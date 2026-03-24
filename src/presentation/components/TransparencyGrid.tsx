import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { theme } from '../theme/theme';

interface TransparencyGridProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const GRID_SIZE = 20;

export function TransparencyGrid({ style, children }: TransparencyGridProps): React.JSX.Element {
  const rows = 40;
  const cols = 20;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.grid}>
        {Array.from({ length: rows }).map((_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: cols }).map((_, col) => (
              <View
                key={col}
                style={[
                  styles.cell,
                  {
                    backgroundColor:
                      (row + col) % 2 === 0
                        ? theme.colors.transparencyGridLight
                        : theme.colors.transparencyGridDark,
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: GRID_SIZE,
    height: GRID_SIZE,
  },
});
