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

Vpon 提供以下兩種串接廣告 SDK 的方式：

* [精簡 (使用 CocoaPods)](#cocoapods)
* [手動 (手動下載並串接)](#manual-sdk)

## 精簡 (使用 CocoaPods) {#cocoapods}
---
> **Note**： CocoaPods 負責管理 Xcode 專案的程式庫相依性，開發者可以利用此方式快速的串接 SDK。如果您還未在開發用的裝置上安裝 CocoaPods，請參閱 [CocoaPods 安裝指南](https://cocoapods.org/)。

### 1. 建立 Podfile

1.1 使用終端機，並將路徑移至 Xcode 專案的目錄中，執行 `pod init` 進行初始化。初始化後，會在該目錄下產生檔案 `Podfile`<br>
1.2 開啟 Podfile，將設定開發平台版本的敘述取消註解，填入對應的 iOS 版本<br>
1.3 在 target 中加入欲導入的 SDK 版本，以`有無指定 SDK 版本`來區分：

* 無指定版本，將自動下載最新版本`(建議使用)` ：填入 `pod 'VpadnSDK'`
* 有指定版本 (以 SDK {{site.i_version}} 為例)：填入`pod 'VpadnSDK', '~>{{site.i_version}}'`

![]({{site.imgurl}}/cocoapods_1.png)


### 2. 執行 pod install

修改完 Podfile 後，`請關閉專案 (.xcodeproj)`，將終端機路徑移至與 Podfile 相同的目錄中，執行 `pod install`。
安裝完成後，專案資料夾中多了新的專案檔 (.xcworkspace)，點擊專案檔(.xcworkspace)即可重新開啟專案，專案中應會包含 Pods 專案及 Pods/VpadnSDK 目錄。

![]({{site.imgurl}}/cocoapods_2.png)

> **Note**：若要更新至最新版本的 SDK，請將終端機路徑移至與 Podfile 相同的目錄中，執行 `pod repo update` 擷取最新的 Pods，再執行 `pod install` 重新安裝 SDK。

## 手動 (手動下載並串接) {#manual-sdk}
---
Vpon 提供以下兩種可以手動串接的廣告 SDK，請擇一使用即可：

* [Framework SDK](#framework-sdk)
* [Fundamental SDK](#fundamental-sdk)

Framewrok 及 Fundamental SDK 提供一樣的功能，主要的差別在於對 iOS 版本需求較高的 Framework SDK 串接較簡單、輕便。

在開始進行手動串接前，請先[由此下載最新版本的 Vpon SDK](../download)。

### Framework SDK

我們建議您使用 Framework SDK，因為 Framework SDK 是一包 static library，它會動態抓取 framework reference, headers，還有 Fundamental SDK 內的程式碼，對您的廣告串接而言：維護容易、步驟少、容量也小。

#### 導入 Framework SDK

首先，對專案按下右鍵，選擇 `Add Files to your_project`
<img src="{{site.imgurl}}/ios_framework_1.png" alt="" class="width-300" />

接著，將 `VpadnSDKAdKit.framework` 加至專案中
![]({{site.imgurl}}/ios_framework_2.png)

請至專案設定選項中的 `General` 標籤下確認 `Linked Frameworks and Libraries` 內是否已加入此 framework
![]({{site.imgurl}}/ios_framework_7.png)

再切換到專案設定選項中的 `Build Settings` 標籤，在 `Other Linker Flags`輸入`-ObjC`
![]({{site.imgurl}}/ios_framework_6.png)

最後，在專案程式碼中加入 “@import VpadnSDKAdKit” 導入 SDK

```objc
@import VpadnSDKAdKit
```
![]({{site.imgurl}}/ios_framework_5.png)


### Fundamental SDK
解壓縮後的 Fundamental SDK 包含 Objective-C 標頭、一個執行期間程式庫。要在應用程式中加入 Vpon 廣告，您必須完成三個步驟：

1. 在專案中加入 `ios-vpadn-sdk.a`， `VpadnBanner.h` 與 `VpadnInterstitial.h`
2. 加入相關所需的 framework
3. 修改 Build Settings 中的設定

> **Note**：上述三項缺一不可，請務必完成！

#### 1. 新增 SDK lib
1.1 解壓縮後的 SDK 包含一個 .a 檔、及兩個標頭檔。對 Xcode 中的專案按一下滑鼠右鍵，然後選取 [Add Files to your_project...] (在 "your_project" 中新增檔案)。
![IOS-add-file_vpadn.png]
1.2 接著在 SDK 中選取 `libAdOn.a`, `VpadnBanner.h` 與 `VpadnInterstitial.h`
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

在 `Build Settings` 內 `Other Linker Flags` 填入 `-all_load` 與 `-ObjC`，並把 `Summary` 下的 `AdSupport` 設為 `Optional`

# App Transport Security
---
iOS9 更新了安全條款 App Transport Security (ATS)，請參考 [iOS9 ATS] 來修改部份設定

# Tips
---
關於更多廣告形式的呈現，請參考：

* [橫幅廣告][1]
* [插頁廣告][2]
* [原生廣告][3]
* [Out-stream 影音廣告][5]
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
[5]:{{ site.baseurl }}/zh-tw/ios/outstream/

<!--
3. 串接**橫幅廣告**時會進行`遮蔽偵測`，若部分廣告被遮蔽而使廣告無法通過遮蔽偵測，會無法顯示`didImpression`，請注意！看到 `didImpression`的log才是正確的串接完成。
-->