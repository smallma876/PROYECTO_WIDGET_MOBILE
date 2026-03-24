import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Svg, { Polyline } from 'react-native-svg';

import { DrawingPath, FrameData, Point } from '../../domain/entities/Sticker';
import { theme } from '../theme/theme';

interface DrawingCanvasProps {
  frameData: FrameData;
  path: DrawingPath;
  isDrawing: boolean;
  onTouchStart: (point: Point) => void;
  onTouchMove: (point: Point) => void;
  onTouchEnd: () => void;
}

export function DrawingCanvas({
  frameData,
  path,
  isDrawing,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: DrawingCanvasProps): React.JSX.Element {
  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      onTouchStart({ x: event.x, y: event.y });
    })
    .onUpdate((event) => {
      onTouchMove({ x: event.x, y: event.y });
    })
    .onEnd(() => {
      onTouchEnd();
    })
    .minDistance(0);

  const pointsString = path.points
    .map((p) => `${p.x},${p.y}`)
    .join(' ');

  const closedPointsString =
    path.isClosed && path.points.length > 0
      ? `${pointsString} ${path.points[0].x},${path.points[0].y}`
      : pointsString;

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <Image
          source={{ uri: frameData.uri }}
          style={styles.image}
          resizeMode="contain"
        />
        <Svg style={styles.svgOverlay}>
          {path.points.length > 0 && (
            <Polyline
              points={closedPointsString}
              fill="none"
              stroke={theme.colors.drawingStroke}
              strokeWidth={theme.drawing.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={isDrawing ? undefined : '5,5'}
            />
          )}
        </Svg>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  svgOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
