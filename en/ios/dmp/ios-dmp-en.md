---
layout:         "ios"
title:          "iOS - DMP SDK"
lead:           ""
description:    "dmp"
keywords:       ""
permalink:       ios/dmp/
lang:            "en"
---

# Prerequisites
---

### System requirement
Deployment target 10.0 above.

### Import SDK
You can [download Vpon DMP SDK here][1]. A Objective-c Header file and a lib file will included. Please follow the steps below to integrate Vpon DMP SDK to your Xcode project.

1. Add the lib (.a file) to your project:
2. Add the Header file below to your project:
* `VpadnAnalytics.h`
* `VATracker.h`
* `VpadnDictionaryBuilder.h`
2. Add below framework to your project:
* `AdSupport.framework`
* `CoreLocation.framework`
* `SystemConfiguration.framework`
* `CoreTelephony.framework`
* `WebKit.framework`

# Start To Implement Vpon DMP SDK
---
Please follow the steps below to integrate Vpon DMP SDK in your application.

### Import Vpon DMP SDK

Please import VpadnAnalytics.h in every page that will integrate with Vpon Analytics.

```objc
#import "VpadnAnalytics.h";
```

### Declare VpadnAnalytics and Indicate A License Key

Please follow the sample code below to indicate a License Key when you call VpadnAnalytics sharedInstance for the first time.

```objc
[[VpadnAnalytics sharedInstance] setLicenseKey:@"License Key"];
```

> **Note:** Please replace the License Key with your own one.

### Send Message
Vpon DMP SDK provide below method to send messages as below:


#### send()
send() can be used to send message in most of events. You can send message with or without payload.

* send message without payload：

```objc
[[VpadnAnalytics sharedInstance].defaultTracker send:[VpadnDictionaryBuilder createEventWithEventName:@"custom" customID:customID extraData:nil] build]];
```

* send message with payload：

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
Please refer to our [Sample Code](https://github.com/vpon-sdk/Vpon-iOS-Analytics) for a complete integration sample.

# Download
---

|DMP 1.3.0|
|:-------:|
|[Download][1]|

# Change Log
---
For DMP SDK change Log, please refer to [DMP SDK Change Log]({{ site.baseurl }}/ios/dmp/changelog)

[1]: {{site.dnldurl}}/vpadn-dmp-iOS-1.3.0-c7710ef.tar.gz