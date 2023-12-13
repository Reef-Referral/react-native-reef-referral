
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNReefReferralSpec.h"
#import "RCTEventEmitter.h"

@interface RNReefReferralModule : RCTEventEmitter <NativeReefReferralSpec>
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNReefReferralModule : RCTEventEmitter <RCTBridgeModule>
#endif

- (void)handleReferralStatusUpdated:(NSDictionary<NSString *, id> *)referralStatus;

@end
