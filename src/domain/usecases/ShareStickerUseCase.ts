import { MediaRepository } from '../repositories/MediaRepository';
import { StickerRepository } from '../repositories/StickerRepository';
import { UseCase } from './UseCase';

export class ShareStickerUseCase implements UseCase<string, void> {
  constructor(
    private readonly stickerRepository: StickerRepository,
    private readonly mediaRepository: MediaRepository,
  ) {}

  async execute(stickerId: string): Promise<void> {
    if (!stickerId) {
      throw new Error('Sticker ID is required');
    }

    const sticker = await this.stickerRepository.getById(stickerId);
    if (!sticker) {
      throw new Error(`Sticker with id ${stickerId} not found`);
    }

    await this.mediaRepository.shareSticker(sticker.uri);
  }
}
