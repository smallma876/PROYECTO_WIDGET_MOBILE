import { MediaRepository } from '../domain/repositories/MediaRepository';
import { StickerRepository } from '../domain/repositories/StickerRepository';
import { CropImageUseCase, ImageProcessingService } from '../domain/usecases/CropImageUseCase';
import { DeleteStickerUseCase } from '../domain/usecases/DeleteStickerUseCase';
import { ExtractFrameUseCase } from '../domain/usecases/ExtractFrameUseCase';
import { GetStickersUseCase } from '../domain/usecases/GetStickersUseCase';
import { SaveStickerUseCase } from '../domain/usecases/SaveStickerUseCase';
import { ShareStickerUseCase } from '../domain/usecases/ShareStickerUseCase';

export interface Container {
  extractFrameUseCase: ExtractFrameUseCase;
  cropImageUseCase: CropImageUseCase;
  saveStickerUseCase: SaveStickerUseCase;
  getStickersUseCase: GetStickersUseCase;
  deleteStickerUseCase: DeleteStickerUseCase;
  shareStickerUseCase: ShareStickerUseCase;
}

export function createContainer(
  stickerRepository: StickerRepository,
  mediaRepository: MediaRepository,
  imageProcessingService: ImageProcessingService,
): Container {
  return {
    extractFrameUseCase: new ExtractFrameUseCase(mediaRepository),
    cropImageUseCase: new CropImageUseCase(imageProcessingService),
    saveStickerUseCase: new SaveStickerUseCase(stickerRepository, mediaRepository),
    getStickersUseCase: new GetStickersUseCase(stickerRepository),
    deleteStickerUseCase: new DeleteStickerUseCase(stickerRepository),
    shareStickerUseCase: new ShareStickerUseCase(stickerRepository, mediaRepository),
  };
}
