---
layout: "ios"
title: "iOS - 串接說明"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/integration-guide/
lang: "zh-tw"
---
# 串接準備
---
在開始串接 SDK 前，請確認您已經擁有 Vpon 開發商帳號，並已經取得您的 License Key。如果您還沒完成註冊，請先[註冊帳號]。

取得 Vpon 開發商帳號後，只要在您的 Xcode 專案中導入 SDK，並在程式碼中加入相關指令即可。

# 導入 SDK
---
Vpon iOS SDK 透過 **Swift Package Manager (SPM)** 發佈與安裝。

### 1. 在 Xcode 加入套件相依

1. 在 Xcode 選單選擇 **File > Add Package Dependencies…**
2. 輸入套件網址：
   ```
   https://github.com/vpon-sdk/VpadnSDK-iOS-SPM
   ```
3. 選擇版本規則（Dependency Rule）：
   * **最低支援 iOS 16.0 以上（建議）**：選擇 **Up to Next Major Version**，填入 `{{site.i_version}}`。
   * **仍需支援 iOS 12.0 – 15.x**：選擇 **Exact Version**，填入 `5.8.0`。
4. 將 **`VpadnSDKAdKit`** 加入您的 App Target。

若使用 `Package.swift`，請加入以下相依設定：

```swift
dependencies: [
    .package(url: "https://github.com/vpon-sdk/VpadnSDK-iOS-SPM.git", from: "{{site.i_version}}"),
]
```

### 2. 加入 `-ObjC` Linker Flag

使用 Swift Package Manager 導入時，請手動在 App Target 加入 `-ObjC`，避免執行時發生閃退：

1. 在 Xcode 選擇您的 **App Target**。
2. 切換至 **Build Settings**，搜尋 **Other Linker Flags**。
3. 加入 `-ObjC`。

> **Note（CocoaPods 說明）**：`5.8.0` 為 CocoaPods 上的最終版本，後續版本（自 `5.8.2` 起）僅透過 Swift Package Manager 發佈。既有透過 `pod 'VpadnSDK'` 安裝的專案可繼續使用 `5.8.0`；若要升級至 `5.8.2` 以上版本，請先從 `Podfile` 移除 `pod 'VpadnSDK'` 並執行 `pod install`，再改用 Swift Package Manager 安裝。

<!-- ## 手動 (手動下載並串接) {#manual-sdk}
---

在開始進行手動串接前，請先[由此下載最新版本的 Vpon SDK](../download)。

首先，對專案按下右鍵，選擇 `Add Files to your project`
<img src="{{site.imgurl}}/ios_framework_8.png" alt="" class="width-300" />

接著，將 `VpadnSDKAdKit.xframework` 加至專案中
![]({{site.imgurl}}/ios_framework_9.png)

請至專案設定選項中的 `General` 標籤下確認 `Linked Frameworks and Libraries` 內是否已加入此 framework
![]({{site.imgurl}}/ios_framework_10.png)

再切換到專案設定選項中的 `Build Settings` 標籤，在 `Other Linker Flags`輸入`-ObjC`
![]({{site.imgurl}}/ios_framework_6.png)

最後，在專案程式碼中加入 “@import VpadnSDKAdKit” 導入 SDK

```objc
@import VpadnSDKAdKit
```
![]({{site.imgurl}}/ios_framework_5.png) -->


<!-- ### Fundamental SDK

**Note:** Vpon 將從 SDK v5.3.1 後停止支援 Fundamental SDK，如果您仍在使用 Fundamental SDK，我們建議您盡快改為使用 Framework SDK。

解壓縮後的 Fundamental SDK 包含 Objective-C 標頭、一個執行期間程式庫。要在應用程式中加入 Vpon 廣告，您必須完成三個步驟：

1. 在專案中加入 `ios-vpadn-sdk.a` 及 Header 檔
2. 加入相關所需的 framework
3. 修改 Build Settings 中的設定

> **Note**：上述三項缺一不可，請務必完成！

#### 1. 新增 SDK lib
1.1 解壓縮後的 SDK 包含一個 .a 檔、及數個標頭檔。對 Xcode 中的專案按一下滑鼠右鍵，然後選取 [Add Files to your_project...] (在 "your_project" 中新增檔案)。
![IOS-add-file_vpadn.png]
1.2 接著在 SDK 中選取 `libAdOn.a`, `VpadnBanner.h` 與 `VpadnInterstitial.h` 等檔案
<img src="{{site.imgurl}}/IOS-add-lib&header_vpadn.png" alt="" class="width-300"/>

#### 2. 新增 Framework
SDK lib 會參照 iOS 的 framework，因此您必須加入必要的 framework。<br>

`AdSupport`, <br>
`AssetsLibrary`, <br>
`AudioToolbox`, <br>
`AVFoundation`, <br>
`CoreFoundation`, <br>
`CoreGraphics`, <br>
`CoreLocation`, <br>
`CoreMedia`, <br>
`CoreMotion`, <br>
`CoreTelephony`, <br>
`EventKit`, <br>
`Foundation`, <br>
`MediaPlayer`, <br>
`MessageUI`, <br>
`MobileCoreServices`, <br>
`QuartzCore`, <br>
`Security`, <br>
`StoreKit`, <br>
`SystemConfiguration`, <br>
`UIKit`

欲加入這些 Framework，請先點擊您的專案，開啟 `Build Phases` 標籤下的 `Link Binary With Libraries` 選單，點 `+` 加入 iOS SDK 中的架構。
![IOS-add-frameworks_vpadn]

#### 3. 修改 Building Settings 中的設定

在 `Build Settings` 內 `Other Linker Flags` 填入 `-all_load` 與 `-ObjC`，並把 `Summary` 下的 `AdSupport` 設為 `Optional` -->


# 初始化 SDK {#initial-sdk}
---
請務必參考以下指示初始化 SDK。

### Objective-C

若您是使用 Objective-C，請在您的 AppDelegate.m 中，加入以下程式碼：

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Vpon SDK initialization
    VponAdConfiguration *config = VponAdConfiguration.shared;
    config.logLevel = VponLogLevelDefault;
    [config initializeSdk];

    return YES;
}
```

### Swift

若您是使用 Swift，請在您的 AppDelegate.swift 中，加入以下程式碼：

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:
    [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    // Vpon SDK initialization
    let config = VponAdConfiguration.shared
    config.logLevel = .default
    config.initializeSdk()

    return true
}
```

>**Note:**
>
>* 為配合第三方追蹤要求，Vpon SDK 會在初始化時，將 App 的 Audio Session Category 設為 `AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers` (當有音樂要播放時，App 將以混音形式播放音樂，且不會受實體音量鍵的影響)。您可以在初始化後，重新指定及啟用 Audio Session Category。如果您不希望 Vpon SDK 更動 Audio Session Category，請參考[進階設定]進行對應調整。


# Usage Description
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

>**Note:** 當您完成 Vpon SDK 的串接並將 App 送審 App Store 時，可能會需要針對上述權限功能的使用增加對應的描述，以 Calendar 為例，可以描述為：App 中有內容需要記錄在行事曆上




<!-- # App Transport Security
---
iOS9 更新了安全條款 App Transport Security (ATS)，請參考 [iOS9 ATS] 來修改部份設定 -->

# Tips
---
關於更多廣告形式的呈現，請參考：

* [橫幅廣告][1]
* [插頁廣告][2]
* [原生廣告][3]
* [中介服務][4]


[IOS-add-file_vpadn.png]: {{site.imgurl}}/IOS-add-file_vpadn.png
[IOS-add-frameworks_vpadn]: {{site.imgurl}}/IOS-add-frameworks_vpadn.png
[iOS9 ATS]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
[Adapter or Custom Events]: {{site.baseurl}}/zh-tw/ios/download/#adapter-download
[Sample Codes]: {{site.baseurl}}/zh-tw/ios/download/#sample-code-download

[註冊帳號]: {{ site.baseurl }}/zh-tw/ios/registration/
[1]:{{ site.baseurl }}/zh-tw/ios/banner/
[2]:{{ site.baseurl }}/zh-tw/ios/interstitial/
[3]:{{ site.baseurl }}/zh-tw/ios/native/
[4]:{{ site.baseurl }}/zh-tw/ios/mediation/
[進階設定]:{{ site.baseurl }}/zh-tw/ios/advanced/#audio

<!--
1. 串接**橫幅廣告**時會進行`遮蔽偵測`，若部分廣告被遮蔽而使廣告無法通過遮蔽偵測，會無法顯示`didImpression`，請注意！看到 `didImpression`的log才是正確的串接完成。
-->