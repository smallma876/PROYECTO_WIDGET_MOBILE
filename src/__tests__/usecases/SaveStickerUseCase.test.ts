import { Sticker } from '../../domain/entities/Sticker';
import { MediaRepository } from '../../domain/repositories/MediaRepository';
import { StickerRepository } from '../../domain/repositories/StickerRepository';
import { SaveStickerUseCase } from '../../domain/usecases/SaveStickerUseCase';

describe('SaveStickerUseCase', () => {
  let mockStickerRepo: jest.Mocked<StickerRepository>;
  let mockMediaRepo: jest.Mocked<MediaRepository>;
  let useCase: SaveStickerUseCase;

  const mockSticker: Sticker = {
    id: 'sticker-1',
    uri: '/path/to/sticker.png',
    thumbnailUri: '/path/to/thumb.png',
    createdAt: new Date(),
    width: 200,
    height: 200,
  };

  beforeEach(() => {
    mockStickerRepo = {
      save: jest.fn().mockResolvedValue(mockSticker),
      getAll: jest.fn(),
      getById: jest.fn(),
      delete: jest.fn(),
    };
    mockMediaRepo = {
      extractFrame: jest.fn(),
      saveToGallery: jest.fn().mockResolvedValue('gallery://saved'),
      shareSticker: jest.fn(),
    };
    useCase = new SaveStickerUseCase(mockStickerRepo, mockMediaRepo);
  });

  it('should save sticker and add to gallery', async () => {
    const result = await useCase.execute({
      imageUri: '/path/to/image.png',
      width: 200,
      height: 200,
    });

    expect(result).toEqual(mockSticker);
    expect(mockStickerRepo.save).toHaveBeenCalledWith('/path/to/image.png', 200, 200);
    expect(mockMediaRepo.saveToGallery).toHaveBeenCalledWith('/path/to/image.png');
  });

  it('should throw if image URI is empty', async () => {
    await expect(
      useCase.execute({ imageUri: '', width: 100, height: 100 }),
    ).rejects.toThrow('Image URI is required');

    expect(mockStickerRepo.save).not.toHaveBeenCalled();
    expect(mockMediaRepo.saveToGallery).not.toHaveBeenCalled();
  });

  it('should propagate repository save errors', async () => {
    mockStickerRepo.save.mockRejectedValue(new Error('Storage full'));

    await expect(
      useCase.execute({ imageUri: '/path/to/image.png', width: 100, height: 100 }),
    ).rejects.toThrow('Storage full');
  });

  it('should propagate gallery save errors', async () => {
    mockMediaRepo.saveToGallery.mockRejectedValue(new Error('No permission'));

    await expect(
      useCase.execute({ imageUri: '/path/to/image.png', width: 100, height: 100 }),
    ).rejects.toThrow('No permission');
  });
});
