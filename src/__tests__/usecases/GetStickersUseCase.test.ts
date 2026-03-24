import { Sticker } from '../../domain/entities/Sticker';
import { StickerRepository } from '../../domain/repositories/StickerRepository';
import { GetStickersUseCase } from '../../domain/usecases/GetStickersUseCase';

describe('GetStickersUseCase', () => {
  let mockStickerRepo: jest.Mocked<StickerRepository>;
  let useCase: GetStickersUseCase;

  const mockStickers: Sticker[] = [
    {
      id: 'sticker-1',
      uri: '/path/to/s1.png',
      thumbnailUri: '/path/to/t1.png',
      createdAt: new Date('2024-01-01'),
      width: 100,
      height: 100,
    },
    {
      id: 'sticker-2',
      uri: '/path/to/s2.png',
      thumbnailUri: '/path/to/t2.png',
      createdAt: new Date('2024-06-15'),
      width: 200,
      height: 200,
    },
    {
      id: 'sticker-3',
      uri: '/path/to/s3.png',
      thumbnailUri: '/path/to/t3.png',
      createdAt: new Date('2024-03-10'),
      width: 150,
      height: 150,
    },
  ];

  beforeEach(() => {
    mockStickerRepo = {
      save: jest.fn(),
      getAll: jest.fn().mockResolvedValue(mockStickers),
      getById: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new GetStickersUseCase(mockStickerRepo);
  });

  it('should return stickers sorted by newest first', async () => {
    const result = await useCase.execute();

    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('sticker-2'); // June 2024
    expect(result[1].id).toBe('sticker-3'); // March 2024
    expect(result[2].id).toBe('sticker-1'); // January 2024
  });

  it('should return empty array when no stickers exist', async () => {
    mockStickerRepo.getAll.mockResolvedValue([]);

    const result = await useCase.execute();
    expect(result).toEqual([]);
  });

  it('should propagate repository errors', async () => {
    mockStickerRepo.getAll.mockRejectedValue(new Error('Storage error'));

    await expect(useCase.execute()).rejects.toThrow('Storage error');
  });
});
