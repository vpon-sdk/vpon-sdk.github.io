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
Taiwan is: http://tw.pub.vpon.com/<br>
China is: http://cn.pub.vpon.com/<br>

2. If you register platform in Taiwan, please use:`vpadnAd.platform = @"TW"`;

3. If you register platform in China, please use:`vpadnAd.platform = @"CN"`;

4.  If you cannot see `didImpression` from log after updating to iOS8, it is probably because there is no window's width*hight by default. So you have to manually adjust it by calling setFrame. Notice, Seeing the `didImpression` is the correct way of integration.

# Overview
---
Banner ads use a small portion of the screen to entice users to "click through" to a richer, full-screen experience such as a website or app store page.To display banner ads in your iOS app, simply import Vpadn SDK in Xcode project and add a VpadnBanner to your UI.

# Requirement
---
* iOS version 5.x or later
* Xcode 4.4 or later

# Import SDK
---
The decompressed SDK consists of Objective-C, a runtime library and a README. Show Vpadn banner on your Android App, you must complete three steps:

1. Import `libAdOn.a`， `VpadnBanner.h` and `VpadnInterstitial.h`
2. Add all iOS development frameworks
3. Add  `-all_load` 與 `-Obj-C` under `Other Linker Flags` of `Build Settings`. Click the `Build Phases` and set the `AdSupport` framework to `Optional`.
> **Note**: **All three** these steps are necessary!

## Add SDK lib
The decompressed SDK consists of a lib file and two header files.

1. Right-click on your project in Xcode, choose Add Files to "Vpadn_BannerInter_x5"
![IOS-add-file_vpadn.png]
2. Choose `libAdOn.a`, `VpadnBanner.h` and `VpadnInterstitial.h` in SDK
![IOS-add-lib&header_vpadn]
3. The SDK library references the following iOS development frameworks which may not be part of your project: (You do not have to include AddressBook and AddressBookUI if you use the version of SDK 4.2.8
) <br  >
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
`UIKit`

To add these frameworks, double-click the project name. Open the Link Binary With Libraries dropdown under the Build phases tab. Add the frameworks from the iOS SDK using the `+` button that becomes visible.
![IOS-add-frameworks_vpadn]


# Download
---
[Go to download page]({{site.baseurl}}/android/download)

# App Transport Security
---
Apple recently brought a new security feature, App Transport Security (ATS), to iOS9. If you are using the latest Xcode 7 to build or migrate to an iOS9 project, please refer to [this link] for some modification.

# Other Tips
---
Please refer to [Banner Ad](../banner)、[Interstitial Ad](../Interstitial)、[Mediation](../mediation) for more information.



[IOS-add-lib&header_vpadn]: {{site.imgurl}}/IOS-add-lib&header_vpadn.png
[IOS-add-file_vpadn.png]: {{site.imgurl}}/IOS-add-file_vpadn.png
[IOS-add-frameworks_vpadn]: {{site.imgurl}}/IOS-add-frameworks_vpadn.png
[this link]: {{site.baseurl}}/ios/latest-news/ios9ats/
