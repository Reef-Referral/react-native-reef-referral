
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNReefReferral.h"
#if __has_include(<React/RCTEventEmitter.h>)
#import <React/RCTEventEmitter.h>
#elif __has_include("RCTEventEmitter.h")
#import "RCTEventEmitter.h"
#elif __has_include("React/RCTEventEmitter.h")
#import "React/RCTEventEmitter.h"
#endif

@interface RNReefReferralModule : RCTEventEmitter <NativeReefReferralSpec>
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNReefReferralModule : RCTEventEmitter <RCTBridgeModule>
#endif

- (void)handleReferralStatusUpdated:(NSDictionary<NSString *, id> *)referralStatus;

@end
