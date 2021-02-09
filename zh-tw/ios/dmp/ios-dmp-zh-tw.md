---
layout: "ios"
title: "iOS - VDA SDK"
lead: ""
description: ""
keywords: "dmp"
permalink: /zh-tw/ios/dmp/
lang: "zh-tw"
---

# 串接準備
---

## 系統版本需求
Deployment target 10.0 以上

## 匯入 VDA SDK 
請先[下載 VDA SDK][1]，將 .framework 檔放入您的 Project 中。

# 開始串接 VDA SDK
---

## Import VDA SDK

請在每個要加入 Vpon Analytics 的頁面中 import VpadnAnalytics.h

```objc
#import "VpadnAnalytics.h";
```

## VDA SDK Initialization

請參考以下指示初始化 VDA SDK

### Objective-c

```objc
#import <VponDataAnalytics/VponDataAnalytics.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    VDAConfiguration *config = [VDAConfiguration sharedInstance];
    [config setLicenseKey:@"testKey" withCustomID:@"customID" withOptIn:VDAOptInDefault];
    [config setDebugMode:NO];
    [config initialize];
}
```

### Swift

```swift
import VponDataAnalytics

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:      
    [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        let config = VDAConfiguration.sharedInstance
        config.setLicenseKey("testkey", withCustomID: "customID", withOptIn: .default)
        config.setDebugMode(false)
        config.initialize()
}
```


# 回傳資料
VDA SDK 提供以下回傳資料的方法：


## send()
當您需要向 Vpon 發送事件時，使用 send()，並可以透過 extraData 來傳送 payload 給 Vpon：


### Objective-c

```objc
VDATracker *tracker = [[VDATracker alloc] init];
VDABuilder *builder = [VDABuilder createEventWithEventName:@"login" extraData:@{@"key": @"value"}];
[tracker send:builder];
```


### Swift

```swift
let tracker = VDATracker()
let builder = VDABuilder.createEventWithEventName("login", extraData: ["key": "value"])
tracker.send(builder)
```

# Debug Mode
---
您可以在初始化 VDA SDK 時，透過設定 setDebugMode 來啟用或停用 Debug Log，請見以下範例：


```objc
#import <VponDataAnalytics/VponDataAnalytics.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    VDAConfiguration *config = [VDAConfiguration sharedInstance];
    ...
    [config setDebugMode:NO];
    ...
}
```

### Swift

```swift
import VponDataAnalytics

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:      
    [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        ...
        config.setDebugMode(false)
        ...
}
```

# Sample Code
---
如果您想看到完整的串接實例，請參考我們的 [Sample Code](https://github.com/vpon-sdk/Vpon-iOS-Analytics)

# Download
---

|VDA 2.0.0|
|:-------:|
|[Download][1]|

# Change Log
---
關於 VDA SDK 的更新記錄，請參考 [VDA SDK Change Log]({{ site.baseurl }}/zh-tw/ios/dmp/changelog)


[1]: {{site.dnldurl}}/i-vda-20201225-9fd4af0-v2.0.0.tar.gz