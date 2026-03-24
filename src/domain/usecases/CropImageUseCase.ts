import { DrawingPath, FrameData } from '../entities/Sticker';
import { UseCase } from './UseCase';

export interface ImageProcessingService {
  cropWithPath(frameData: FrameData, path: DrawingPath): Promise<string>;
}

interface CropImageInput {
  frameData: FrameData;
  path: DrawingPath;
}

export class CropImageUseCase implements UseCase<CropImageInput, string> {
  constructor(private readonly imageProcessing: ImageProcessingService) {}

  async execute(input: CropImageInput): Promise<string> {
    if (input.path.points.length < 3) {
      throw new Error('Path must have at least 3 points to form a valid shape');
    }
    if (!input.path.isClosed) {
      throw new Error('Path must be closed before cropping');
    }
    return this.imageProcessing.cropWithPath(input.frameData, input.path);
  }
}
