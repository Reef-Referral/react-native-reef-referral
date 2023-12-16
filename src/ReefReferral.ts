import { NativeModules, Platform } from 'react-native';

import type { Spec } from './NativeReefReferral';

const LINKING_ERROR =
  `The package 'react-native-reef-referral' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const asyncNoop = () => Promise.resolve();
const BaseNativeReefReferral: Spec = {
  startAsync: asyncNoop,
  getReferralStatusAsync: () => Promise.resolve(null),
  handleDeepLinkAsync: asyncNoop,
  triggerSenderSuccessAsync: asyncNoop,
  triggerReceiverSuccessAsync: asyncNoop,
  setUserIdAsync: asyncNoop,

  getConstants: () => ({}),
  addListener: asyncNoop,
  removeListeners: asyncNoop,
};

const ReefReferralModule: Spec = isTurboModuleEnabled
  ? Platform.select({
      ios: require('./NativeReefReferral').NativeReefReferral,
      default: BaseNativeReefReferral,
    })
  : Platform.select({
      ios: NativeModules.ReefReferral,
      default: BaseNativeReefReferral,
    });

export const ReefReferral = ReefReferralModule
  ? ReefReferralModule
  : new Proxy({} as Spec, {
      get() {
        throw new Error(LINKING_ERROR);
      },
    });
