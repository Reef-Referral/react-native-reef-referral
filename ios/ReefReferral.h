
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNReefReferralSpec.h"

@interface ReefReferral : NSObject <NativeReefReferralSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ReefReferral : NSObject <RCTBridgeModule>
#endif

@end
