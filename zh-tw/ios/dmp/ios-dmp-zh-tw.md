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
Deployment target 10.0 以上

### 匯入 Vpon DMP SDK 
請先[下載 Vpon DMP SDK][1]，解壓縮後的 SDK 包含Objective-C 標頭、一個執行期間程式庫，要在應用程式中匯入 Vpon DMP SDK，您必須完成二個步驟：

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
* `WebKit.framework`

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
Vpon DMP SDK 提供以下回傳資料的方法：


#### send()
根據使用者行為觸發回傳資料的事件，適用於常用的事件傳送。請參考以下範例，分為有 payload 和無 payload 的呼叫方式：

* 無 payload：

```objc
[[VpadnAnalytics sharedInstance].defaultTracker send:[VpadnDictionaryBuilder createEventWithEventName:@"custom" customID:customID extraData:nil] build]];
```

* 有 payload：

```objc
NSMutableDictionary* dicExtraData = [[NSMutableDictionary alloc]initWithCapacity:1];
[dicExtraData setObject:@"just for test" forKey:@"testInfo"];

NSDictionary* dicJSONData = [[NSDictionary alloc]initWithObjectsAndKeys:@"VponInc", @"facebook", @"testValue", @"custom",nil];
 [dicExtraData setObject:dicJSONData forKey:@"member_id"];

[[VpadnAnalytics sharedInstance].defaultTracker send:[[VpadnDictionaryBuilder createEventWithEventName:@"login" customID:customID extraData:dicExtraData] build]];

dicJSONData = nil;
dicExtraData = nil;
```


# Sample Code
---
如果您想看到完整的串接實例，請參考我們的 [Sample Code](https://github.com/vpon-sdk/Vpon-iOS-Analytics)

# Download
---

|DMP 1.3.0|
|:-------:|
|[Download][1]|

# Change Log
---
關於 DMP SDK 的更新記錄，請參考 [DMP SDK Change Log]({{ site.baseurl }}/zh-tw/ios/dmp/changelog)


[1]: {{site.dnldurl}}/vpadn-dmp-iOS-1.3.0-3f6d42d.tar.gz