import { useCallback, useEffect, useState } from 'react';

import { Sticker } from '../../domain/entities/Sticker';
import { DeleteStickerUseCase } from '../../domain/usecases/DeleteStickerUseCase';
import { GetStickersUseCase } from '../../domain/usecases/GetStickersUseCase';
import { SaveStickerUseCase } from '../../domain/usecases/SaveStickerUseCase';
import { ShareStickerUseCase } from '../../domain/usecases/ShareStickerUseCase';

interface UseStickersResult {
  stickers: Sticker[];
  isLoading: boolean;
  error: string | null;
  saveSticker: (imageUri: string, width: number, height: number) => Promise<Sticker>;
  deleteSticker: (id: string) => Promise<void>;
  shareSticker: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useStickers(
  getStickersUseCase: GetStickersUseCase,
  saveStickerUseCase: SaveStickerUseCase,
  deleteStickerUseCase: DeleteStickerUseCase,
  shareStickerUseCase: ShareStickerUseCase,
): UseStickersResult {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getStickersUseCase.execute();
      setStickers(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stickers');
    } finally {
      setIsLoading(false);
    }
  }, [getStickersUseCase]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveSticker = useCallback(
    async (imageUri: string, width: number, height: number): Promise<Sticker> => {
      const sticker = await saveStickerUseCase.execute({ imageUri, width, height });
      await refresh();
      return sticker;
    },
    [saveStickerUseCase, refresh],
  );

  const deleteSticker = useCallback(
    async (id: string): Promise<void> => {
      await deleteStickerUseCase.execute(id);
      await refresh();
    },
    [deleteStickerUseCase, refresh],
  );

  const shareSticker = useCallback(
    async (id: string): Promise<void> => {
      await shareStickerUseCase.execute(id);
    },
    [shareStickerUseCase],
  );

  return {
    stickers,
    isLoading,
    error,
    saveSticker,
    deleteSticker,
    shareSticker,
    refresh,
  };
}
