import { Sticker } from '../entities/Sticker';
import { StickerRepository } from '../repositories/StickerRepository';
import { UseCase } from './UseCase';

export class GetStickersUseCase implements UseCase<void, Sticker[]> {
  constructor(private readonly stickerRepository: StickerRepository) {}

  async execute(): Promise<Sticker[]> {
    const stickers = await this.stickerRepository.getAll();
    return stickers.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }
}
