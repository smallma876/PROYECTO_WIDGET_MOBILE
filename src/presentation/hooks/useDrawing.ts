import { useCallback, useState } from 'react';

import {
  addPointToPath,
  closePath,
  createEmptyPath,
  DrawingPath,
  Point,
} from '../../domain/entities/Sticker';
import { theme } from '../theme/theme';

interface UseDrawingResult {
  path: DrawingPath;
  isDrawing: boolean;
  onTouchStart: (point: Point) => void;
  onTouchMove: (point: Point) => void;
  onTouchEnd: () => void;
  resetDrawing: () => void;
  hasValidPath: boolean;
}

export function useDrawing(): UseDrawingResult {
  const [path, setPath] = useState<DrawingPath>(createEmptyPath());
  const [isDrawing, setIsDrawing] = useState(false);

  const onTouchStart = useCallback((point: Point) => {
    setPath(addPointToPath(createEmptyPath(), point));
    setIsDrawing(true);
  }, []);

  const onTouchMove = useCallback((point: Point) => {
    setPath((current) => {
      if (current.isClosed) return current;

      // Only add point if it's far enough from the last point
      const lastPoint = current.points[current.points.length - 1];
      if (lastPoint) {
        const dx = point.x - lastPoint.x;
        const dy = point.y - lastPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < theme.drawing.minPointDistance) {
          return current;
        }
      }

      return addPointToPath(current, point);
    });
  }, []);

  const onTouchEnd = useCallback(() => {
    setIsDrawing(false);
    setPath((current) => closePath(current));
  }, []);

  const resetDrawing = useCallback(() => {
    setPath(createEmptyPath());
    setIsDrawing(false);
  }, []);

  const hasValidPath = path.isClosed && path.points.length >= 3;

  return {
    path,
    isDrawing,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    resetDrawing,
    hasValidPath,
  };
}
