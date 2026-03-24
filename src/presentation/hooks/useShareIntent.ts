import { useEffect, useState } from 'react';
import { Linking } from 'react-native';

import { FrameData } from '../../domain/entities/Sticker';
import { ExtractFrameUseCase } from '../../domain/usecases/ExtractFrameUseCase';

interface UseShareIntentResult {
  frameData: FrameData | null;
  isProcessing: boolean;
  error: string | null;
  processUri: (uri: string) => Promise<void>;
}

export function useShareIntent(
  extractFrameUseCase: ExtractFrameUseCase,
): UseShareIntentResult {
  const [frameData, setFrameData] = useState<FrameData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processUri = async (uri: string): Promise<void> => {
    try {
      setIsProcessing(true);
      setError(null);
      const frame = await extractFrameUseCase.execute(uri);
      setFrameData(frame);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process shared content');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    // Handle deep link when app opens from share
    const handleUrl = (event: { url: string }) => {
      if (event.url) {
        processUri(event.url);
      }
    };

    // Check if app was opened with a URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        processUri(url);
      }
    });

    // Listen for incoming URLs while app is open
    const subscription = Linking.addEventListener('url', handleUrl);

    return () => {
      subscription.remove();
    };
  }, [extractFrameUseCase]);

  return {
    frameData,
    isProcessing,
    error,
    processUri,
  };
}
