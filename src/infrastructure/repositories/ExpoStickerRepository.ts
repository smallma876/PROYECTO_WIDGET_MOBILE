import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';

import { createSticker, Sticker } from '../../domain/entities/Sticker';
import { StickerRepository } from '../../domain/repositories/StickerRepository';

const STICKERS_STORAGE_KEY = '@sticker_master/stickers';
const STICKERS_DIR = `${FileSystem.documentDirectory}stickers/`;

interface StoredSticker {
  id: string;
  uri: string;
  thumbnailUri: string;
  createdAt: string;
  width: number;
  height: number;
}

function toSticker(stored: StoredSticker): Sticker {
  return {
    id: stored.id,
    uri: stored.uri,
    thumbnailUri: stored.thumbnailUri,
    createdAt: new Date(stored.createdAt),
    width: stored.width,
    height: stored.height,
  };
}

function toStored(sticker: Sticker): StoredSticker {
  return {
    id: sticker.id,
    uri: sticker.uri,
    thumbnailUri: sticker.thumbnailUri,
    createdAt: sticker.createdAt.toISOString(),
    width: sticker.width,
    height: sticker.height,
  };
}

export class ExpoStickerRepository implements StickerRepository {
  private async ensureDirectory(): Promise<void> {
    const dirInfo = await FileSystem.getInfoAsync(STICKERS_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(STICKERS_DIR, { intermediates: true });
    }
  }

  private async loadStickers(): Promise<StoredSticker[]> {
    const data = await AsyncStorage.getItem(STICKERS_STORAGE_KEY);
    if (!data) {
      return [];
    }
    return JSON.parse(data) as StoredSticker[];
  }

  private async saveStickers(stickers: StoredSticker[]): Promise<void> {
    await AsyncStorage.setItem(STICKERS_STORAGE_KEY, JSON.stringify(stickers));
  }

  async save(imageUri: string, width: number, height: number): Promise<Sticker> {
    await this.ensureDirectory();

    const id = uuidv4();
    const fileName = `sticker_${id}.png`;
    const destinationUri = `${STICKERS_DIR}${fileName}`;

    await FileSystem.copyAsync({
      from: imageUri,
      to: destinationUri,
    });

    const sticker = createSticker({
      id,
      uri: destinationUri,
      thumbnailUri: destinationUri,
      width,
      height,
    });

    const stored = await this.loadStickers();
    stored.push(toStored(sticker));
    await this.saveStickers(stored);

    return sticker;
  }

  async getAll(): Promise<Sticker[]> {
    const stored = await this.loadStickers();
    return stored.map(toSticker);
  }

  async getById(id: string): Promise<Sticker | null> {
    const stored = await this.loadStickers();
    const found = stored.find((s) => s.id === id);
    return found ? toSticker(found) : null;
  }

  async delete(id: string): Promise<void> {
    const stored = await this.loadStickers();
    const sticker = stored.find((s) => s.id === id);

    if (sticker) {
      const fileInfo = await FileSystem.getInfoAsync(sticker.uri);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(sticker.uri);
      }
    }

    const filtered = stored.filter((s) => s.id !== id);
    await this.saveStickers(filtered);
  }
}
