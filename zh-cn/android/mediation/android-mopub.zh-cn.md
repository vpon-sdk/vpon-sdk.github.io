---
layout:         "android"
title:          "Android 中介服务 - MoPub"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/mediation/mopub/
lang:           "zh-cn"
---
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

## Step7: VponID/adUnitID
填入您在 Vpon 申请的 BannerID/InterstitialID, key 为 `adUnitID`
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
[8]: {{site.imgurl}}/Mopub_008.png
[9]: {{site.imgurl}}/Mopub_009.png
