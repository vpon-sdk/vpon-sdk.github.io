---
layout: "ios"
title: "iOS 中介服务 - DFP"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/mediation/dfp/
lang: "zh-cn"
---
# 最新消息
---
根据 Google Ad Manager 公告，将逐步停止使用 Google Ad Manager 广告素材中 SDK 中介服务广告素材的功能，若您想使用 Google Ad Manager 进行 Mediation，请参考[本公告](https://support.google.com/admanager/answer/9020684)，将 SDK 中介服务广告素材转移到收益群组中。

# 概要
---
以下为搭配 Google Ad Manager (原 DoubleClick for Publisher) 进行广告串接的设定方式。在开始进行设定之前，请先参考[串接说明]将 Vpon SDK 加到您的专案中。请注意，要使用 Google Ad Manager 进行广告串接的话，请务必确认您的专案中包含以下三个档案：

1. Google Mobile Ads SDK
2. Vpon SDK
3. Vpon AdMob Adapter

# 广告单元设定
---

## 新增广告单元

首先，请登入您的 [Google Ad Manager 后台]，切换到广告空间下的广告单元标签，请依您要展示的广告类型设定来新增广告单元。

### 横幅广告单元
请参考  [Google Ad Manager 串接说明文件]中提供的尺吋表，并依您想展示的横幅广告大小选择尺吋。

### 插页广告单元
插页式广告单元有四种常见大小，与各装置的实际萤幕大小无关。SDK 会调整广告素材，以便正确呈现在大小稍微不同的萤幕上。

* 手机：320x480 (直向)、480x320 (纵向)
* 平板电脑：768x1024 (直向)、1024x768 (纵向)

您不需特别为纵向模式建立个别的广告单元，只要在指定插页式广告单元的订单项中加入纵向大小 (例如，智慧型手机採 480x320)，然后除了一般的直向大小外，另外加入纵向大小的广告素材。

范例：
![插页尺寸]

## 产生广告代码

新增广告单元后，请选择广告单元，再选择产生广告代码。请选取代码类型为`移动应用`，产生的广告格式代码为：<span style="color:#228B22">/networkCode/adUnitName</span>，请将此代码加到您的专案中。

![Ad Manager 广告单元]

# 订单及委刊项设定
---
如要透过 Google Ad Manager 放送广告活动，请先建立订单，并在订单中建立委刊项。委刊项核准并包含广告素材后，广告才会开始放送。

## 建立委刊单
若要在执行广告空间预测之前建立委刊单，请按照下列指示进行：

1. 在 Google Ad Manager 帐户中，按一下 `订单` 标籤
2. 选择 `新增订单单`
3. 在适当栏位中输入您的订单资讯，不可与联播网中其他的订单名称重複
4. 输入委刊项资讯
5. 选择 `检查广告空间`，确认委刊单拥有足够的曝光供应量
6. 选择 `储存`，建好订单之后，您必须先予以核准，订单中的委刊项才能放送


## 建立委刊项
请参考以下说明建立委刊项：

1. 在 Google Ad Manager 帐户中，点击 `委刊单` 标籤
2. 您可以选择现有的委刊单，或建立新的委刊单
3. 选择`[新增委刊项`
4. 输入委刊项名称，不得与联播网中其他委刊项的名称重複
5. 输入您想要展示的广告素材大小
6. 输入委刊项类型、日期、数量和费用
7. 完成投放相关的定向设定
8. 选取您的目标广告空间

![新增指定目标]

## 上传广告素材
委刊项中需包含至少一个符合目标广告空间大小尺吋的广告素材，广告才可以放送

1. 选择要新增广告素材的委刊项，或视需求建立新委刊项
2. 选择 `新增广告素材`，请选择要新增的广告素材尺吋
3. 您可以将多个广告素材拖曳到委刊项，或一次只加入一个广告素材

## 新增广告素材
选取广告素材类型: 选取`行动应用程式`中的`SDK 中介服务广告素材`

![广告素材类型]

### 广告素材设定
依次填入名称：

1. Select Network：`Vpon`
2. Zone：`TW`
3. Vpon Ad ID：向 Vpon 申请的 `License Key`<br>

范例：
![DFP Partner Traditional Chinese.png]

# Tips
---

### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]


[串接说明]: ../../integration-guide
[Sample Code]: {{site.baseurl}}/zh-cn/ios/download/#dfp
[Google Ad Manager 后台]: https://admanager.google.com/
[Google Ad Manager 串接说明文件]: https://developers.google.com/ad-manager/mobile-ads-sdk/ios/banner#banner_sizes
[Ad Manager 广告单元]: {{site.imgurl}}/AppAdManager_02.png
[DFP 广告空间]: {{site.imgurl}}/UnitAdSetting_Sim.png
[新增指定目标]: {{site.imgurl}}/新增指定目标.png
[广告素材类型]: {{site.imgurl}}/广告素材类型.png
[Warning]: {{site.imgurl}}/Warning.png
[DFP Partner Traditional Chinese.png]: {{site.imgurl}}/DFP_Partner_Traditional_Chinese.png
[插页尺寸]: {{site.imgurl}}/插頁尺寸.png
