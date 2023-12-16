import { TurboModuleRegistry } from 'react-native';

import type { NativeReefReferralSpec } from './types';

export const NativeReefReferral =
  TurboModuleRegistry.getEnforcing<NativeReefReferralSpec>('ReefReferral');
