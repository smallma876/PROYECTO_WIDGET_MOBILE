import { DrawingPath, FrameData } from '../../domain/entities/Sticker';
import { CropImageUseCase, ImageProcessingService } from '../../domain/usecases/CropImageUseCase';

describe('CropImageUseCase', () => {
  let mockImageProcessing: jest.Mocked<ImageProcessingService>;
  let useCase: CropImageUseCase;

  const mockFrameData: FrameData = {
    uri: '/path/to/frame.jpg',
    width: 1080,
    height: 1920,
  };

  const validPath: DrawingPath = {
    points: [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
    ],
    isClosed: true,
  };

  beforeEach(() => {
    mockImageProcessing = {
      cropWithPath: jest.fn().mockResolvedValue('/path/to/cropped.png'),
    };
    useCase = new CropImageUseCase(mockImageProcessing);
  });

  it('should crop image with a valid closed path', async () => {
    const result = await useCase.execute({
      frameData: mockFrameData,
      path: validPath,
    });

    expect(result).toBe('/path/to/cropped.png');
    expect(mockImageProcessing.cropWithPath).toHaveBeenCalledWith(mockFrameData, validPath);
  });

  it('should throw if path has fewer than 3 points', async () => {
    const invalidPath: DrawingPath = {
      points: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
      ],
      isClosed: true,
    };

    await expect(
      useCase.execute({ frameData: mockFrameData, path: invalidPath }),
    ).rejects.toThrow('Path must have at least 3 points');
  });

  it('should throw if path is not closed', async () => {
    const openPath: DrawingPath = {
      points: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 100 },
      ],
      isClosed: false,
    };

    await expect(
      useCase.execute({ frameData: mockFrameData, path: openPath }),
    ).rejects.toThrow('Path must be closed');
  });

  it('should propagate processing errors', async () => {
    mockImageProcessing.cropWithPath.mockRejectedValue(new Error('Processing failed'));

    await expect(
      useCase.execute({ frameData: mockFrameData, path: validPath }),
    ).rejects.toThrow('Processing failed');
  });
});
