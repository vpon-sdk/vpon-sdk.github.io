---
layout: "ios"
title: "iOS - DMP SDK"
lead: ""
description: ""
keywords: "dmp"
permalink: /zh-tw/ios/dmp/
lang: "zh-tw"
---

# 串接準備
---

### 系統版本需求
Deployment target 9.0 以上

### 匯入 Vpon DMP SDK 
請先[下載 Vpon DMP SDK]({{site.dnldurl}}/vpadn-dmp-iOS-1.2.2-a6a9c68.tar.gz)，解壓縮後的 SDK 包含Objective-C 標頭、一個執行期間程式庫，要在應用程式中匯入 Vpon DMP SDK，您必須完成二個步驟：

1. 在專案中加入 lib 檔 (.a)
2. 在專案中加入以下 Header：
* `VpadnAnalytics.h`
* `VATracker.h`
* `VpadnDictionaryBuilder.h`
3. 在專案中手動加入以下 framework：
* `AdSupport.framework`
* `CoreLocation.framework`
* `SystemConfiguration.framework`
* `CoreTelephony.framework`

# 開始串接 Vpon DMP SDK
---

### Import Vpon DMP SDK

請在每個要加入 Vpon Analytics 的頁面中 import VpadnAnalytics.h

```objc
#import "VpadnAnalytics.h";
```

### 宣告 VpadnAnalytics 物件，並指定 License Key

在第一次呼叫 VpadnAnalytics sharedInstance 時需要先填入 License Key，請參考以下範例：

```objc
[[VpadnAnalytics sharedInstance] setLicenseKey:@"License Key"];
```
> **Note**：請將 License Key 替換成您專屬的 License Key


### 回傳資料
Vpon DMP SDK 提供兩種回傳資料的方法：

#### sendLaunchEvent()
在使用者開啟 App 時，回報開啟的事件。建議將此方法建立在 AppDelegate 中的 didFinishLaunchingWithOptions，請參考以下範例：

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions{
    [[VpadnAnalytics sharedInstance] setLicenseKey:@""];
    [[VpadnAnalytics sharedInstance].defaultTracker sendLaunchEvent:@"customID"];
    return YES;
}
```

#### send()
根據使用者行為觸發回傳資料的事件，適用於常用的事件傳送。請參考以下範例，分為有 payload 和無 payload 的呼叫方式：

* 無 payload：

```objc
[[VpadnAnalytics sharedInstance].defaultTracker send:[[VpadnDictionaryBuilder createEventWithEventType: Event_Custom customID:nil extraData:nil]build]];
```

* 有 payload：

```objc
NSMutableDictionary* dicExtraData = [[NSMutableDictionary alloc]initWithCapacity:1];
    [dicExtraData setObject:@"just for test" forKey:@"testInfo"];
    NSDictionary* dicJSONData = [[NSDictionary alloc]initWithObjectsAndKeys:@"VponInc", @"facebook", @"testValue", @"custom",nil];
    [dicExtraData setObject:dicJSONData forKey:@"member_id"];
    [[VpadnAnalytics sharedInstance].defaultTracker send:[[VpadnDictionaryBuilder createEventWithEventType:Event_Login customID:@"testKey" extraData:dicExtraData]build]];
    dicJSONData = nil;
    dicExtraData = nil;
```

* 如有特殊的 event 則可以使用下列方式呼叫，此方式適用於所有事件的傳送：

```objc
[[VpadnAnalytics sharedInstance].defaultTracker send:[[VpadnDictionaryBuilder createEventWithEventName:@"testEvent" customID:nil extraData:nil]build]];
```

> **Note：**
>
> 1. 請參考 VpadnDictionaryBuilder 內的 EventType 來實作 createEventWithName 中的參數
> 2. 如果需要在 console log 內印出 debug log，請在環境變數的地方新增一個環境變數，key 為 SHOW_VPON_LOG 值為 "1"


# Sample Code
---
如果您想看到完整的串接實例，請參考我們的 [Sample Code](https://github.com/vpon-sdk/Vpon-iOS-Analytics)

# Download
---

|DMP 1.2.2|
|:-------:|
|[Download]({{site.dnldurl}}/vpadn-dmp-iOS-1.2.2-a6a9c68.tar.gz)|

# Change Log
---
關於 DMP SDK 的更新記錄，請參考 [DMP SDK Change Log]({{ site.baseurl }}/zh-tw/ios/dmp/changelog)

