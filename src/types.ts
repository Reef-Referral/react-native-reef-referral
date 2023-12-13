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
