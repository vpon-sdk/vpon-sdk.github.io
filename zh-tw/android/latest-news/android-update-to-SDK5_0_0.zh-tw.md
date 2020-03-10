---
layout:         "android"
title:          "升級至 SDK 5.0.2"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-tw/android/latest-news/update-to-SDK5_0_2/
lang:           "zh-tw"

---

# 概覽
---

* 移除過於厚重且使用率不高的 Cordova，改採原生的 Javascript 進行溝通
* 重構介面，將介面名稱由 Vpadn 改為 Vpon
* 重構 AdListener 的介面
* 將建立廣告實體時傳入的參數由 Activity 改為 Context
* 調整 SDK 架構，以支援更多第三方追蹤方案
* 支援 mraid3 介面

# 系統要求
---

* 支援 Android minSdkVersion 4.3 及以上版本

# 版本差異
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

# 如何確認當前使用的版本
---
您可以在 Android Studio 的 Logcat 中，看到以下版本訊息：

```
VPON: [::SDK-VERSION::]  v5.0.2
VPON: [::BUILD-DATE::]  20200214
```


# 如何更新至 SDK v5.0.2
---
由於 SDK v5.0.2 對於舊版本 SDK 有向下相容的設計，您在更新 SDK 後，不需原有的串接程式碼做任何調整，即可執行，請務必在更新 SDK 後，測試是否能正常取得、展示廣告。

> **Note:** 如果您計劃將廣告請求及展示的程式碼調整為新的介面，請參考：
>
> * [橫幅廣告]
> * [插頁廣告]
> * [原生廣告]

您可以透過以下兩種方式更新 SDK：

* [從 Maven 更新 SDK](#maven)
* [手動下載並更新 SDK](#manual-sdk)

## 從 Maven 更新 SDK {#maven}
---
如果您原先是使用 Maven 來安裝 Vpon SDK，您可以透過修改相依的版本來更新 SDK：

```xml
dependencies {
    implementation 'com.vpon:vpadnSDK:5.0.2'
}
```

同時，您也需要更新第三方 Library-Retrofit 的版本：

```xml
dependencies {
    implementation 'com.squareup.retrofit2:retrofit:2.6.2'
}
```

## 手動下載並更新 SDK {#manual-sdk}
---
如果您原先是手動下載 SDK 來安裝的話，請:

* [由此下載][1]最新版本的 SDK，將舊版本的 SDK 替換掉
* [由此下載][2] Retrofit 的 jar 檔並導入專案中


[1]:{{ site.baseurl }}/android/download/
[2]: https://github.com/square/retrofit
[橫幅廣告]:{{site.baseurl}}/zh-tw/android/banner
[插頁廣告]:{{site.baseurl}}/zh-tw/android/interstitial
[原生廣告]:{{site.baseurl}}/zh-tw/android/native