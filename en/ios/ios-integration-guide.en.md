---
layout:         "ios"
title:          "iOS - Integration Guide"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/integration-guide/
lang:            "en"

---
# Vpon SDK Fundamental
---
1. Check your ad network from registering url first:<br>
Taiwan is: <http://tw.pub.vpon.com/><br>
<!-- China is: <http://cn.pub.vpon.com/><br> -->

2. If you register platform in Taiwan, please use:`vpadnAd.platform = @"TW"`;

3. `Occlusion Detection` is executed while integrating **banner ads**. An ad might be occluded partially without showing `didImpression` in log. Notice, Seeing the `didImpression` is the correct way of integration.

# Overview
---
> * Banner ads use a small portion of the screen to entice users to "click through" to a richer, full-screen experience such as a website or app store page. To display banner ads in your iOS app, simply import Vpadn SDK in Xcode project and add a VpadnBanner to your UI.

> * If you would like to show Vpon’s ad by integrating Mediation Platform such as AdMob, DFP, MoPub, and so on, please click here to see the [Sample Codes]. Remember to integrate [Adapter or Custom Events] into your projects.

# Import SDK
---

Vpon provides two ways to integrate our SDK. Choose one of the following two options:

* [Streamlined Simple? , using CocoaPods,](#cocoapods)<br>
* [Manual, using the SDK download.](#manual-sdk)<br>
<br>

## Streamlined, using CocoaPods {#cocoapods}

> * Please follow the CocoaPods’ [install guidance](https://cocoapods.org/) if it is still uninstalled. Publisher can use CocoaPods, which is a dependency manager for Objective-C Cocoa projects, to integrate Vpon SDK simply and automatically.

1.Create the Podfile

Run `pod init` from the terminal, in the same directory as the project file (.xcodeproj). Open the Podfile which just be generated and uncomment the description about the platform version and revise it to the corresponding one.

In the Podfile, publishers also have to add the description in the `target` about what Vpon SDK version they want to integrate. The description depends on `whether the publishers assign the version of SDK` :

* Unassigned , system will download the latest version automatically `(Recommend)` : input `pod 'VpadnSDK'`
* Assigned (Take SDK {{site.i_version}} for example) : input `pod 'VpadnSDK', '~>{{site.i_version}}'`

![]({{site.imgurl}}/cocoapods_1.png)


2.Run pod install

Please close the project (.xcodeproj) and run `pod install` from the terminal in the same directory after revising the Podfile. Once the installation finishes, a new project (.xcworkspace) file will be generated. This project file should include a Pods project with new dependencies for VpadnSDK.

![]({{site.imgurl}}/cocoapods_2.png)

> In the terminal, run `pod repo update` in the directory where the Podfile is located if you want to update to the latest Vpon SDK.

<br>

## Manual, using the SDK download {#manual-sdk}

Vpon provides two SDKs serving the same functions for our publishers. You should choose either of these 2 to integrate manually.<br>

* [Framework SDK](#framework-sdk)<br>
* [Fundamental SDK](#fundamental-sdk)


There is slight difference between these two SDKs, which we will explain in introduction of Framework SDK.

### Framework SDK
---
Framework SDK is a dynamic library, our latest SDK within any necessary references, headers and lib, needs fewer steps, and is lighter than Fundamental SDK.

However, this convenient way is only for apps designed for iOS version higher than 7.0. If you are targeting at users with devices OS version lower than 7.0, you should definitely choose the [fundamental SDK](#fundamental-sdk) instead.

First, right-click your project and choose `Add Files to your_project`
<img src="{{site.imgurl}}/ios_framework_1.png" alt="" class="width-300" />

Second, add `VpadnSDKAdKit.framework` into your project.
![]({{site.imgurl}}/ios_framework_2.png)

Remember to check whether the framework  in `Linked Frameworks and Libraries` under `General` has been added.
![]({{site.imgurl}}/ios_framework_7.png)

Third, find `Other Linker Flags` under `Build Settings` and input `-ObjC`
![]({{site.imgurl}}/ios_framework_6.png)

Finally, import the framework:

```objc
@import VpadnSDKAdKit
```
![]({{site.imgurl}}/ios_framework_5.png)

> **Note:** <br>
> Remind again that Framework SDK only support devices in iOS version higher than 7.0 and do not use this SDK if your app targets at users with devices OS version lower than 7.0.



### Fundamental SDK
---
The decompressed SDK consists of Objective-C, a runtime library and a README. Show Vpadn banner on your Android App, you must complete three steps:

1. Import `libAdOn.a`, `VpadnBanner.h` and `VpadnInterstitial.h`
2. Add all iOS development frameworks
3. Add  `-all_load` and `-ObjC` under `Other Linker Flags` of `Build Settings`. Click the `Build Phases` and set the `AdSupport` framework to `Optional`.

> **Note**: **All three** these steps are necessary!

#### Add SDK lib
The decompressed SDK consists of a lib file and two header files.

1. Right-click on your project in Xcode, choose Add Files to "Vpadn_BannerInter_x5"
![IOS-add-file_vpadn.png]
2. Choose `libAdOn.a`, `VpadnBanner.h` and `VpadnInterstitial.h` in SDK
<img src="{{site.imgurl}}/IOS-add-lib&header_vpadn.png" alt="" class="width-300"/>

#### Add Framework
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



# Download
---
[Go to download page](../download)

# App Transport Security
---
Apple recently revised App Transport Security (ATS), to iOS10. Please refer to [this link] for some modification.

# Other Tips
---
Please refer to [Banner Ad](../banner)、[Interstitial Ad](../Interstitial)、[Native Ad](../native)、[Mediation](../mediation) for more information.



[IOS-add-file_vpadn.png]: {{site.imgurl}}/IOS-add-file_vpadn.png
[IOS-add-frameworks_vpadn]: {{site.imgurl}}/IOS-add-frameworks_vpadn.png
[this link]: {{site.baseurl}}/ios/latest-news/ios9ats/
[Adapter or Custom Events]: {{site.baseurl}}/ios/download/#adapter-download
[Sample Codes]: {{site.baseurl}}/ios/download/#sample-code-download
