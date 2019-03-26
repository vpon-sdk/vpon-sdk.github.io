---
layout:         "android"
title:          "Update to SDK 4.2.x "
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /android/latest-news/update-to-SDK4_2_x/
lang:           "en"

---
# Steps to update
---
The messages below show you how to upgrade to SDK4.2.x from the previous version of SDK 4.0.0 or SDK 4.1.0. Because we've change the name of package, class, interface, method and also delete the class of com.vpon.ads.VponPlatform in SDK4.2.x. So please follow the steps below to modify.

1. Please replace the previous Vpon SDK jar file by the latest jar file in libs folder.
2. Please change the name of package,interface and class.

```java
    com.vpon.ad.VponBanner -> com.vpadn.ad.VpadnBanner
    com.vpon.ad.VponAd -> com.vpadn.ad.VpadnAd
    com.vpon.ad.VponAdListener -> com.vpadn.ad.VpadnAdListener
    com.vpon.ad.VponAdRequest -> com.vpadn.ad.VpadnAdRequest
    com.vpon.ad.VponAdSize -> com.vpadn.ad.VpadnAdSize
    com.vpon.ad.VponInterstitialAd -> com.vpadn.ad.VpadnInterstitialAd
```

3.You've to modify the last one parameter of the constructor of VpadnBanner and VpadnInterstitialAd. Please change the VponPlatform.TW to be the String"TW" or "CN"(only for China)
original version：

`new VponBanner(this, bannerId1,VponAdSize.SMART_BANNER , VponPlatform.TW);`
Change it like this: <br>
`new VpadnBanner(this, bannerId1,VpadnAdSize.SMART_BANNER ,"TW");`

4.Please change activity tag in Androidmanifest.xml: <br>
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

Change it like this:

```xml
        <activity
            android:name="com.vpadn.widget.VpadnActivity"
            android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
            android:theme="@android:style/Theme.Translucent"
            android:hardwareAccelerated="true"
            >  
        </activity>
```

5.If you used the interface of VponAdListener, please modify it to VpadnAdListener.
All names of methods used in interface should be changed to vpadn, for example:

`onVponReceiveAd` -> `onVpadnReceiveAd`  

`onVponFailedToReceiveAd` -> `onVpadnFailedToReceiveAd`  

`onVponPresentScreen` -> `onVpadnPresentScreen`  

`onVponDismissScreen` -> `onVpadnDismissScreen`  

`onVponLeaveApplication` -> `onVpadnLeaveApplication`

6.If you generated Vpon Banner from layout.xml, please change it to vpadn in layout.xml.

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
You can use following code snippet to get test ad if your License Key has not been vetted

```java
    VpadnAdRequest adRequest =  new VpadnAdRequest();
    HashSet<String> testDeviceImeiSet = new HashSet<String>();
    testDeviceImeiSet.add("Advertising ID"); //TODO: put Android Advertising ID
    adRequest.setTestDevices(testDeviceImeiSet);
    vponBanner.loadAd(adRequest);
```

7.If you tried to used proguard, please change it like this:<br>
- dontwarn c.\*\* <br>
- dontwarn com.vpon.\*\* <br>
- dontwarn vpadn.\*\* <br>
- keep class c.\*\*{ \*; } <br>
- keep class com.vpon.\*\* { \*; } <br>
- keep class vpon.\*\* { \*; } <br>
- keep class com.vpadn.\*\* { \*; } <br>
- keep class vpadn.\*\* { \*; } <br>
