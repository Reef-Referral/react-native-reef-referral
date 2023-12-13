import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { ReferralStatus } from './types';

export interface NativeReefReferralSpec extends TurboModule {
  startAsync(apiKey: string): Promise<void>;
  getReferralStatusAsync(): Promise<ReferralStatus>;
  handleDeepLinkAsync(url: string): Promise<void>;
  triggerSenderSuccessAsync(): Promise<void>;
  triggerReceiverSuccessAsync(): Promise<void>;
  setUserId(userId: string): Promise<void>;

  addListener: (eventType: string) => void;
  removeListeners: (count: number) => void;
}

export const NativeReefReferral =
  TurboModuleRegistry.getEnforcing<NativeReefReferralSpec>('ReefReferral');
