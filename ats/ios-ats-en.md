---
layout:         "ios"
title:          "iOS - ATS"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /ios/ats/
lang:            "en"

---

# ATS SDK Integration Guidelines
---

Please integration ATS SDK using following guidelines, the SDK will send tracking information back to Vpon upon app launches.

# Download
---
Please make sure you have the ATS SDK ready before integration, you may download the ATS SDK from here:

* [Download SDK for 64bit][1]
* [Download Sample Code (exclusive of SDK)][2]

# Requirement:
---
iOS version 3.0 or later

# Integration Steps
---
## 1. Import libraries
Copy `libVponAts.a` and `VponAts.h` into your project folder. Please include `VponAts.h` in your application code.

## 2. Grant Permission
In order to present you with better analytics information, the SDK needs additional permissions. Please make sure following frameworks are included into your project:

 Foundation.framework

 UIKit.framework

 SystemConfiguration.framework

 Security.framework

 CoreTelephony.framework

 CoreLocation.framework

 CoreGraphics.framework

 libVponAts.a

 AdSupport.framework  

 > **Note:** Please set `AdSupport.framework` to `Optional`)


## 3. Integrate ATS SDK
Add include header (VponAts.h) and Delegate (VponAtsDelegate) into AppDelegate

```Objective-C
#import <UIKit/UIKit.h>
#import "VponAts.h"
@interface AppDelegate : UIResponder <UIApplicationDelegate,VponAtsDelegate>{
```

## 4. Implement tracking code
Implement tracking code in the corresponding `.m` file.

```Objective-C
goalID = [[NSString alloc] initWithString:@" Change here to your Goal ID "];
ats = [[VponAts alloc] initWithGoalId:goalID andDelegate:self setLocationOnOff:YES];
```

## 5. Add send tracker event
Add 'send tracker event' in the `applicationDidBecomeActive` function.

```Objective-C
  - (void)applicationDidBecomeActive:(UIApplication *)application
  {
      // Restart any tasks that were paused (or not yet started) while the application
     // was inactive. If the application was previously in the background,
     // optionally refresh the user interface.
  #pragma mark send tracker when active
      [ats tracker];
  }
```

[1]: http://m.vpon.com/sdk/iOS_ATS/AtsLib_64bit.zip
[2]: http://m.vpon.com/sdk/iOS_ATS/VponATS.zip
