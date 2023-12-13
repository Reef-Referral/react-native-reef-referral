
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNReefReferralSpec.h"

@interface RNReefReferralModule : NSObject <NativeReefReferralSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RNReefReferralModule : NSObject <RCTBridgeModule>
#endif

@end
