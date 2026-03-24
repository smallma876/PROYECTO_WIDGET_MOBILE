import { Sticker } from '../entities/Sticker';
import { MediaRepository } from '../repositories/MediaRepository';
import { StickerRepository } from '../repositories/StickerRepository';
import { UseCase } from './UseCase';

interface SaveStickerInput {
  imageUri: string;
  width: number;
  height: number;
}

export class SaveStickerUseCase implements UseCase<SaveStickerInput, Sticker> {
  constructor(
    private readonly stickerRepository: StickerRepository,
    private readonly mediaRepository: MediaRepository,
  ) {}

  async execute(input: SaveStickerInput): Promise<Sticker> {
    if (!input.imageUri) {
      throw new Error('Image URI is required');
    }

    const sticker = await this.stickerRepository.save(
      input.imageUri,
      input.width,
      input.height,
    );

    await this.mediaRepository.saveToGallery(input.imageUri);

    return sticker;
  }
}
