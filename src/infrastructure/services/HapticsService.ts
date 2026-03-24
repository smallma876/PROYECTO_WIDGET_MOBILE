import * as Haptics from 'expo-haptics';

export interface HapticsServiceInterface {
  light(): Promise<void>;
  medium(): Promise<void>;
  heavy(): Promise<void>;
  success(): Promise<void>;
  warning(): Promise<void>;
  error(): Promise<void>;
}

export class ExpoHapticsService implements HapticsServiceInterface {
  async light(): Promise<void> {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  async medium(): Promise<void> {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  async heavy(): Promise<void> {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  async success(): Promise<void> {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  async warning(): Promise<void> {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }

  async error(): Promise<void> {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
}
