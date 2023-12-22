import { useCallback, useEffect, useState } from 'react';
import { Linking, NativeEventEmitter } from 'react-native';

import { ReefReferral } from './ReefReferral';
import type { ReferralStatus } from './types';
export * from './types';

const Emitter = new NativeEventEmitter(ReefReferral);

/** Start Reef Referral SDK with provided API key */
export async function startAsync({
  apiKey,
}: {
  apiKey: string;
}): Promise<void> {
  return await ReefReferral.startAsync(apiKey);
}

/** Get current referral status */
export async function getReferralStatusAsync(): Promise<ReferralStatus | null> {
  return await ReefReferral.getReferralStatusAsync();
}

/** Notify SDK that the app has been opened from a deep link */
export async function handleDeepLinkAsync(url: string): Promise<void> {
  return await ReefReferral.handleDeepLinkAsync(url);
}

/** Notify SDK that the sender (referrer) reward has been granted by your app */
export async function triggerSenderSuccessAsync(): Promise<void> {
  return await ReefReferral.triggerSenderSuccessAsync();
}

/** Notify SDK that the receiever (referred user) reward has been granted by your app */
export async function triggerReceiverSuccessAsync(): Promise<void> {
  return await ReefReferral.triggerReceiverSuccessAsync();
}

/** Set the user ID. By default, an anonymous ID will be generated. */
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

/**
 * Always returns current referral status as it changes.
 * `null` return value means value has not been read yet
 * or could not been read, like if the library is used
 * on an unsupported platform.
 */
export const useReferralStatus = (): {
  referralStatus: ReferralStatus | null;
  refresh: () => Promise<ReferralStatus | null>;
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

  const refresh = useCallback(async () => {
    const nextReferralStatus = await getReferralStatusAsync();
    setReferralStatus(nextReferralStatus);
    return nextReferralStatus;
  }, []);

  return { referralStatus, refresh };
};

/** Setup SDK with provided API key and handle deep link opens */
export function useReefReferral({ apiKey }: { apiKey: string }) {
  const [url, setUrl] = useState<string | null>(null);

  // Initialize SDK
  useEffect(() => {
    startAsync({ apiKey }).catch((err) => {
      console.warn('Failed to start Reef Referral SDK', err);
    });
  }, [apiKey]);

  // Set up initial URL
  useEffect(() => {
    Linking.getInitialURL()
      .then(setUrl)
      .catch((err) =>
        console.warn(
          'react-native-reef-referral: failed to fetch initial URL',
          err
        )
      );
  }, []);

  // Set up subscription
  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url: nextUrl }) => {
      setUrl(nextUrl);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  // Handle deep links
  useEffect(() => {
    if (url) {
      ReefReferral.handleDeepLinkAsync(url).catch((err) =>
        console.warn(
          `react-native-reef-referral: failed to handle deep link \`${url}\``,
          err
        )
      );
    }
  }, [url]);
}
