import { type NativeReefReferralSpec } from './types';

const asyncNoop = () => Promise.resolve();

export const BaseNativeReefReferral: NativeReefReferralSpec = {
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
