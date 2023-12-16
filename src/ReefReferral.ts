import { NativeModules, Platform } from 'react-native';

import { BaseNativeReefReferral } from './BaseNativeReefReferral';
import type { NativeReefReferralSpec } from './types';

const LINKING_ERROR =
  `The package 'react-native-reef-referral' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const ReefReferralModule: NativeReefReferralSpec = isTurboModuleEnabled
  ? require('./NativeReefReferral').NativeReefReferral
  : Platform.select({
      ios: NativeModules.ReefReferral,
      default: BaseNativeReefReferral,
    });

export const ReefReferral = ReefReferralModule
  ? ReefReferralModule
  : new Proxy({} as NativeReefReferralSpec, {
      get() {
        throw new Error(LINKING_ERROR);
      },
    });
