---
layout:         "android"
title:          "Android 中介服务 - MoPub"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/mediation/mopub/
lang:           "zh-cn"
---

# 概要
---
在开始进行 MoPub 设定之前，请务必确认您的专案中已包含以下三个档案：

1. MoPub SDK
2. Vpon SDK
3. Vpon MoPub Custom Event

>**Note:** 您可以[由此下载][10] Vpon SDK 及 Vpon MoPub Custom Event。


# 原生广告串​​接设定
---
如果您选择透过 MoPub 串接 Vpon 原生广告，请务必按照以下范例实作以成功展示广告。

以下方式适用于 `Vpon MoPub Custom Event v1.3.0 及以上版本`

## 设置原生广告 Layout
---
请使用 `VponViewBinder` 及 `VponNativeAdRenderer` 建立原生广告 Layout。

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

>**Note:** 如果您使用的 `Vpon MoPub Custom Event 版本为 v1.1.0 或以下版本`，则使用 MoPub 的 `ViewBinder` 及 `MoPubStaticNativeAdRenderer` Method 即可

## 使用 VponMediaView 展示广告素材
---

使用 VponMediaView 取代原本的 ImageView，以展示更多元化的广告素材。


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


# MoPub设定
---
Mopub后台设定请参考下列步骤:

## Step1: 新增 app
选择 Inventory 选项并点击 "Add a New App" 新增您的 app。
![][6]

## Step2: 新增广告
进入刚注册的 app 后点选 "Add an Ad Unit" 并选择要新增的广告类型。
![][7]

## Step3: 新增 Vpon Ad Netword
选择 "Networks" 选项并点击 "add a Network"。
![][1]

## Step4: Custom Native Network
选择 Custom Native Network
![][2]

## Step5: 填入标题名称
填入辨识用的标题名称, 方便您管理增加的 Ad network
![][3]

## Step6: 填写 CUSTOMEVENT
填入您的 package name + class name, 可以参考范例所示

## Step7: License Key / adUnitID
填入您在 Vpon 申请的 License Key, key 为 `adUnitID`
![][8]

## Step8: 开启授权 Vpon Ad Network
选择 "Segments" 选项并选择 "Global Segment"，可以看到刚建立的 app、广告、Vpon ad network。请开启对 Vpon Ad Network 的授权，并确认状态为 "Running"。

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
[10]: {{site.baseurl}}/zh-tw/android/download