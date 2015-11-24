---
layout: "ios"
title: "iOS - 串接說明"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/integration-guide/
lang: "zh-tw"
---
# Vpon SDK 基本使用
---
1. 請先從註冊網址檢查您的Ad Network平台<br>
Taiwan平台為: http://tw.pub.vpon.com/<br>
China平台為: http://cn.pub.vpon.com/<br>

2. 如果您申請的是Taiwan的平台，請使用:`vpadnAd.platform = @"TW"`;

3. 如果您申請的是China的平台，請使用:`vpadnAd.platform = @"CN"`;

4. 在 iOS8 之後如果沒有看到 `didImpression`， 可能是因為 window 沒有預設大小的關係，需要手動去setFrame設定大小，請注意！看到 `didImpression`的log才是正確的串接完成。

# 總覽
---
若要在 iOS 應用程式中顯示 Vpon 廣告，只要在您的 Xcode 專案中導入 SDK，然後在使用者介面中加入相關指令就行了。

# 需求條件
---
VPON 廣告 iOS 版的 SDK 需搭配 iOS 5.x 或更新版本 以及 XCode 4.4 或更新版本。

# 導入 SDK
---

Vpon 提供以下兩種串接廣告的 SDK，擇一即可:<br>
  1. Fundamental SDK (iOS 5.0+)<br>
  2. Framework SDK (iOS 7.0+)

這兩個 SDK 其實提供的功能一樣，差別在於，iOS 版本需求較高的 Framework SDK 的串接較簡單、輕便

## Framework SDK

若您的 app 使用客群是 iOS 7 以上，我們建議您使用 Framework SDK。

Framework SDK 是一包 dynamic library，它會動態抓取 framework reference, headers 還有 Fundamental SDK 內的程式碼，因此對您的廣告串接而言：步驟少、容量也小。

### 導入 Framework SDK

首先，對專案按下右鍵，選擇 `Add Files to your_project`
![]({{site.imgurl}}/ios_framework_1.png)

接著，加入 `VpadnSDKAdKit.framework` 至專案中
![]({{site.imgurl}}/ios_framework_2.png)

再來，至專案設定選項中的 `General` 下方的 `Embedded Binaries` 中點擊 `+`，新增 `VpadnSDKAdKit.framework`
![]({{site.imgurl}}/ios_framework_3.png)

記得，確認一下 `Embedded Binaries` 內是否已加入此 framework
![]({{site.imgurl}}/ios_framework_4.png)

最後，至專案中透過 “@import VpadnSDKAdKit” 引入 SDK

```Objective-C
@import VpadnSDKAdKit
```
![]({{site.imgurl}}/ios_framework_5.png)

> **Note:** <br>
> 再次提醒您 Framework SDK **只對 iOS 7.0 以上的裝置有用**。
> 若您的 app 還支援 7.0 以下的裝置，請勿使用此 framework，而是使用 [Fundamental SDK](#fundamental-sdk)。



## Fundamental SDK
解壓縮後的 SDK 包含Objective-C 標頭、一個執行期間程式庫 要在應用程式中加入 Vpon 廣告，您必須完成三個步驟：

1. 在專案中加入 `libAdOn.a`， `VpadnBanner.h` 與 `VpadnInterstitial.h`
2. 加入相關所需的 framework
3. 在 `Build Settings` 內 `Other Linker Flags` 請填入 `-all_load` 與 `-Obj-C`，並把 `Summary` 下把 `AdSupport` 設為 `Optional`

> **Note**: 上述三項缺一不可，請務必完成！

### 新增 SDK lib
1. 解壓縮後的 SDK 包含一個 lib 檔、及兩個標頭檔。 對 Xcode 中的專案按一下滑鼠右鍵，然後選取 [Add Files to "Vpadn_BannerInter_x5"...] (在 "Vpadn_BannerInter_x5" 中新增檔案)。
![IOS-add-file_vpadn.png]
2. 接著在 SDK 中選取 `libAdOn.a`, `VpadnBanner.h` 與 `VpadnInterstitial.h`
![IOS-add-lib&header_vpadn]

## 新增 Framework
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

欲加入這些 Framework，請對 Vpadn_BannerInter_x5 這個專案名稱按兩下滑鼠，開啟 `Build Phases` 分頁下的 `Link Binary With Libraries` 下拉式選單，然後用畫面上出現的 `+` 按鈕加入 iOS SDK 中的架構。
![IOS-add-frameworks_vpadn]




# App Transport Security
---
iOS9 多了安全條款 App Transport Security (ATS)，若您使用 Xcode 7 建立 iOS9 專案，請參考[這篇]來修改部份設定

# 其他訣竅
請參閱[橫幅廣告](../banner)、[插頁廣告](../Interstitial)、[中介服務](../mediation)中獲取更多簡介。



[IOS-add-lib&header_vpadn]: {{site.imgurl}}/IOS-add-lib&header_vpadn.png
[IOS-add-file_vpadn.png]: {{site.imgurl}}/IOS-add-file_vpadn.png
[IOS-add-frameworks_vpadn]: {{site.imgurl}}/IOS-add-frameworks_vpadn.png
[這篇]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
