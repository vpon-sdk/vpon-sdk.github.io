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
解壓縮後的 SDK 包含Objective-C 標頭、一個執行期間程式庫 要在應用程式中加入 Vpon 廣告，您必須完成三個步驟：

1. 在專案中加入 `libAdOn.a`， `VpadnBanner.h` 與 `VpadnInterstitial.h`
2. 加入相關所需的 frameworks
3. 在 `Build Settings` 內 `Other Linker Flags` 請填入 `-all_load` 與 `-Obj-C`，並把 `Summary` 下把 `AdSupport` 設為 `Optional`
> **Note**: 上述三項缺一不可，請務必完成！

## 新增 SDK lib
1. 解壓縮後的 SDK 包含一個 lib 檔、及兩個標頭檔。 對 Xcode 中的專案按一下滑鼠右鍵，然後選取 [Add Files to "Vpadn_BannerInter_x5"...] (在 "Vpadn_BannerInter_x5" 中新增檔案)。
![IOS-add-file_vpadn.png]
2. 接著在 SDK 中選取 `libAdOn.a`, `VpadnBanner.h` 與 `VpadnInterstitial.h`
![IOS-add-lib&header_vpadn]
3. SDK lib 會參照 iOS 的 frameworks： <br  >
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

若要加入這些 Framework，請對 Vpadn_BannerInter_x5 這個專案名稱按兩下滑鼠，開啟 `Build Phases` 分頁下的 `Link Binary With Libraries` 下拉式選單，然後用畫面上出現的 `+` 按鈕加入 iOS SDK 中的架構。
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
