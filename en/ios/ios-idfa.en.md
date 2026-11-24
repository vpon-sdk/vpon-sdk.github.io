---
layout:         "ios"
title:          "iOS - App Tracking Transparency (IDFA)"
lead:           ""
description:    "Implement Apple's App Tracking Transparency (ATT) framework to request IDFA authorization."
keywords:       "iOS, IDFA, ATT, App Tracking Transparency, Vpon SDK"
permalink:      ios/idfa/
lang:           "en"
---

# Overview
---
On iOS, apps must request user permission through Apple's [App Tracking Transparency (ATT) framework] before accessing the device's IDFA (Identifier for Advertisers), in accordance with Apple's [User Privacy and Data Use] policy.

> **Note:** Without ATT authorization, the system returns an all-zero IDFA, which may reduce ad relevance and overall ad revenue.

# Step 1: Add Usage Description to `Info.plist`
---
Add the `NSUserTrackingUsageDescription` key to your project's `Info.plist` with a clear message explaining why your app requests tracking permission:

```xml
<key>NSUserTrackingUsageDescription</key>
<string>This identifier will be used to deliver personalized ads to you.</string>
```

> **Tip:** Explain the benefit clearly (for example, delivering more relevant ads) so users understand how their data is used before making a choice.

# Step 2: Request Tracking Authorization
---
Call `ATTrackingManager.requestTrackingAuthorization` to display the system permission prompt.

### Objective-C

```objc
@import AppTrackingTransparency;

[ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
    // Proceed to load ads after the authorization dialog is completed
}];
```

### Swift

```swift
import AppTrackingTransparency

ATTrackingManager.requestTrackingAuthorization { status in
    // Proceed to load ads after the authorization dialog is completed
}
```

## Best Practices
---
* **Call when the app is active:** Request authorization after the app becomes active (for example, in `sceneDidBecomeActive:` or `applicationDidBecomeActive:`); otherwise, iOS may not display the prompt.
* **Request before loading ads:** Display the ATT prompt before sending your first ad request so Vpon SDK can receive the updated IDFA status.

[User Privacy and Data Use]: https://developer.apple.com/app-store/user-privacy-and-data-use/
[App Tracking Transparency (ATT) framework]: https://developer.apple.com/documentation/apptrackingtransparency
