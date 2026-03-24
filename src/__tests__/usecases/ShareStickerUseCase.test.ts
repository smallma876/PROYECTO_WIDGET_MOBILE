import { Sticker } from '../../domain/entities/Sticker';
import { MediaRepository } from '../../domain/repositories/MediaRepository';
import { StickerRepository } from '../../domain/repositories/StickerRepository';
import { ShareStickerUseCase } from '../../domain/usecases/ShareStickerUseCase';

describe('ShareStickerUseCase', () => {
  let mockStickerRepo: jest.Mocked<StickerRepository>;
  let mockMediaRepo: jest.Mocked<MediaRepository>;
  let useCase: ShareStickerUseCase;

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
      save: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn().mockResolvedValue(mockSticker),
      delete: jest.fn(),
    };
    mockMediaRepo = {
      extractFrame: jest.fn(),
      saveToGallery: jest.fn(),
      shareSticker: jest.fn().mockResolvedValue(undefined),
    };
    useCase = new ShareStickerUseCase(mockStickerRepo, mockMediaRepo);
  });

  it('should share an existing sticker', async () => {
    await useCase.execute('sticker-1');

    expect(mockStickerRepo.getById).toHaveBeenCalledWith('sticker-1');
    expect(mockMediaRepo.shareSticker).toHaveBeenCalledWith('/path/to/sticker.png');
  });

  it('should throw if sticker ID is empty', async () => {
    await expect(useCase.execute('')).rejects.toThrow('Sticker ID is required');
    expect(mockStickerRepo.getById).not.toHaveBeenCalled();
    expect(mockMediaRepo.shareSticker).not.toHaveBeenCalled();
  });

  it('should throw if sticker is not found', async () => {
    mockStickerRepo.getById.mockResolvedValue(null);

    await expect(useCase.execute('nonexistent')).rejects.toThrow(
      'Sticker with id nonexistent not found',
    );
    expect(mockMediaRepo.shareSticker).not.toHaveBeenCalled();
  });

  it('should propagate sharing errors', async () => {
    mockMediaRepo.shareSticker.mockRejectedValue(new Error('Sharing unavailable'));

    await expect(useCase.execute('sticker-1')).rejects.toThrow('Sharing unavailable');
  });
});
