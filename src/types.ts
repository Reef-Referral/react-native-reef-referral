import type { TurboModule } from 'react-native';

export enum ReceiverOfferStatus {
  NotEligible = 'notEligible',
  Eligible = 'eligible',
  Redeemed = 'redeemed',
}

export enum SenderRewardStatus {
  NotEligible = 'notEligible',
  Eligible = 'eligible',
  Redeemed = 'redeemed',
}

export type ReceiverStatus = {
  offerCodeUrl: string | null;
  rewardEligibility: ReceiverOfferStatus;
};

export type SenderStatus = {
  linkUrl: string | null;
  offerCodeUrl: string | null;
  redeemedCount: number;
  rewardEligibility: SenderRewardStatus;
};

export type ReferralStatus = {
  receiverStatus: ReceiverStatus;
  senderStatus: SenderStatus;
  userId: string;
};

export interface NativeReefReferralSpec extends TurboModule {
  startAsync(apiKey: string): Promise<void>;
  getReferralStatusAsync(): Promise<ReferralStatus | null>;
  handleDeepLinkAsync(url: string): Promise<void>;
  triggerSenderSuccessAsync(): Promise<void>;
  triggerReceiverSuccessAsync(): Promise<void>;
  setUserIdAsync(userId: string): Promise<void>;

  addListener: (eventType: string) => void;
  removeListeners: (count: number) => void;
}
