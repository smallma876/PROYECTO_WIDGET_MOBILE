import { FrameData } from '../entities/Sticker';

export interface MediaRepository {
  extractFrame(videoUri: string): Promise<FrameData>;
  saveToGallery(stickerUri: string): Promise<string>;
  shareSticker(stickerUri: string): Promise<void>;
}
