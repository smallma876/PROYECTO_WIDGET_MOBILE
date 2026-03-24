import { Skia, SkPath } from '@shopify/react-native-skia';
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';

import { DrawingPath, FrameData, Point } from '../../domain/entities/Sticker';
import { ImageProcessingService } from '../../domain/usecases/CropImageUseCase';

const TEMP_DIR = `${FileSystem.cacheDirectory}sticker_temp/`;

function buildSkiaPath(points: ReadonlyArray<Point>): SkPath {
  const path = Skia.Path.Make();

  if (points.length === 0) {
    return path;
  }

  path.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    path.lineTo(points[i].x, points[i].y);
  }
  path.close();

  return path;
}

export class SkiaImageProcessingService implements ImageProcessingService {
  async cropWithPath(frameData: FrameData, drawingPath: DrawingPath): Promise<string> {
    const dirInfo = await FileSystem.getInfoAsync(TEMP_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(TEMP_DIR, { intermediates: true });
    }

    // Load the source image
    const imageData = await Skia.Data.fromURI(frameData.uri);
    const image = Skia.Image.MakeImageFromEncoded(imageData);
    if (!image) {
      throw new Error('Failed to load image for cropping');
    }

    const width = image.width();
    const height = image.height();

    // Create surface for rendering
    const surface = Skia.Surface.Make(width, height);
    if (!surface) {
      throw new Error('Failed to create rendering surface');
    }

    const canvas = surface.getCanvas();

    // Build clipping path from drawing points
    const clipPath = buildSkiaPath(drawingPath.points);

    // Clear canvas with transparent background
    canvas.clear(Skia.Color('transparent'));

    // Apply clip path and draw image
    canvas.save();
    canvas.clipPath(clipPath, { op: 1 /* Intersect */, antiAlias: true });

    const paint = Skia.Paint();
    canvas.drawImage(image, 0, 0, paint);
    canvas.restore();

    // Export to PNG
    const snapshot = surface.makeImageSnapshot();
    const pngData = snapshot.encodeToBase64();

    const outputPath = `${TEMP_DIR}crop_${uuidv4()}.png`;
    await FileSystem.writeAsStringAsync(outputPath, pngData, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return outputPath;
  }
}
