---
layout:         "ios"
title:          "iOS - ATS"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/ios/ats/
lang:            "zh-cn"

---
# ATS SDK 整合
---

请用以下方式整合 ATS SDK，在每次应用程式载入时，将转换资讯传给 Vpon

# 下载
---
请在整合 SDK 前先准备好 SDK，您可点选下载 SDK 包，下载後解压缩档案并开始整合步骤

* [下载SDK (适用64bit)][1]
* [下载 Sample Code (不含SDK)][2]

# 需求:
---
iOS 3.0 以上的版本

# 整合步骤
---
## 1. 汇入 libraries
请将 `libVponAts.a` 及 `VponAts.h` 复制进你的专案中，同时在你的应用程式中 include `VponAts.h`

## 2. 授权
在 Vpon ATS SDK中，需要存取「网路」丶「位置」丶「手机状态」，因此请确认新增以下 9 项 Framework


 Foundation.framework

 UIKit.framework

 SystemConfiguration.framework

 Security.framework

 CoreTelephony.framework

 CoreLocation.framework

 CoreGraphics.framework

 libVponAts.a

 AdSupport.framework

 > **Note:** 请将 `AdSupport.framework` 设为 `Optional`)


## 3. 串接 ATS SDK
在 AppDelegate 中加入必要的头文件( #import "VponAts.h" ) 及 Delegate (VponAtsDelegate)

```Objective-C
#import <UIKit/UIKit.h>
#import "VponAts.h"
@interface AppDelegate : UIResponder <UIApplicationDelegate,VponAtsDelegate>{
```

## 4. 实作 tracking code
对应窗口的 `.m` 文件中实现 ATS SDK 的接口, 设定 Inside code

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
