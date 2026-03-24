import { Sticker } from '../entities/Sticker';

export interface StickerRepository {
  save(imageUri: string, width: number, height: number): Promise<Sticker>;
  getAll(): Promise<Sticker[]>;
  getById(id: string): Promise<Sticker | null>;
  delete(id: string): Promise<void>;
}
