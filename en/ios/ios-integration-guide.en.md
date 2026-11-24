---
layout:         "ios"
title:          "iOS - Integration Guide"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/integration-guide/
lang:            "en"

---
# Prerequisites
---
Before you start to integrate Vpon SDK, please make sure you already have your own Vpon Publisher Account and get your License Key. [Register as a Vpon Publisher] if you haven't own your Publisher Account.

Once you have your own Publisher Account, follow the instruction below to integrate Vpon iOS SDK to your Xcode project.

# Import SDK
---
Vpon iOS SDK is distributed via **Swift Package Manager (SPM)**.

### 1. Add Package Dependency in Xcode

1. In Xcode, select **File > Add Package Dependencies…**
2. Enter the repository URL:
   ```
   https://github.com/vpon-sdk/VpadnSDK-iOS-SPM
   ```
3. Select the Dependency Rule:
   * **iOS 16.0 or later (Recommended)**: Select **Up to Next Major Version** and enter `{{site.i_version}}`.
   * **iOS 12.0 – 15.x**: Select **Exact Version** and enter `5.8.0`.
4. Add **`VpadnSDKAdKit`** to your App target.

Or add it directly in your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/vpon-sdk/VpadnSDK-iOS-SPM.git", from: "{{site.i_version}}"),
]
```

### 2. Add `-ObjC` Linker Flag

When integrating via Swift Package Manager, you must manually add `-ObjC` to your App target's linker flags to prevent runtime crashes:

1. Select your **App Target** in Xcode.
2. Open **Build Settings** and search for **Other Linker Flags**.
3. Add `-ObjC`.

> **Note (CocoaPods)**: `5.8.0` is the final version of `VpadnSDK` published on CocoaPods. Starting from `5.8.2`, Vpon iOS SDK is distributed exclusively via Swift Package Manager. Existing CocoaPods projects using `pod 'VpadnSDK'` will remain on `5.8.0`; to upgrade to `5.8.2` or later, please remove `pod 'VpadnSDK'` from your `Podfile`, run `pod install`, and switch to Swift Package Manager.


<!-- ## Integrate SDK Manually {#manual-sdk}

Please [download latest Vpon SDK here](../download) before you start your integration.

### Import Framework SDK

First, right click on your project and choose `Add Files to your_project`
<img src="{{site.imgurl}}/ios_framework_8.png" alt="" class="width-300" />

Second, add `VpadnSDKAdKit.xframework` into your project.
![]({{site.imgurl}}/ios_framework_9.png)

Remember to check whether the framework  in `Linked Frameworks and Libraries` under `General` has been added.
![]({{site.imgurl}}/ios_framework_10.png)

Third, find `Other Linker Flags` under `Build Settings` and input `-ObjC`
![]({{site.imgurl}}/ios_framework_6.png)

Finally, import the framework:

```objc
@import VpadnSDKAdKit
```
![]({{site.imgurl}}/ios_framework_5.png)

> **Note**: Remind again that the Framework SDK only support devices in iOS version higher than `7.0`. Do not use this SDK if your app targets at users with devices OS version lower than `7.0`. -->


<!-- ### Fundamental SDK
---

** Note**: Vpon will stop support Fundamental SDK from SDK v5.3.1, if you are integrating with the Fundamental SDK, we recommend that you can replace it with Framework SDK.

The decompressed SDK consists of Objective-C, a runtime library and a README. Show Vpadn banner on your Android App, you must complete three steps:

1. Import `libAdOn.a` and Headers
2. Add all iOS development frameworks
3. Modify Build Settings

> **Notee**: **All three** these steps are necessary!

#### 1. Add SDK lib
The decompressed SDK consists of a lib file and couples of header files.

1. Right click on your project in Xcode, choose Add Files to "your_project"
![IOS-add-file_vpadn.png]
2. Choose `libAdOn.a`, `VpadnBanner.h`, `VpadnInterstitial.h` and following files in SDK
<img src="{{site.imgurl}}/IOS-add-lib&header_vpadn.png" alt="" class="width-300"/>

#### 2. Add Framework
The SDK library references the a few iOS development frameworks.<br>

1.Add all the following frameworks.<br>
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
`UIKit`<br>

To add these frameworks, double-click the project name. Open the Link Binary With Libraries dropdown under the Build phases tab. Add the frameworks from the iOS SDK using the `+` button that becomes visible.
![IOS-add-frameworks_vpadn]

#### 3. Modify Build Settings

Add  `-all_load` and `-ObjC` under `Other Linker Flags` of `Build Settings`. Click the `Build Phases` and set the `AdSupport` framework to `Optional`. -->


# SDK Initialization {#initial-sdk}
---

Please follow the tips below to initialize Vpon SDK.

### Objective-C

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Vpon SDK initialization
    VponAdConfiguration *config = VponAdConfiguration.shared;
    config.logLevel = VponLogLevelDefault;
    [config initializeSdk];

    return YES;
}
```

### Swift

Please add below code snipet in your AppDelegate.swift if you are using Swift:


```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:
    [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    // Vpon SDK initialization
    let config = VponAdConfiguration.shared
    config.logLevel = .default
    config.initializeSdk()

    return true
}
```


>**Note:**
>
>* To comply with 3rd-party tracking vendors' requirement, Vpon SDK will set the Audio Session Category of the App as `AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers` (The audio play in the app will be mixable, and the audio playing won't be impacted by the Ring/Silent swtich on iPhone). You can reassign and activate the Audio Session Category after SDK initilization. To ask not to change the audio session category, please refer to [Advanced Setting] for further instruction.


# Usage Description
---

Vpon SDK have the ability to deliver diverse ad experience. To display specific types of ads, below permission might be required:
    
```xml
<key>NSCalendarsUsageDescription</key>
<key>NSCameraUsageDescription</key>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<key>NSLocationUsageDescription</key>
<key>NSLocationWhenInUseUsageDescription</key>
<key>NSPhotoLibraryUsageDescription</key>
```

>**Note:** You might need to describe the usage of above permission when you submit your App to App Store after you finish Vpon SDK integration. For example, you might need to add the usage description of Calendar with: We might need to add some events to Calendar.

<!-- 
# App Transport Security
---
Apple recently revised App Transport Security (ATS), to iOS9. Please refer to [iOS9 ATS] for your reference. -->

# Tips
---
For more ad types, please refer to:

* [Banner Ad][1]
* [Interstitial Ad][2]
* [Native Ad][3]
* [Mediation][4]



[IOS-add-file_vpadn.png]: {{site.imgurl}}/IOS-add-file_vpadn.png
[IOS-add-frameworks_vpadn]: {{site.imgurl}}/IOS-add-frameworks_vpadn.png
[iOS9 ATS]: {{site.baseurl}}/ios/latest-news/ios9ats/
[Adapter or Custom Events]: {{site.baseurl}}/ios/download/#adapter-download
[Sample Codes]: {{site.baseurl}}/ios/download/#sample-code-download

[Register as a Vpon Publisher]: {{ site.baseurl }}/ios/registration/
[1]:{{ site.baseurl }}/ios/banner/
[2]:{{ site.baseurl }}/ios/interstitial/
[3]:{{ site.baseurl }}/ios/native/
[4]:{{ site.baseurl }}/ios/mediation/
[Advanced Setting]:{{ site.baseurl }}/ios/advanced/#audio