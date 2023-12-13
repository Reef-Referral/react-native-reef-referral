#import "RNReefReferralModule.h"

#if __has_include(<react-native-reef-referral/react-native-reef-referral-Swift.h>)
#import <react-native-reef-referral/react-native-reef-referral-Swift.h>
#elif __has_include(<react_native_reef_referral/react_native_reef_referral-Swift.h>)
#import <react_native_reef_referral/react_native_reef_referral-Swift.h>
#elif __has_include("react_native_reef_referral-Swift.h")
#import "react_native_reef_referral-Swift.h"
#endif

@implementation RNReefReferralModule

RCT_EXPORT_MODULE(ReefReferral)

RCT_EXPORT_METHOD(startAsync:(NSString *)apiKey
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [[RNReefReferral shared] start:apiKey];
  resolve(nil);
}

RCT_EXPORT_METHOD(getReferralStatusAsync:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [[RNReefReferral shared] getReferralStatus:^(NSDictionary<NSString *,id> *referralStatus, NSError *err) {
      if (referralStatus) {
          resolve(referralStatus);
      } else {
          reject(@"", err.localizedDescription, err);
      }
  }];
}

RCT_EXPORT_METHOD(handleDeepLinkAsync:(NSString *)urlString
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSURL *url = [[NSURL alloc] initWithString:urlString];
  if (!url) {
    reject(@"", @"Provided string is not a URL", nil);
    return;
  }

  [[RNReefReferral shared] handleDeepLink:url];
  resolve(nil);
}

RCT_EXPORT_METHOD(triggerSenderSuccessAsync:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [[RNReefReferral shared] triggerSenderSuccess];
  resolve(nil);
}

RCT_EXPORT_METHOD(triggerReceiverSuccessAsync:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [[RNReefReferral shared] triggerReceiverSuccess];
  resolve(nil);
}

RCT_EXPORT_METHOD(setUserId:(NSString *)userID
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [[RNReefReferral shared] setUserID:userID];
  resolve(nil);
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeReefReferralSpecJSI>(params);
}
#endif

@end
