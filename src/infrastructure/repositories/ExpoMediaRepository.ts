import { AVPlaybackStatus, Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

import { FrameData } from '../../domain/entities/Sticker';
import { MediaRepository } from '../../domain/repositories/MediaRepository';

export class ExpoMediaRepository implements MediaRepository {
  async extractFrame(videoUri: string): Promise<FrameData> {
    // For the MVP, we receive the video URI and use the first frame
    // In a production app, we'd use a native module to extract specific frames
    // For now, we treat the shared content as an image (TikTok shares often include thumbnails)
    return {
      uri: videoUri,
      width: 1080,
      height: 1920,
    };
  }

  async saveToGallery(stickerUri: string): Promise<string> {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Media library permission is required to save stickers');
    }

    const asset = await MediaLibrary.createAssetAsync(stickerUri);
    return asset.uri;
  }

  async shareSticker(stickerUri: string): Promise<void> {
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      throw new Error('Sharing is not available on this device');
    }

    await Sharing.shareAsync(stickerUri, {
      mimeType: 'image/png',
      dialogTitle: 'Share your sticker',
    });
  }
}
