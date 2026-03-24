import { FrameData } from '../entities/Sticker';
import { MediaRepository } from '../repositories/MediaRepository';
import { UseCase } from './UseCase';

export class ExtractFrameUseCase implements UseCase<string, FrameData> {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async execute(videoUri: string): Promise<FrameData> {
    if (!videoUri) {
      throw new Error('Video URI is required');
    }
    return this.mediaRepository.extractFrame(videoUri);
  }
}
