---
layout:         "android"
title:          "How To Update To Vpon SDK v5.0.2"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/latest-news/update-to-SDK5_0_2/
lang:            "en"

---

# Overview
---
Here are the major changes in SDK v5.0.2:

* Replace Cordova framework with self-maintenance Javascript for communicating
* Revise the interface from Vpadn to Vpon for brand identification
* Revise the interface of AdListener
* Adjust the input parameter from Activity to Context when creating ad ad instance
* Support mraid3 when display Banner and Interstitial Ad
* Revise the framework to make it more compatible with 3rd-party tracking solution

# System Requirement
---

* Support Android minSdkVersion 4.3 and above version

# Difference Between SDK v4 and v5
---

## VponAdActivity

```xml
<!-- Add in AndroidManifest.xml if using SDK v4.9.1 and below -->
<activity android:name="com.vpadn.widget.VpadnActivity"
android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
android:theme="@android:style/Theme.Translucent"
android:hardwareAccelerated="true"/>

<!-- Add in AndroidManifest.xml if using SDK v5.0.2 and above -->
<activity android:name="com.vpon.ads.VponAdActivity"
android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
android:theme="@android:style/Theme.Translucent"
android:hardwareAccelerated="true"/>
```


## Import Vpon SDK

```java
import com.vpadn.ads.*;
// Import Vpon SDK v4.9.1 and below

import com.vpon.ads.*;
// Import Vpon SDK v5.0.2 and above
```


## Ad Instance Declaration

### Banner Ad

```java
VpadnBanner vponBanner = new VpadnBanner(context, bannerId, VpadnAdSize.SMART_BANNER);
// Declare Banner Ad instance in SDK v4.9.1 and below

VponBanner vponBanner = new VponBanner(context, bannerId, VponAdSize.SMART_BANNER);
// Declare Banner Ad instance in SDK v5.0.2 and above
```

```xml
<!-- Declare Banner Ad instance in SDK v4.9.1 and below -->
<com.vpadn.ads.VpadnBanner
    android:layout_centerInParent="true"
	android:id="@+id/vponBannerXML"
	android:layout_width="wrap_content"
	android:layout_height="wrap_content"
	vpadn:adSize="SMART_BANNER"
	vpadn:bannerId= "License Key"/>

<!-- Declare Banner Ad instance in SDK v4.9.1 and below -->
<com.vpon.ads.VponBanner
    android:layout_centerInParent="true"
    android:id="@+id/vponBannerXML"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    vpon:adSize="SMART_BANNER"
    vpon:bannerId= "License Key"/>
```


### Interstitial Ad

```java
VpadnInterstitialAd vponIntersitialAd = new VpadnInterstitialAd(context, licenseKey);
// Declare Interstitital Ad instance in SDK v4.9.1 and below

VponInterstitialAd vponIntersitialAd = new VponInterstitialAd(context, licenseKey);
// Declare Interstitial Ad instance in SDK v5.0.2 and above
```

### Native Ad And MediaView

```java
VpadnNativeAd vponNativeAd = new VpadnNativeAd(context, licenseKey);
VpadnMediaView nativeAdMedia = new VpadnMediaView(context);
nativeAdMedia.setNativeAd(vponNativeAd);
// Declare Native Ad and MediaView instance in SDK v4.9.1 and below

VponNativeAd vponNativeAd = new VponNativeAd(context, licenseKey);
nativeAdMedia.setNativeAd(vponNativeAd);
// Declare Native Ad and MediaView instance in SDK v5.0.2 and above
```

<!-- ### Splash Ad
```java
``` -->

## Ad Request Builder

```java
VpadnAdRequest adRequest = new VpadnAdRequest();
// Set up ad request in SDK v4.9.1 and below

VponAdRequest.Builder builder = new VponAdRequest.Builder();
builder.setAutoRefresh(true);
VponAdRequest adRequest = builder.build();
// Set up ad request in SDK v5.0.2 and above
```


## Ad Listener

### Banner Ad

```java
public void onVpadnReceiveAd(VpadnAd ad) {}
public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errCode) {}
public void onVpadnPresentScreen(VpadnAd ad) {}
public void onVpadnDismissScreen(VpadnAd ad) {}
public void onVpadnLeaveApplication(VpadnAd ad) {}
// Set Ad listener in SDK v4.9.1 and below

public void onAdLoaded() {}
public void onAdFailedToLoad(int errorCode) {}
public void onAdOpened() {}
public void onAdLeftApplication() {}
// Set Ad listener in SDK v5.0.2 and above
```

### Interstitial Ad

```java
public void onVpadnReceiveAd(VpadnAd ad) {}
public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode) {}
public void onVpadnPresentScreen(VpadnAd ad) {}
public void onVpadnDismissScreen(VpadnAd ad) {}
public void onVpadnLeaveApplication(VpadnAd ad) {}
// Set Ad listener in SDK v4.9.1 and below

public void onAdLoaded() {}
public void onAdFailedToLoad(int errorCode) {}
public void onAdOpened() {}
public void onAdLeftApplication() {}
public void onAdClosed() {}
// Set Ad listener in SDK v5.0.2 and above
```

### Native Ad

```java
public void onVpadnReceiveAd(VpadnAd ad) {}
public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode) {}
public void onVpadnPresentScreen(VpadnAd ad) {}
public void onVpadnDismissScreen(VpadnAd ad) {}
public void onVpadnLeaveApplication(VpadnAd ad) {}
// Set Ad listener in SDK v4.9.1 and below

public void onAdLoaded() {}
public void onAdFailedToLoad(int errorCode) {}
public void onAdOpened() {}
public void onAdLeftApplication() {}
// Set Ad listener in SDK v5.0.2 and above

public void onNativeAdLoaded(VponNativeAd.NativeAdData localNativeAdData) {}
// New interface in SDK v5.0.2
```

### Splash Ad

```java
public void onVpadnReceiveAd(VpadnAd ad) {}
public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode) {}
public void onVpadnClickAd(VpadnAd ad) {}
public void onVpadnLeaveApplication(VpadnAd ad) {}
public void onVpadnAllowToDismissAd(VpadnAd ad) {}
// Set Ad listener in SDK v4.9.1 and below

public void onAdLoaded() {}
public void onAdFailedToLoad(int errorCode) {}
public void onAdOpened() {}
public void onAdLeftApplication() {}
public void onAdClosed() {}
// Set Ad listener in SDK v5.0.2 and above

public void onSplashAdDisplayed() {}
public void onSplashAllowToDismiss() {}
// New interface in SDK v5.0.2
```

# How To Check Current Version
---
You can find the log in your Android Studio:

```
VPON: [::SDK-VERSION::]  v5.0.2
VPON: [::BUILD-DATE::]  20200214
```


# How To Update To SDK v5.0.2
---
Since that the SDK v5.0.2 is backward compatible, you don't have to apply any code change if you are going to update the it. Please verify if you can request and display ad successfully after your update.

> **Note:** If you are trying to migrate your intergration with new interface, please refer to :
>
> * [Banner Ad]
> * [Interstitial Ad]
> * [Native Ad]

You can update SDK with following two ways:

* [Update SDK with Maven](#maven)
* [Download and update SDK manually](#manual-sdk)

## Update SDK with Maven {#maven}
---
如果您原先是使用 Maven 來安裝 Vpon SDK，您可以透過修改相依的版本來更新 SDK：

```xml
dependencies {
    implementation 'com.vpon:vpadnSDK:5.0.2'
}
```
Also, you have to update the 3rd-party library-Retofit:

```xml
dependencies {
    implementation 'com.squareup.retrofit2:retrofit:2.6.2'
}
```

## Download and update SDK manually {#manual-sdk}
---
Please download the latest SDK and Retrofit Library below:

* [Download the latest SDK here][1]
* [Download the latest Retofit Library here][2]



[1]:{{ site.baseurl }}/android/download/
[2]: https://github.com/square/retrofit
[Banner Ad]:{{site.baseurl}}/android/banner
[Interstitial Ad]:{{site.baseurl}}/android/interstitial
[Native Ad]:{{site.baseurl}}/android/native