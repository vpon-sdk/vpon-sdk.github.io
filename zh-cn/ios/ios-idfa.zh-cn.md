---
layout: "ios"
title: "iOS - 取得 IDFA"
lead: "适用于 iOS 14 以上版本"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/idfa/
lang: "zh-cn"
---
# 概览
---
根据[App Store 对于自iOS 14 起隐私及数据使用政策的说明]，自iOS 14 起，将会限制App 取得IDFA 的方式，App 必须透过呼叫[App Tracking Transparency framework]，向用户发出允许App Tracking 授权的请求。本文将说明如何在 App 中实作 ATT framework 以取得用户授权。

>**Note:** 如果没有实作 ATT framework，将会完全无法取得 IDFA，间接影响您的广告收益

## Step1. 在 Info.plist 中加入 Usage Description
---
请先在专案中的 Info.plist 中，加入 `NSUserTrackingUsageDescription`，用于告知用户此权限将如何被使用的简短描述。


```xml
<key>NSUserTrackingUsageDescription</key>
<string>Your data will be used to deliver personalized ads to you.</string>
```

>**Note:** 在文案撰写上，建议可以先说明该权限及数据用途，以提高用户允许的意愿


## Step2. 实作 ATT Framework
---
请参考以下范例实作 ATT Framework，询问用户是否允许 App 透过 IDFA 进行追踪。

### Objective-c

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

>**Note:** 为了避免影响广告收益，我们建议您在初次发出广告请求前，先向用户取得允许 App Tracking 的授权



[App Store 对于自iOS 14 起隐私及数据使用政策的说明]: https://developer.apple.com/app-store/user-privacy-and-data-use/
[App Tracking Transparency framework]: https://developer.apple.com/documentation/apptrackingtransparency