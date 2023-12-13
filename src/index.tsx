import { NativeEventEmitter } from 'react-native';

import { ReefReferral } from './ReefReferral';
import type { ReferralStatus } from './types';

export * from './types';

export async function startAsync({
  apiKey,
}: {
  apiKey: string;
}): Promise<void> {
  return await ReefReferral.startAsync(apiKey);
}

export async function getReferralStatusAsync(): Promise<ReferralStatus> {
  return await ReefReferral.getReferralStatusAsync();
}

export async function handleDeepLinkAsync(url: string): Promise<void> {
  return await ReefReferral.handleDeepLinkAsync(url);
}

export async function triggerSenderSuccessAsync(): Promise<void> {
  return await ReefReferral.triggerSenderSuccessAsync();
}

export async function triggerReceiverSuccessAsync(): Promise<void> {
  return await ReefReferral.triggerReceiverSuccessAsync();
}

export async function setUserId(userId: string): Promise<void> {
  return await ReefReferral.setUserId(userId);
}

const Emitter = new NativeEventEmitter(ReefReferral);

export const addEventListener = (
  eventType: 'referralStatusUpdated',
  listener: (referralStatus: ReferralStatus) => unknown
) => {
  return Emitter.addListener(eventType, listener);
};

export const removeAllListeners = Emitter.removeAllListeners;
