---
layout:         "android"
title:          "升級至 SDK 5.0.2"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-cn/android/latest-news/update-to-SDK5_0_2/
lang:           "zh-cn"

---

# 概览
---
本次的 SDK 版本更新，主要进行了以下架构调整：

* 移除过于厚重且使用率不高的 Cordova，改采原生的 Javascript 进行沟通
* 重构介面，将介面名称由 Vpadn 开头改为 Vpon
* 重构 AdListener 的介面
* 将创建广告实体时传入的参数由 Activity 改为 Context
* 支援 mraid3 介面
* 第三方追踪支援


# 系统要求
---

* 支援 Android minSdkVersion 4.3 及以上版本

# 版本差异
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

# 如何确认当前使用的版本
---
您可以在 Android Studio 的 Logcat 中，看到以下版本讯息：

```
VPON: [::SDK-VERSION::]  v5.0.2
VPON: [::BUILD-DATE::]  20200214
```


# 如何更新至 SDK v5.0.2
---
由于 SDK v5.0.2 对于旧版本 SDK 有向下相容的设计，您在更新 SDK 后，不需对原有的串接程式码做任何调整即可执行，请务必在更新 SDK 御，测试是否能正常取得、展示广告。

> 如果您计划将广告请求及展示程式码调整为新的介面，请参考：
>
> * [横幅广告]
> * [插页广告]
> * [原生广告]


您可以透过以下两种方式更新 SDK：

* [从 Maven 更新 SDK](#maven)
* [手动下载并更新 SDK](#manual-sdk)

## 从 Maven 更新 SDK {#maven}
---
如果您原先是使用 Maven 來安裝 Vpon SDK，您可以透過修改相依的版本來更新 SDK：

```xml
dependencies {
    implementation 'com.vpon:vpadnSDK:5.0.2'
}
```

同时，您也需要更新第三方 Library-Retrofit 的版本：

```xml
dependencies {
    implementation 'com.squareup.retrofit2:retrofit:2.6.2'
}
```

## 手动下载并更新 SDK {#manual-sdk}
---
如果您原先是手动下载 SDK 来安装的话，请:

* [由此下载][1]最新版本的 SDK，将旧版本的 SDK 替换掉
* [由此下载][2] Retrofit 的 jar 档并导入专案中


[1]:{{ site.baseurl }}/android/download/
[2]: https://github.com/square/retrofit
[横幅广告]:{{site.baseurl}}/zh-tw/android/banner
[插页广告]:{{site.baseurl}}/zh-tw/android/interstitial
[原生广告]:{{site.baseurl}}/zh-tw/android/native