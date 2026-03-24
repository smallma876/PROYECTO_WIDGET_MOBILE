import { FrameData } from '../../domain/entities/Sticker';
import { MediaRepository } from '../../domain/repositories/MediaRepository';
import { ExtractFrameUseCase } from '../../domain/usecases/ExtractFrameUseCase';

describe('ExtractFrameUseCase', () => {
  let mockMediaRepository: jest.Mocked<MediaRepository>;
  let useCase: ExtractFrameUseCase;

  const mockFrameData: FrameData = {
    uri: '/path/to/frame.jpg',
    width: 1080,
    height: 1920,
  };

  beforeEach(() => {
    mockMediaRepository = {
      extractFrame: jest.fn().mockResolvedValue(mockFrameData),
      saveToGallery: jest.fn(),
      shareSticker: jest.fn(),
    };
    useCase = new ExtractFrameUseCase(mockMediaRepository);
  });

  it('should extract a frame from a video URI', async () => {
    const result = await useCase.execute('video://test.mp4');

    expect(result).toEqual(mockFrameData);
    expect(mockMediaRepository.extractFrame).toHaveBeenCalledWith('video://test.mp4');
  });

  it('should throw an error if video URI is empty', async () => {
    await expect(useCase.execute('')).rejects.toThrow('Video URI is required');
    expect(mockMediaRepository.extractFrame).not.toHaveBeenCalled();
  });

  it('should propagate repository errors', async () => {
    mockMediaRepository.extractFrame.mockRejectedValue(new Error('Failed to extract'));

    await expect(useCase.execute('video://test.mp4')).rejects.toThrow('Failed to extract');
  });
});
