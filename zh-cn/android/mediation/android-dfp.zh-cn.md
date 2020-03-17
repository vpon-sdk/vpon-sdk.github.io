---
layout:         "android"
title:          "Android 中介服务 - Google Ad Manager"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/mediation/dfp/
lang:           "zh-cn"
---
# 最新消息
---
根据[Google Ad Manager 公告](https://support.google.com/admanager/answer/9020684)，目前已停止使用Google Ad Manager 广告素材中SDK 中介服务广告素材的功能，若您想使用Google Ad Manager进行SDK Mediation，请参考[建立及管理收益群组](https://support.google.com/admanager/answer/7390828)，将SDK 中介服务广告素材转移到收益群组中。


# 概要
---
在开始进行 Google Ad Manager 设定之前，请务必确认您的专案中已包含以下三个档案：

1. Google Mobile Ad s SDK
2. Vpon SDK
3. Vpon AdMob Adapter

>**Note:** 您可以[由此下载][1] Vpon SDK 及 Vpon AdMob Adapter。


# 广告单元设定
---
首先，请登入您的 [Google Ad Manager 后台]，切换到广告空间下的广告单元标签，请依您要展示的广告类型设定来新增广告单元。

## 横幅广告单元
请参考 [Google Ad Manager 串接说明文件]中提供的尺吋表，并依您想展示的横幅广告大小选择尺吋。

## 插页广告单元
插页式广告单元有四种常见大小，与各装置的实际萤幕大小无关。 SDK 会调整广告素材，以便正确呈现在大小稍微不同的萤幕上。

* 手机：320x480 (直向)、480x320 (纵向)
* 平板电脑：768x1024 (直向)、1024x768 (纵向)

您不需特别为纵向模式建立个别的广告单元，只要在指定插页式广告单元的订单项中加入纵向大小(例如，智慧型手机采480x320)，然后除了一般的直向大小外，另外加入纵向大小的广告素材。


## 原生广告单元

请依所需的原生广告大小，设定广告单元。

# 产生广告代码
---

新增广告单元后，请选择广告单元，再选择产生广告代码。请选取代码类型为`行动应用程式`，产生的广告代码格式为：<span style="color:#228B22">/networkCode/adUnitName</span>，请将此代码加到您的专案中。

![Ad Manager 广告单元]

# 收益群组设定
---

## 新增收益伙伴

完成广告单元的设定后，请先到管理标签下的公司页面，新增 Vpon 为您的收益伙伴：

1. 请点选`新增公司`，并选择`广告联播网`
2. 输入您自定义的名称，并在广告联播网的栏位选择 `Vpon`
3. 请依您的需求完成选用设定后储存


## 设定收益群组

请到广告放送下的收益群组页面，参考以下步骤，完成收益群组设定：

1. 新增收益群组
2. 指定要投放的广告格式及广告空间类型
3. 指定要投放的广告空间
4. 依您的需求，选择是否指定投放的装置类别、作业系统、地理位置等设定
5. 点选新增收益伙伴，选择 `Vpon`
6. 选择整合类型
* 串接`横幅广告`或是`插页广告`，请选择`Mobile SDK`，并在 Zone 的栏位填入 `TW`、在 Vpon Ad ID 的栏位填入 `Vpon License Key`
* 串接`原生广告`，请选择`自订事件中介服务`，并在 Class Name 的栏位填入 `com.vpadn.mediation.VpadnAdapter`，在 Parameter 的栏位填入 `Vpon License Key`
7. 储存您的设定

# Tips
---

### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]


[串接说明]: ../../integration-guide
[Sample Code]: {{site.baseurl}}/zh-cn/android/download/#dfp
[Google Ad Manager 后台]: https://admanager.google.com/
[Google Ad Manager 串接说明文件]: https://developers.google.com/ad-manager/mobile-ads-sdk/ios/banner#banner_sizes
[Ad Manager 广告单元]: {{site.imgurl}}/AppAdManager_02.png
[DFP 广告空间]: {{site.imgurl}}/UnitAdSetting_Sim.png
[新增指定目标]: {{site.imgurl}}/新增指定目标.png
[广告素材类型]: {{site.imgurl}}/广告素材类型.png
[Warning]: {{site.imgurl}}/Warning.png
[DFP Partner Traditional Chinese.png]: {{site.imgurl}}/DFP_Partner_Traditional_Chinese.png
[插页尺寸]: {{site.imgurl}}/插頁尺寸.png

[1]: {{site.baseurl}}/zh-tw/android/download