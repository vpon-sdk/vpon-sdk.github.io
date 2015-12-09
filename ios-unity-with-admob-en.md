---
layout:         "ios"
title:          "Integration with Unity"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /ios/mediation/admob/unity/
lang:           "en"
---

# Overview
---
Unity app integrating Vpon ads is easy with AdMob. All you need to do are:

1. Import Google AdMob pulgin.
2. Import `VpadnBanner.h` and `VpadnInterstitial.h`
3. Write integration codes.
4. Export build setting to iOS platform.
5. Open Unity Xcode project and import SDKs.
<br>

> **Note:**
> Part of the content below is from Google's GitHub [googleads-mobile-unity](https://github.com/googleads/googleads-mobile-unity/tree/master/unity#run-the-project). Also we add the the information of integration with Vpon AdNetwork.

# Requirement
---
To integrate with Vpon ads on iOS, it's better for you to read the [integration guide](../../../integration-guide/) first.

1. Unity version > 4.5
2. XCode version > 5.1
3. Google Mobile Ads SDK > 7.0.0
4. Latest Vpon SDK and Vpon AdMob Adapter ([Download page](../../../download/ ))
5. Vpon ad IDs/Google AdMob account


# Integrate the Plugin into your Game
---
1. Open your project in the Unity editor.
2. Navigate to `Assets` -> `Import Package` -> `Custom Package`.
3. Select the `GoogleMobileAdsPlugin.unitypackage` file.
4. Import Vpon headers `VpadnBanner.h` and `VpadnInterstitial.h` into Plugins/iOS.
5. Make sure to check for any conflicts with files.

# Write Integration Codes
---

## Basic Banner Flow

Here is the minimal code needed to create a banner.

```c#
using GoogleMobileAds.Api;
...
// Create a 320x50 banner at the top of the screen.
BannerView bannerView = new BannerView(
        "YOUR_AD_UNIT_ID", AdSize.Banner, AdPosition.Top);
// Create an empty ad request.
AdRequest request = new AdRequest.Builder().Build();
// Load the banner with the request.
bannerView.LoadAd(request);
```
The *AdPosition* enum specifies where to place the banner.

## Basic Interstitial Flow

Here is the minimal banner code to create an interstitial.

```c#
using GoogleMobileAds.Api;
...
// Initialize an InterstitialAd.
InterstitialAd interstitial = new InterstitialAd("MY_AD_UNIT_ID");
// Create an empty ad request.
AdRequest request = new AdRequest.Builder().Build();
// Load the interstitial with the request.
interstitial.LoadAd(request);
```

Unlike banners, interstitials need to be explicitly shown. At an appropriate stopping point in your app, check that the interstitail is ready before showing it:

```c#
if (interstitial.IsLoaded()) {
  interstitial.Show();
}
```

# Run the Project
---
To build and run on iOS, click `File` -> `Build Settings`, select the iOS platform, then `Switch Platform`, then `Build`. This will export an XCode project. You'll need to do the following before you can run it:

1. From the Xcode project navigator, right-click on the project, and choose `Add Files To ""`.
2. Add `GoogleMobileAds.framework`.
3. Add Vpon SDK and Vpon AdMob Adapter.
4. Set `Enable Modules (C and Objective-C)` to `Yes` in `Build Settings`.
5. Reference necessary frameworks, hinder bit-code if needed, add `-ObjC` in `other linker flags`


# Result
---
<img src="{{site.imgurl}}/unity-example-img.jpg" style="width:300px" />


# FQA
---
###Q1: ld: library not found for -liPhone-lib
![]({{site.imgurl}}/unity-linker-problem.jpg)

###A1: Relink the libiPhone-lib.a
Wher to relink: `Build Phases` -> `Link Binary with Libraries`. The original lib `libiPhone-lib.a` lies in /project_name/Libraries/.


# Reference
---
* [Google's GitHub] (https://github.com/googleads/googleads-mobile-unity/tree/master/unity#run-the-project)
* [AdMob iOS Game](https://developers.google.com/admob/ios/games#unity)
