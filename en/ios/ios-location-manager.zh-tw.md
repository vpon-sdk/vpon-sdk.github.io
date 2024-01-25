---
layout:         "ios"
title:          "iOS - Banner Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/location-manager/
lang:            "en"
---
# Overview
---
Use Location Manager to enable / disable if Vpon SDK can access Geo Location information after user agree to grant their Location Permission. Please add the locationManager config while initialize SDK:

## Objective-C

```objc
VponAdConfiguration *config = VponAdConfiguration.shared;
config.logLevel = VponLogLevelDefault;
config.locationManager.isEnable = NO;
[config initializeSdk];
```

## Swift

```swift
let config = VponAdConfiguration.shared
config.logLevel = .default
config.locationManager.isEnable = false
config.initializeSdk()
```