//
//  RNReefReferral.swift
//  react-native-reef-referral
//
//  Created by Stanisław Chmiela on 13/12/2023.
//

import Foundation
import ReefReferral

@objc(RNReefReferral)
public class RNReefReferral: NSObject, ReefReferralDelegate {
  let reef = ReefReferral.shared
  let module: RNReefReferralModule

  @objc(initWithModule:)
  public init(module: RNReefReferralModule) {
    self.module = module
  }

  @objc(start:)
  public func start(apiKey: String) -> Void {
    reef.start(apiKey: apiKey)
  }

  @objc(getReferralStatus:)
  public func getReferralStatus() async throws -> [String: Any] {
    return try await reef.getReferralStatus().asDictionary as [String : Any]
  }

  @objc(handleDeepLink:)
  public func handleDeepLink(url: URL) {
    reef.handleDeepLink(url: url)
  }

  @objc(triggerSenderSuccess)
  public func triggerSenderSuccess() {
    reef.triggerSenderSuccess()
  }

  @objc(triggerReceiverSuccess)
  public func triggerReceiverSuccess() {
    reef.triggerReceiverSuccess()
  }

  @objc(setUserID:)
  public func setUserID(id: String) {
    reef.setUserID(id: id)
  }

  @objc(startObserving)
  public func startObserving() -> Void {
    reef.delegate = self
  }

  public func statusUpdated(referralStatus: ReefReferral.ReferralStatus) {
    self.module.handleReferralStatusUpdated(referralStatus.asDictionary)
  }

  @objc(stopObserving)
  public func stopObserving() -> Void {
    reef.delegate = nil
  }
}

extension ReefReferral.ReferralStatus {
  var asDictionary: [String: Any] {
    [
      "receiverStatus": [
        "offerCodeUrl": (receiverStatus.offerCodeURL?.absoluteString ?? NSNull()) as Any,
        "rewardEligibility": receiverStatus.rewardEligibility.asJsValue
      ],
      "senderStatus": [
        "linkUrl": (senderStatus.linkURL?.absoluteString ?? NSNull()) as Any,
        "offerCodeURL": (senderStatus.offerCodeURL?.absoluteString ?? NSNull()) as Any,
        "redeemedCount": senderStatus.redeemedCount,
        "rewardEligibility": senderStatus.rewardEligibility.asJsValue
      ],
      "userId": userID
    ]
  }
}

extension ReefReferral.SenderRewardStatus {
  var asJsValue: String {
    switch self {
    case .eligible:
      "eligible"
    case .not_eligible:
      "notEligible"
    case .redeemed:
      "redeemed"
    }
  }
}

extension ReefReferral.ReceiverOfferStatus {
  var asJsValue: String {
    switch self {
    case .eligible:
      "eligible"
    case .not_eligible:
      "notEligible"
    case .redeemed:
      "redeemed"
    }
  }
}
