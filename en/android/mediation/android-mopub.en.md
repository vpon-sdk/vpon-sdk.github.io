---
layout:         "android"
title:          "Android - MoPub"
lead:           "android mediation"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/mediation/mopub/
lang:           "en"
---

# General
---
Please make sure you've added following files in your project:

1. MoPub SDK
2. Vpon SDK
3. Vpon MoPub Custom Event

>**Note:** 
>
>* Besides ad integration, to make the Ads work more smoothly and release resource appropriately, we recommend that you should implement Activity method in the Activity Lifacycle. (Please refer to [MoPub API)])
>
>* For Vpon SDK and Vpon MoPub Custom Event, please [download here][13].


# Native Ad Integration
---
Please follow the instruction below to integrate Vpon Native Ad via MoPub Mediation.

This instruction is compatible with `Vpon MoPub Custom Event v1.3.0 and above version`.


## Set Up Native Ad Layout
---
Please use `VponViewBinder` and `VponNativeAdRenderer` to set up Native Ad Layout.


```java
...
moPubNative = new MoPubNative(this, MY_NATIVE_UNIT_ID, moPubNativeNetworkListener);
VponViewBinder vponViewBinder = new VponViewBinder.Builder(R.layout.mopub_native_layout)
        .mainImageId(R.id.native_main_image)
        .iconImageId(R.id.native_icon_image)
        .titleId(R.id.native_title)
        .textId(R.id.native_text)
        .callToActionId(R.id.native_cta)
        .privacyInformationIconImageId(R.id.native_privacy_information_icon_image)
        .build();

VponNativeAdRenderer vponNativeAdRenderer = new VponNativeAdRenderer(vponViewBinder);
moPubNative.registerAdRenderer(vponNativeAdRenderer);
moPubNative.makeRequest();
...
```

>**Note:** If you are using `Vpon MoPub Custom Event v1.1.0 or below version`, please use `ViewBinder` and `MoPubStaticNativeAdRenderer` to set up Native Ad Layout.

## Use VponMediaView To Display Ad Creatives
---

Replace ImageView with VponMediaView to display more diverse creatives.


```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/native_outer_view"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@android:color/white"
    android:textDirection="locale">
...

    <com.vpon.ads.VponMediaView
        android:id="@+id/native_main_image"
        android:layout_width="match_parent"
        android:layout_height="200dp"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_below="@+id/native_text"
        android:layout_marginLeft="10dp"
        android:layout_marginRight="10dp"
        android:layout_marginTop="10dp"
        android:background="@null"
        android:contentDescription="native_main_image"
        android:scaleType="fitCenter" />
...
```


# MoPub Settings
---
To setup MoPub, you need to complete the following steps:

## Step1: Add your app
Click "Inventory" tab and click "Add a New App". Register your app here.
![][6]

## Step2: Add an Ad unit
In the inventory that you just created, click "Add an Ad Unit" to create a native ad.
![][7]

## Step3: Add Vpon Ad Netword
Click "Networks" tab and click "add a Network".
![][1]

## Step4: Custom Native Network
![][2]

## Step5: Add title to manage your Ad network

![][3]

## Step6: Fill in CUSTOMEVENT
Fill in your package name + class name, you can see the sample at the reference page.

## Step7: License Key / adUnitID
Fill in License Key which you apply from our Vpon website, and the key is `adUnitID`
![][8]

## Step8: Enable Vpon Ad Network
After filling in the data above, click "Segments" tab and choose "Global Segment", you will see your inventory, ads, and Vpon ad network. Please turn Vpon Network "Enabled" on, and check the the stauts of the network is "Running".

![][9]


  [1]: {{site.imgurl}}/Mopub_001.png
  [2]: {{site.imgurl}}/Mopub_002.png
  [3]: {{site.imgurl}}/Mopub_003.png
  [4]: {{site.imgurl}}/Mopub_004-a.png
  [5]: {{site.imgurl}}/Mopub_005.png
  [6]: {{site.imgurl}}/Mopub_006.png
  [7]: {{site.imgurl}}/Mopub_007.png
  [8]: {{site.imgurl}}/Mopub_013.png
  [9]: {{site.imgurl}}/Mopub_009.png
[13]: {{site.baseurl}}/android/download
[MoPub API]: https://developers.mopub.com/publishers/reference/android/LifeCycleListener/#public-void-onpauseactivity-activity