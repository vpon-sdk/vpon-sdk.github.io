---
layout:         "ios"
title:          "iOS - ATS"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/ios/ats/
lang:            "zh-tw"

---
# ATS SDK 整合
---
請用以下方式整合 ATS SDK，在每次應用程式載入時，將轉換資訊傳給 Vpon

# 下載
---
請在整合 SDK 前先準備好 SDK，您可點選下載 SDK 包，下載後解壓縮檔案並開始整合步驟

* [下載SDK (適用64bit)][1]
* [下載 Sample Code (不含SDK)][2]

# 需求:
---
iOS 3.0 以上的版本

# 整合步驟
---
## 1. 匯入 libraries
請將 `libVponAts.a` 及 `VponAts.h` 複製進你的專案中，同時在你的應用程式中 include `VponAts.h`

## 2. 授權
在 Vpon ATS SDK中，需要存取「網路」、「位置」、「手機狀態」，因此請確認新增以下 9 項 Framework


 Foundation.framework

 UIKit.framework

 SystemConfiguration.framework

 Security.framework

 CoreTelephony.framework

 CoreLocation.framework

 CoreGraphics.framework

 libVponAts.a

 AdSupport.framework

 > **Note:** 請將 `AdSupport.framework` 設為 `Optional`)


## 3. 串接 ATS SDK
在 AppDelegate 中加入必要的頭文件( #import "VponAts.h" ) 及 Delegate (VponAtsDelegate)

```Objective-C
#import <UIKit/UIKit.h>
#import "VponAts.h"
@interface AppDelegate : UIResponder <UIApplicationDelegate,VponAtsDelegate>{
```

## 4. 實作 tracking code
對應窗口的 `.m` 文件中實現 ATS SDK 的接口, 設定 Inside code

```Objective-C
goalID = [[NSString alloc] initWithString:@" Change here to your Goal ID "];
ats = [[VponAts alloc] initWithGoalId:goalID andDelegate:self setLocationOnOff:YES];
```

## 5. 送出 tracker

```Objective-C
  - (void)applicationDidBecomeActive:(UIApplication *)application
  {
      // Restart any tasks that were paused (or not yet started) while the application
     // was inactive. If the application was previously in the background,
     // optionally refresh the user interface.
  #pragma mark send tracker when active
      [ats tracker];
  }
```

[1]: http://m.vpon.com/sdk/iOS_ATS/AtsLib_64bit.zip
[2]: http://m.vpon.com/sdk/iOS_ATS/VponATS.zip
