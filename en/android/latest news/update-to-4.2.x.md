---
layout:         "android"
title:          "Update to SDK 4.2.x "
lead:           "sub-title"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:      latest-news/update-to-SDK4_2_x/
lang:            "en"
---

# Steps to update
---
The messages below show you how to upgrade to SDK4.2.x from the previous version of SDK 4.0.0 or SDK 4.1.0. Because we've change the name of package, class, interface, method and also delete the class of com.vpon.ads.VponPlatform in SDK4.2.x. So please follow the steps below to modify.

1. Please remove the previous Vpon SDK jar file and put the latest jar file in libs folder.

2. Please change the names of package, interface and class.


```java
    com.vpon.ad.VponBanner -> com.vpadn.ad.VpadnBanner
    com.vpon.ad.VponAd -> com.vpadn.ad.VpadnAd
    com.vpon.ad.VponAdListener -> com.vpadn.ad.VpadnAdListener
    com.vpon.ad.VponAdRequest -> com.vpadn.ad.VpadnAdRequest
    com.vpon.ad.VponAdSize -> com.vpadn.ad.VpadnAdSize
    com.vpon.ad.VponInterstitialAd -> com.vpadn.ad.VpadnInterstitialAd
```
3.You have to modify the last parameter of the constructor of VpadnBanner and VpadnInterstitialAd. Please change the `VponPlatform.TW `to be the String `TW` or `CN`(only for China) original version：  

    `new VponBanner(this, bannerId1,VponAdSize.SMART_BANNER , VponPlatform.TW);`

    modify it like this:

    `new VpadnBanner(this, bannerId1,VpadnAdSize.SMART_BANNER ,"TW");`

4.Please change activity tag in Androidmanifest.xml:  <br>
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
Modify it like this:

```xml
        <activity
            android:name="com.vpadn.widget.VpadnActivity"
            android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
            android:theme="@android:style/Theme.Translucent"
            android:hardwareAccelerated="true"
            >  
        </activity>
```

5.If you used the interface of VponAdListener, please modify it to `VpadnAdListener`.  
All names of methods used in interface should be changed to vpadn, for example:  

`onVponReceiveAd` -> `onVpadnReceiveAd`  

`onVponFailedToReceiveAd` -> `onVpadnFailedToReceiveAd`  

`onVponPresentScreen` -> `onVpadnPresentScreen`  

`onVponDismissScreen` -> `onVpadnDismissScreen`  

`onVponLeaveApplication` -> `onVpadnLeaveApplication`

6. If you generated Vpon Banner from layout.xml, please change it to vpadn in layout.xml.

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

7. If you tried to used proguard, please change it like this:
-dontwarn c.**
-dontwarn com.vpon.**
-dontwarn vpadn.**
-keep class c.**{ *; }
-keep class com.vpon.** { *; }
-keep class vpon.** { *; }"
-keep class com.vpadn.** { *; }
-keep class vpadn.** { *; }
