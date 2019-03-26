---
layout:         "android"
title:          "升級至 SDK 4.2.x "
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-tw/android/latest-news/update-to-SDK4_2_x/
lang:           "zh-tw"

---

# Steps to update
---
本文件是從 SDK 4.0.0 或是 SDK 4.1.0 升級到 SDK 4.2.x的方法。因為新版 SDK 4.2.x更改了 package, class, interface和method 的名稱，另外刪除 com.vpon.ads.VponPlatform這個class，請依照以下步驟做修改。

1.請將位於 libs folder 內舊的 Vpon SDK JAR 檔刪除，並放入新的 JAR 檔

2.更改 import 的 package, interface 和 class 名稱

```java
    com.vpon.ad.VponBanner -> com.vpadn.ad.VpadnBanner
    com.vpon.ad.VponAd -> com.vpadn.ad.VpadnAd
    com.vpon.ad.VponAdListener -> com.vpadn.ad.VpadnAdListener
    com.vpon.ad.VponAdRequest -> com.vpadn.ad.VpadnAdRequest
    com.vpon.ad.VponAdSize -> com.vpadn.ad.VpadnAdSize
    com.vpon.ad.VponInterstitialAd -> com.vpadn.ad.VpadnInterstitialAd
```

3.將 VpadnBanner 和 VpadnInterstitialAd 的 constructor，最後一個參數 VponPlatform.TW ，改為字串 "TW"

由：

  `new VponBanner(this, bannerId1,VponAdSize.SMART_BANNER , VponPlatform.TW);`<br>
改為

  `new VpadnBanner(this, bannerId1,VpadnAdSize.SMART_BANNER ,"TW");`
<br>

4.改變 Androidmanifest.xml 裡的 activity tag，由

```xml
 <activity
      android:name="com.vpon.widget.VponActivity"
      android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
      android:theme="@android:style/Theme.Translucent"
      android:hardwareAccelerated="true">
</activity>
```
改為：

```xml
  <activity
      android:name="com.vpadn.widget.VpadnActivity"
      android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
      android:theme="@android:style/Theme.Translucent"
      android:hardwareAccelerated="true">
  </activity>
```

5.如果您有使用到 Interface VponAdListener 請改為 `VpadnAdListener` 這interface裡面所有的  method name 都由 vpon 改為 `vpadn`，如下：

`onVponReceiveAd` -> `onVpadnReceiveAd`  

`onVponFailedToReceiveAd` -> `onVpadnFailedToReceiveAd`  

`onVponPresentScreen` -> `onVpadnPresentScreen`  

`onVponDismissScreen` -> `onVpadnDismissScreen`  

`onVponLeaveApplication` -> `onVpadnLeaveApplication`

6.如果有使用layout.xml 產生Vpon Banner，請將裡面所有 vpon 改為 `vpadn` 即可

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:vpadn="http://schemas.android.com/apk/lib/com.vpadn.ads"
    android:id="@+id/mainLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

<RelativeLayout
        android:id="@+id/adLayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" >

        <com.vpadn.ads.VpadnBanner
            android:id="@+id/vpadnBannerXML"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            vpadn:adSize="SMART_BANNER"
            vpadn:autoFresh="true"
            vpadn:bannerId= "License Key"
            vpadn:loadAdOnCreate="true"
            vpadn:platform="TW" />
    </RelativeLayout>
</LinearLayout>
```
You can use following code snippet to get test banner if your License Key has not been vetted

```java
  VpadnAdRequest adRequest =  new VpadnAdRequest();
  HashSet<String> testDeviceImeiSet = new HashSet<String>();
  testDeviceImeiSet.add("Advertising ID"); //TODO: put Android Advertising ID
  adRequest.setTestDevices(testDeviceImeiSet);
  vponBanner.loadAd(adRequest);
```

7.如果有使用 Proguard 請將 vpon 改為 vpadn，改後範例:<br>
- dontwarn c.\*\* <br>
- dontwarn com.vpon.\*\* <br>
- dontwarn vpadn.\*\* <br>
- keep class c.\*\*{ \*; } <br>
- keep class com.vpon.\*\* { \*; } <br>
- keep class vpon.\*\* { \*; } <br>
- keep class com.vpadn.\*\* { \*; } <br>
- keep class vpadn.\*\* { \*; } <br>
