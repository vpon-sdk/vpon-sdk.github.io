---
layout:         "ios"
title:          "iOS - VDA SDK"
lead:           ""
description:    "dmp"
keywords:       ""
permalink:       ios/dmp/
lang:            "en"
---

# Prerequisites
---

## System requirement
Deployment target 10.0 above.

## Import SDK
[Download VDA SDK here][1] and add the .framework file into your Project.

# Start To Implement VDA SDK
---
Please follow the steps below to integrate VDA SDK in your application.

## Import VDA SDK

Please import VpadnAnalytics.h in every page that will integrate with Vpon Analytics.

```objc
#import "VpadnAnalytics.h";
```

## VDA SDK Initialization

Please follow the tips below to initialize VDA SDK in the AppDelegae.h

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


# Send Message
---
VDA SDK provide below method to send messages:


## send()
Call send() and add payload with extraData if necessary when you trying to send data to Vpon.


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
Config debug mode with setDebugMode when initilizing VDA SDK to enable or disable debug log when you implement the SDK.


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
Please refer to our [Sample Code](https://github.com/vpon-sdk/Vpon-iOS-Analytics) for a complete integration sample.

# Download
---

|VDA 2.0.0|
|:-------:|
|[Download][1]|

# Change Log
---
For VDA SDK change Log, please refer to [VDA SDK Change Log]({{ site.baseurl }}/ios/dmp/changelog)

[1]: {{site.dnldurl}}/i-vda-20201225-9fd4af0-v2.0.0.tar.gz