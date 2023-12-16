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
  /**
   * The App Store Offer code URL that unlocks the receiver reward (in Standard Mode).
   * Opening this URL will open the App Store app and show a prompt asking the user
   * to accept the discounted offer.
   */
  offerCodeUrl: string | null;
  /**
   * Eligiblity of the current user as receiver. The user becomes eligible
   * after opening the referral link that is then handled by `handleDeepLinkAsync`.
   */
  rewardEligibility: ReceiverOfferStatus;
};

export type SenderStatus = {
  /** Current user's referral URL */
  linkUrl: string | null;
  /** Sender reward offer code redemption URL */
  offerCodeUrl: string | null;
  /** Number of redeemed offers from this link */
  redeemedCount: number;
  /** Eligibility of the sender reward */
  rewardEligibility: SenderRewardStatus;
};

export type ReferralStatus = {
  receiverStatus: ReceiverStatus;
  senderStatus: SenderStatus;
  userId: string;
};
