---
layout: "ios"
title: "iOS - 取得 IDFA"
lead: "適用於 iOS 14 以上版本"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/idfa/
lang: "zh-tw"
---
# 概覽
---
根據 [App Store 對於自 iOS 14 起隱私及數據使用政策的說明]，自 iOS 14 起，將會限制 App 取得 IDFA 的方式，App 必須透過呼叫 [App Tracking Transparency framework]，向用戶發出允許 App Tracking 授權的請求。本文將說明如何在 App 中實作 ATT framework 以取得用戶授權。

>**Note:** 如果沒有實作 ATT framework，將會完全無法取得 IDFA，間接影響您的廣告收益

## Step1. 在 Info.plist 中加入 Usage Description
---
請先在專案中的 Info.plist 中，加入 `NSUserTrackingUsageDescription`，用於告知用戶此權限將如何被使用的簡短描述。


```xml
<key>NSUserTrackingUsageDescription</key>
<string>Your data will be used to deliver personalized ads to you.</string>
```

>**Note:** 在文案撰寫上，建議可以先說明該權限及數據用途，以提高用戶允許的意願。例如：這項資料會被用來提供個人化廣告給您 (Your data will be used to deliver personalized ads to you.)。


## Step2. 實作 ATT Framework
---
請參考以下範例實作 ATT Framework，詢問用戶是否允許 App 透過 IDFA 進行追蹤。

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

>**Note:** 為了避免影響廣告收益，我們建議您在初次發出廣告請求前，先向用戶取得允許 App Tracking 的授權




[App Store 對於自 iOS 14 起隱私及數據使用政策的說明]: https://developer.apple.com/app-store/user-privacy-and-data-use/
[App Tracking Transparency framework]: https://developer.apple.com/documentation/apptrackingtransparency