import { useEffect, useState } from 'react';
import { NativeEventEmitter } from 'react-native';

import { ReefReferral } from './ReefReferral';
import type { ReferralStatus } from './types';
export * from './types';

const Emitter = new NativeEventEmitter(ReefReferral);

export async function startAsync({
  apiKey,
}: {
  apiKey: string;
}): Promise<void> {
  return await ReefReferral.startAsync(apiKey);
}

export async function getReferralStatusAsync(): Promise<ReferralStatus | null> {
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

export async function setUserIdAsync(userId: string): Promise<void> {
  return await ReefReferral.setUserIdAsync(userId);
}

export const addEventListener = (
  eventType: 'referralStatusUpdated',
  listener: (referralStatus: ReferralStatus) => unknown
) => {
  return Emitter.addListener(eventType, listener);
};

export const removeAllListeners = Emitter.removeAllListeners;

export const useReferralStatus = (): {
  referralStatus: ReferralStatus | null;
} => {
  const [referralStatus, setReferralStatus] = useState<ReferralStatus | null>(
    null
  );

  useEffect(() => {
    const listener = addEventListener(
      'referralStatusUpdated',
      setReferralStatus
    );

    // First listener added will trigger an update,
    // subsequent won't, so we need to also get-and-set.
    getReferralStatusAsync().then(setReferralStatus);

    return () => {
      listener.remove();
    };
  }, []);

  return { referralStatus };
};
