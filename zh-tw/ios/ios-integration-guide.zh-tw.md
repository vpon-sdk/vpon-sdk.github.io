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
Taiwan平台為: <http://tw.pub.vpon.com/><br>
China平台為: <http://cn.pub.vpon.com/><br>

2. 如果您申請的是Taiwan的平台，請使用:`vpadnAd.platform = @"TW"`;

3. 如果您申請的是China的平台，請使用:`vpadnAd.platform = @"CN"`;

4. 在 iOS8 之後如果沒有看到 `didImpression`， 可能是因為 window 沒有預設大小的關係，需要手動去setFrame設定大小。串接**橫幅廣告**時會進行`遮蔽偵測`，該偵測可能會導致部分廣告被遮蔽而使廣告無法通過遮蔽偵測，進而無法顯示`didImpression`，請注意！看到 `didImpression`的log才是正確的串接完成。

# 總覽
---
若要在 iOS 應用程式中顯示 Vpon 廣告，只要在您的 Xcode 專案中導入 SDK，然後在使用者介面中加入相關指令就行了。

# 需求條件
---
Vpon 廣告 iOS 版的 SDK 需搭配 iOS 5.x 或更新版本 以及 XCode 4.4 或更新版本。

# 導入 SDK
---

Vpon 提供以下兩種串接廣告 SDK的方式：

* [精簡 (使用 CocoaPods)](#cocoapods)<br>
* [手動 (手動下載並串接)](#manual-sdk)<br>
<br>

## 精簡 (使用 CocoaPods) {#cocoapods}

> * CocoaPods 負責管理 Xcode 專案的程式庫相依性，開發者可以利用此方式快速的串接 SDK。如果機器上未安裝 CocoaPods，請參閱 CocoaPods [安裝指南](https://cocoapods.org/)。
> * 提醒您，使用 CocoaPods 串接 SDK 只對 `iOS 7.0` 以上有效。

1.建立 Podfile

使用終端機至新建立的專案檔相同的目錄中，執行 `pod init` 來進行初始化，在該目錄下產生檔案 `PodFile`。
開啟 PodFile 檔，將設定開發平台版本的敘述取消註解，填入對應的 iOS 版本。

並在 target 中加入欲使用的 SDK 版本，以`有無指定 SDK 版本`來區分：

* 無指定版本，自動下載最新版本`(建議使用)` ：填入 `pod 'VpadnSDK'`
* 有指定版本(以 SDK 4.6.0 為例)：填入`pod 'VpadnSDK', '~>4.6.0'`

![]({{site.imgurl}}/cocoapods_1.png)


2.執行 pod install

修改完 PodFile 後，`請關閉專案檔 (.xcodeproj)`，在終端機 (在與 Podfile 相同的目錄中) 上執行 `pod install`。
安裝完成後，專案資料夾中多了新的專案檔 (.xcworkspace)，專案中應會包含 Pods 專案，並含 Pods/VpadnSDK 目錄。

![]({{site.imgurl}}/cocoapods_2.png)

> 若要更新至最新的 SDK，執行終端機 (在與 Podfile 相同的目錄中) 上的 `pod update`。這個指令會自動擷取最新的 pods，在應用程式中提供參考。

<br>

## 手動 (手動下載並串接) {#manual-sdk}

Vpon 提供以下兩種手動串接廣告的 SDK，擇一即可:<br>

* [Framework SDK (iOS 7.0+)](#framework-sdk)<br>
* [Fundamental SDK (iOS 5.0+)](#fundamental-sdk)

這兩個 SDK 其實提供的功能一樣，差別在於，iOS 版本需求較高的 Framework SDK 的串接較簡單、輕便

### Framework SDK

若您的 app 使用客群是 iOS 7 以上，我們建議您使用 Framework SDK。

Framework SDK 是一包 static library，對您的廣告串接而言：維護容易、步驟少、容量也小。

#### 導入 Framework SDK

首先，對專案按下右鍵，選擇 `Add Files to your_project`
<img src="{{site.imgurl}}/ios_framework_1.png" alt="" class="width-300" />

接著，加入 `VpadnSDKAdKit.framework` 至專案中
![]({{site.imgurl}}/ios_framework_2.png)

記得，至專案設定選項中的 `General` 下方確認一下 `Linked Frameworks and Libraries` 內是否已加入此 framework
![]({{site.imgurl}}/ios_framework_7.png)

至專案設定選項中的 `Build Settings`下的 `Other Linker Flags`輸入`-ObjC`
![]({{site.imgurl}}/ios_framework_6.png)

最後，至專案中透過 “@import VpadnSDKAdKit” 引入 SDK

```objc
@import VpadnSDKAdKit
```
![]({{site.imgurl}}/ios_framework_5.png)

> **Note:** <br>
> 再次提醒您 Framework SDK **只對 iOS 7.0 以上的裝置有用**。
> 若您的 app 還支援 7.0 以下的裝置，請勿使用此 framework，而是使用 [Fundamental SDK](#fundamental-sdk)。



### Fundamental SDK
解壓縮後的 SDK 包含Objective-C 標頭、一個執行期間程式庫 要在應用程式中加入 Vpon 廣告，您必須完成三個步驟：

1. 在專案中加入 `libAdOn.a`， `VpadnBanner.h` 與 `VpadnInterstitial.h`
2. 加入相關所需的 framework
3. 在 `Build Settings` 內 `Other Linker Flags` 請填入 `-all_load` 與 `-ObjC`，並把 `Summary` 下把 `AdSupport` 設為 `Optional`

> **Note**: 上述三項缺一不可，請務必完成！

#### 新增 SDK lib
1. 解壓縮後的 SDK 包含一個 lib 檔、及兩個標頭檔。 對 Xcode 中的專案按一下滑鼠右鍵，然後選取 [Add Files to "Vpadn_BannerInter_x5"...] (在 "Vpadn_BannerInter_x5" 中新增檔案)。
![IOS-add-file_vpadn.png]
2. 接著在 SDK 中選取 `libAdOn.a`, `VpadnBanner.h` 與 `VpadnInterstitial.h`
<img src="{{site.imgurl}}/IOS-add-lib&header_vpadn.png" alt="" class="width-300"/>

### 新增 Framework
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


# 下載
---
[前往下載](../download)


# App Transport Security
---
iOS10 更新了安全條款 App Transport Security (ATS)，請參考[這篇]來修改部份設定

# 其他訣竅
請參閱[橫幅廣告](../banner)、[插頁廣告](../Interstitial)、[原生廣告](../native)、[中介服務](../mediation)中獲取更多簡介。


[IOS-add-file_vpadn.png]: {{site.imgurl}}/IOS-add-file_vpadn.png
[IOS-add-frameworks_vpadn]: {{site.imgurl}}/IOS-add-frameworks_vpadn.png
[這篇]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
