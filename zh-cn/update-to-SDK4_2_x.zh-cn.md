---
layout:         "android"
title:          "升级至 SDK 4.2.x "
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-cn/android/latest-news/update-to-SDK4_2_x/
lang:           "zh-cn"

---

# Steps to update
---
本文件是从 SDK 4.0.0 或是 SDK 4.1.0 升级到 SDK 4.2.x的方法。因为新版 SDK 4.2.x更改了 package, class, interface和method 的名称，另外删除 com.vpon.ads.VponPlatform这个class，请依照以下步骤做修改。

1.请将位于 libs folder 内旧的 Vpon SDK JAR 档删除，并放入新的 JAR 档
2.更改 import 的 package, interface 和 class 名称

```java
    com.vpon.ad.VponBanner -> com.vpadn.ad.VpadnBanner
    com.vpon.ad.VponAd -> com.vpadn.ad.VpadnAd
    com.vpon.ad.VponAdListener -> com.vpadn.ad.VpadnAdListener
    com.vpon.ad.VponAdRequest -> com.vpadn.ad.VpadnAdRequest
    com.vpon.ad.VponAdSize -> com.vpadn.ad.VpadnAdSize
    com.vpon.ad.VponInterstitialAd -> com.vpadn.ad.VpadnInterstitialAd
```

3.将 VpadnBanner 和 VpadnInterstitialAd 的 constructor，最后一个参数 VponPlatform.CN ，改为字串 "CN"

由：

  `new VponBanner(this, bannerId1,VponAdSize.SMART_BANNER , VponPlatform.CN);`<br>
改为

  `new VpadnBanner(this, bannerId1,VpadnAdSize.SMART_BANNER ,"CN");`
<br>

4.改变 Androidmanifest.xml 裡的 activity tag，由

 ```xml
 <activity
      android:name="com.vpon.widget.VponActivity"
      android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
      android:theme="@android:style/Theme.Translucent"
      android:hardwareAccelerated="true">
</activity>
```
改为：

```xml
  <activity
      android:name="com.vpadn.widget.VpadnActivity"
      android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
      android:theme="@android:style/Theme.Translucent"
      android:hardwareAccelerated="true">
  </activity>
```

5.如果您有使用到 Interface VponAdListener 请改为 `VpadnAdListener` 这interface裡面所有的  method name 都由 vpon 改为 `vpadn`，如下：

`onVponReceiveAd` -> `onVpadnReceiveAd`  

`onVponFailedToReceiveAd` -> `onVpadnFailedToReceiveAd`  

`onVponPresentScreen` -> `onVpadnPresentScreen`  

`onVponDismissScreen` -> `onVpadnDismissScreen`  

`onVponLeaveApplication` -> `onVpadnLeaveApplication`

6.如果有使用layout.xml 产生Vpon Banner，请将裡面所有 vpon 改为 `vpadn` 即可

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:vpadn="http://schemas.android.com/apk/lib/com.vpadn.ads"
    android:id="@+id/mainLayout"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

<RelativeLayout
        android:id="@+id/adLayout"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" >

        <com.vpadn.ads.VpadnBanner
            android:id="@+id/vpadnBannerXML"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            vpadn:adSize="SMART_BANNER"
            vpadn:autoFresh="true"
            vpadn:bannerId= CHANGE_ME
            vpadn:loadAdOnCreate="true"
            vpadn:platform="CN" />
    </RelativeLayout>
</LinearLayout>
```

As usual you must replace CHANGE ME with your Vpon Banner ID.
You can use the following code to get the Test Banner If your banner ID has not been vetted

```java
  VpadnAdRequest adRequest =  new VpadnAdRequest();
  HashSet<String> testDeviceImeiSet = new HashSet<String>();
  testDeviceImeiSet.add("Advertising ID"); //TODO: put Android Advertising ID
  adRequest.setTestDevices(testDeviceImeiSet);
  vponBanner.loadAd(adRequest);
```

7.如果有使用 Proguard 请将 vpon 改为 vpadn，改后范例:<br>
- dontwarn c.\*\* <br>
- dontwarn com.vpon.\*\* <br>
- dontwarn vpadn.\*\* <br>
- keep class c.\*\*{ \*; } <br>
- keep class com.vpon.\*\* { \*; } <br>
- keep class vpon.\*\* { \*; } <br>
- keep class com.vpadn.\*\* { \*; } <br>
- keep class vpadn.\*\* { \*; } <br>
