#import "RNReefReferralModule.h"

#if __has_include(<react-native-reef-referral/react-native-reef-referral-Swift.h>)
#import <react-native-reef-referral/react-native-reef-referral-Swift.h>
#elif __has_include(<react_native_reef_referral/react_native_reef_referral-Swift.h>)
#import <react_native_reef_referral/react_native_reef_referral-Swift.h>
#elif __has_include("react_native_reef_referral-Swift.h")
#import "react_native_reef_referral-Swift.h"
#endif

@interface RNReefReferralModule ()

@property (nonatomic) RNReefReferral *reef;

@end

@implementation RNReefReferralModule

- (instancetype)init
{
  self = [super init];
  if (self) {
    _reef = [[RNReefReferral alloc] initWithModule:self];
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXPORT_MODULE(ReefReferral)

RCT_EXPORT_METHOD(startAsync:(NSString *)apiKey
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [_reef start:apiKey];
  resolve(nil);
}

RCT_EXPORT_METHOD(getReferralStatusAsync:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [_reef getReferralStatus:^(NSDictionary<NSString *,id> *referralStatus, NSError *err) {
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

  [_reef handleDeepLink:url];
  resolve(nil);
}

RCT_EXPORT_METHOD(triggerSenderSuccessAsync:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [_reef triggerSenderSuccess];
  resolve(nil);
}

RCT_EXPORT_METHOD(triggerReceiverSuccessAsync:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [_reef triggerReceiverSuccess];
  resolve(nil);
}

RCT_EXPORT_METHOD(setUserIdAsync:(NSString *)userID
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [_reef setUserID:userID];
  resolve(nil);
}


- (void)startObserving
{
  [_reef startObserving];
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[ @"referralStatusUpdated" ];
}

- (void)handleReferralStatusUpdated:(NSDictionary<NSString *, id> *)referralStatus
{
  [self sendEventWithName:@"referralStatusUpdated" body:referralStatus];
}

- (void)stopObserving
{
  [_reef stopObserving];
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
