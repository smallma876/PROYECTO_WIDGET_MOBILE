import { StickerRepository } from '../repositories/StickerRepository';
import { UseCase } from './UseCase';

export class DeleteStickerUseCase implements UseCase<string, void> {
  constructor(private readonly stickerRepository: StickerRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('Sticker ID is required');
    }

    const sticker = await this.stickerRepository.getById(id);
    if (!sticker) {
      throw new Error(`Sticker with id ${id} not found`);
    }

    await this.stickerRepository.delete(id);
  }
}
