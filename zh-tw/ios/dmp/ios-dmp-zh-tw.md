---
layout: ios
title: iOS - DMP
lead: ''
description: ''
keywords: dmp
permalink: /zh-tw/ios/dmp/
lang: zh-tw
---

# 需求
--------------------------------------------------------------------------------

Deployment target 7.0 以上

# 導入 SDK:
--------------------------------------------------------------------------------

解壓縮後的 SDK 包含Objective-C 標頭、一個執行期間程式庫 要在應用程式中加入 Vpon Analytics，您必須完成二個步驟：
1. 在專案中加入lib檔 ，`VpadnAnalytics.h`, `VATracker.h` 與 `VpadnDictionaryBuilder.h` 三個標頭檔
2. 加入 `AdSupport.framework`

# 插入程式碼

--------------------------------------------------------------------------------

## VpadnAnalytics.h
在每個要插入 Vpon Analytics 的頁面都需要 import VpadnAnalytics.h

## 填入 License Key
在第一次呼叫 [VpadnAnalytics sharedInstance] 時需要先填入跟我們申請的 License Key, 而填入的方式如下

```Objective-C
[[VpadnAnalytics sharedInstance] setLicenseKey:@ "License Key"];
```
> **Note:** License Key 請替換成跟我們申請的 License Key

## launch Event
launch Event 的傳送會建議在一開始 AppDelegate 中的 didFinishLaunchingWithOptions 這個 callback 內去送, 程式碼如下:

```Objective-C
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions{
    [[VpadnAnalytics sharedInstance] setLicenseKey:@""];
    [[VpadnAnalytics sharedInstance].defaultTracker sendLaunchEvent:@"customID"];
    return YES;
}
```

## sendLaunchEvent
請在 applicationDidBecomeActive 內插入 sendLaunchEvent, 程式碼如下:

```Objective-C
- (void)applicationDidBecomeActive:(UIApplication *)application {
    [[VpadnAnalytics sharedInstance].defaultTracker sendLaunchEvent:@"customID"];
}
```

## Other event
其他event的呼叫方式分為下列幾種，單純的event無任何payload則使用下列方式呼叫

```Objective-C
[[VpadnAnalytics sharedInstance].defaultTracker send:[[VpadnDictionaryBuilder createEventWithEventType: Event_Custom customID:nil extraData:nil]build]];
```

帶有payload則使用下列方式呼叫

```Objective-C
NSMutableDictionary* dicExtraData = [[NSMutableDictionary alloc]initWithCapacity:1];
    [dicExtraData setObject:@"just for test" forKey:@"testInfo"];
    NSDictionary* dicJSONData = [[NSDictionary alloc]initWithObjectsAndKeys:@"VponInc", @"facebook", @"testValue", @"custom",nil];
    [dicExtraData setObject:dicJSONData forKey:@"member_id"];
    [[VpadnAnalytics sharedInstance].defaultTracker send:[[VpadnDictionaryBuilder createEventWithEventType:Event_Login customID:@"testKey" extraData:dicExtraData]build]];
    dicJSONData = nil;
    dicExtraData = nil;
```
此方式適用於常用的事件傳送

如有特殊的event則使用下列方式呼叫

```Objective-C
[[VpadnAnalytics sharedInstance].defaultTracker send:[[VpadnDictionaryBuilder createEventWithEventName:@"testEvent" customID:nil extraData:nil]build]];
```
此方式適用於所有事件的傳送

> **Note:**

> 1. 請注意函數 createEventWithName 後方參數請參考 VpadnDictionaryBuilder 內的 EventType
> 2. 如果需要在 console log內印出debug log, 請在環境變數的地方新增一個環境變數, key為 SHOW_VPON_LOG 值為1
<!-- > 3. payload 文件請 [參考此連結](#) -->



# Download
---
|DMP 1.1.0|
:----:
|[Download](http://m.vpadn.com/sdk/vpadn-dmp-iOS-1.1.0-a41ba9f.tar.gz)|
