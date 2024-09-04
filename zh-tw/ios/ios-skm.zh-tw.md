---
layout: "ios"
title: "iOS - Vpon SDK Integration Guideline"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/guideline
lang: "zh-tw"
---

# Vpon SDK Integration
---

## Import Vpon SDK
---

1. 對專案按下右鍵，選擇 `Add Files to your project`，將 `VpadnSDKAdKit.xcframework` 加至專案中，並選擇 Embed & Sign
<img src="{{site.imgurl}}/ios_framework_8.png" alt="" class="width-300" />

請至專案設定選項中的 `General` 標籤下確認 `Linked Frameworks and Libraries` 內是否已加入此 framework

2. 切換到專案設定選項中的 `Build Settings` 標籤，在 `Other Linker Flags`輸入`-ObjC`
![]({{site.imgurl}}/ios_framework_6.png)


# 初始化 SDK 
---

請務必參考以下指示初始化 SDK。

### Objective-C

若您是使用 Objective-C，請在您的 AppDelegate.m 中，加入以下程式碼：

```objc
// Using Vpon SDK v560 and above
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Vpon SDK initialization
    VponAdConfiguration *config = VponAdConfiguration.shared;
    config.logLevel = VponLogLevelDefault;
    [config initializeSdk];

    VponAdRequestConfiguration *reqConfig = VponAdRequestConfiguration.shared;
    reqConfig.networkId = VponNetworkIdSKM;

    return YES;
}
```

### Swift

若您是使用 Swift，請在您的 AppDelegate.swift 中，加入以下程式碼：

```swift
// Using Vpon SDK v560 and above
 func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:      
    [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        // Vpon SDK initialization
        let config = VponAdConfiguration.shared
        config.logLevel = .default
        config.initializeSdk()

        let reqConfig = VponAdRequestConfiguration.shared
        reqconf.networkId = .VponNetworkIdSKM

        return true
    }
```

>**Note:**
>
>* 為配合第三方追蹤要求，Vpon SDK 會在初始化時，將 App 的 Audio Session Category 設為 `AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers` (當有音樂要播放時，App 將以混音形式播放音樂，且不會受實體音量鍵的影響)。您可以在初始化後，重新指定及啟用 Audio Session Category。如果您不希望 Vpon SDK 更動 Audio Session Category，請參考[進階設定]進行對應調整。


## Usage Description
---

Vpon SDK 支援多種表現形式廣告的呈現，為了展示特定類型廣告，以下為 Vpon SDK 中可能使用到的權限：
    
```xml
<key>NSCalendarsUsageDescription</key>
<key>NSCameraUsageDescription</key>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<key>NSLocationUsageDescription</key>
<key>NSLocationWhenInUseUsageDescription</key>
<key>NSPhotoLibraryUsageDescription</key>
```

當您完成 Vpon SDK 的串接後，可以參考以下文案在專案中新增 Usage Description：

| 權限 | 描述 |
|:-----|:----|
| Calendars | App 中的行銷內容會將特定的行銷活動進行時間記錄在您的行事曆上 |
| Camera | App 中的行銷內容需要使用您的相機 |
| Location | App 將針對您所在的位置提供更精準的行銷廣告 |
| PhotoLibrary | App 中的行銷內容需要取用您的相片 |

>**Note**: 以上權限取得主要是因為部份客製化廣告可能需要行銷活動加入行事曆，或是需要使用者上傳圖片等……這部分使用率非常低，因為 SDK 依然有支援這些功能，所以必須加註描述說明。

# 取得 VponID
---

請使用以下方式取得 VponID:

```Swift
let vponId = VponAdConfiguration.shared.getVponID()
```

使用以上 API 取得的 VponID 格式將如下：

```
v1_89177a51-1708-46ad-a38a-03a4c37e6f2d.1722917052121
```

[進階設定]:{{ site.baseurl }}/zh-tw/ios/advanced/#audio