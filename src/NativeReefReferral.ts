import { type TurboModule, TurboModuleRegistry } from 'react-native';
import type { ReferralStatus } from './types';

// `react-native-codegen` requires this file to be named `Native<moduleName>.ts`,
// export a `Spec extends TurboModule` and use that `Spec` to get module from TM registry.
// Since this library only supports iOS, this file should not be imported on Android or Web.

export interface Spec extends TurboModule {
  startAsync(apiKey: string): Promise<void>;
  getReferralStatusAsync(): Promise<ReferralStatus | null>;
  handleDeepLinkAsync(url: string): Promise<void>;
  triggerSenderSuccessAsync(): Promise<void>;
  triggerReceiverSuccessAsync(): Promise<void>;
  setUserIdAsync(userId: string): Promise<void>;

  addListener: (eventType: string) => void;
  removeListeners: (count: number) => void;
}

export const NativeReefReferral: Spec =
  TurboModuleRegistry.getEnforcing<Spec>('ReefReferral');
