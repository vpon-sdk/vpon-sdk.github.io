---
layout:         "android"
title:          "Android - Update to SDK 4.2.x"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       jp/android/latest-news/update-to-SDK4_2_x/
lang:            "jp"
---
# Steps to update
---
SDK 4.0.0 或いは SDK 4.1.0 から SDK 4.2.x にアップグレードする方法です。新版 SDK 4.2.x は package、 class、 interface 及び method の名称を変更し、また com.vpon.ads.VponPlatform という class を削除したため、以下のステップに基づき修正 してください。

1. libs folder 内にある古い Vpon SDK jar ファイルを削除して新しい jar ファイル SDK4.2.6

2. import の package、 interface 及び class 名称を変更します。


```java
    com.vpon.ad.VponBanner -> com.vpadn.ad.VpadnBanner
    com.vpon.ad.VponAd -> com.vpadn.ad.VpadnAd
    com.vpon.ad.VponAdListener -> com.vpadn.ad.VpadnAdListener
    com.vpon.ad.VponAdRequest -> com.vpadn.ad.VpadnAdRequest
    com.vpon.ad.VponAdSize -> com.vpadn.ad.VpadnAdSize
    com.vpon.ad.VponInterstitialAd -> com.vpadn.ad.VpadnInterstitialAd
```
3.VpadnBanner と VpadnInterstitialAd の constructor の最終パラメータ VponPlatform.TW を文字列 `TW`に変更します。)
original version：

  `new VponBanner(this, bannerId1,VponAdSize.SMART_BANNER , VponPlatform.TW);`

から:

  `new VpadnBanner(this, bannerId1,VpadnAdSize.SMART_BANNER ,"TW");`

4.Android manifest.xml 内の activity tag を:
original version:

```xml
 <activity
            android:name="com.vpon.widget.VponActivity"
            android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
            android:theme="@android:style/Theme.Translucent"
            android:hardwareAccelerated="true"
            >
           </activity>
```
から:

```xml
        <activity
            android:name="com.vpadn.widget.VpadnActivity"
            android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
            android:theme="@android:style/Theme.Translucent"
            android:hardwareAccelerated="true"
            >  
        </activity>
```

に変更します。

5.Interface VponAdListener を使用している場合、VpadnAdListener に変更してください。この interface 内の全ての method name は vpon から vpadn に変更し、以下の通りとします。

`onVponReceiveAd` -> `onVpadnReceiveAd`  

`onVponFailedToReceiveAd` -> `onVpadnFailedToReceiveAd`  

`onVponPresentScreen` -> `onVpadnPresentScreen`  

`onVponDismissScreen` -> `onVpadnDismissScreen`  

`onVponLeaveApplication` -> `onVpadnLeaveApplication`

6.layout.xml を使って Vpon Banner を生成した場合、その中の全ての vpon を vpadn に変更するだけで結構です。

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
            vpadn:bannerId= CHANGE ME
            vpadn:loadAdOnCreate="true"
            vpadn:platform="TW" />
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

7.Proguard を使用している場合、vpon を vpadn に変更してから次のインスタンスを修正します。<br>
-dontwarn c.\*\* <br>
-dontwarn com.vpon.\*\* <br>
-dontwarn vpadn.\*\* <br>
-keep class c.\*\*{ \*; } <br>
-keep class com.vpon.\*\* { \*; } <br>
-keep class vpon.\*\* { \*; } <br>
-keep class com.vpadn.\*\* { \*; } <br>
-keep class vpadn.\*\* { \*; } <br>
