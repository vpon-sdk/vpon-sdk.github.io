---
layout:         "ios"
title:          "iOS - Get IDFA in iOS 14+"
lead:           "Compatible with iOS 14 and above version"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/idfa/
lang:            "en"

---
# Overview
---
According to [User Privacy and Data Use - App Store], Apple will start to restrict how App get IDFA from iOS 14. App must receive the authorization of App Tracking from user through [App Tracking Transparency framework]. The instruction will describe how to implement ATT framework to get user's permission.

>**Note:** Without the implementation of ATT framework, the IDFA from user will be zeroed out completely and might cause the loss in ad revenue.


## Step1. Add Usage Description In The Info.plist
---
Please add `NSUserTrackingUsageDescription` in the Info.plist of your project to describe how this permission will be used.


```xml
<key>NSUserTrackingUsageDescription</key>
<string>Your data will be used to deliver personalized ads to you.</string>
```

>**Note:** We recommend that you can add some explanation of the App Tracking permission and data usage to increase user's willingness to grant the permission. For example, `"This identifier will be used to deliver personalized ads to you."`


## Step2. ATT Framework Implementation
---
Please refer to the sample below to implement the ATT framework to ask if user allow to be tracked through IDFA.

### Objective-C

```objc
if (@available(iOS 14, *)) {
        [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
        }];
    } else {
    }
```


### Swift

```swift
if #available(iOS 14, *) {
	ATTrackingManager.requestTrackingAuthorization { _ in
	}
} else {
            // Fallback on earlier versions
}
```

>**Note:** To prevent the impact on the ad revenue, we recommend that it would be better to ask for the App Tracking authorization before sending the first ad request.


[User Privacy and Data Use - App Store]: https://developer.apple.com/app-store/user-privacy-and-data-use/
[App Tracking Transparency framework]: https://developer.apple.com/documentation/apptrackingtransparency