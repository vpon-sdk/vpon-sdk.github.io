---
layout: "ios"
title: "iOS 中介服务 - DFP"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/mediation/dfp/
lang: "zh-cn"
---
本页专为 DFP 使用者而设，主要说明 DoubleClick 联播网搭配 Google AdMob 广告 SDK 的方式。请先从[串接说明]看起，熟悉文件后，再回来参考本页，瞭解如何同时执行 SDK 和 DFP。

使用 AdMob 或 DFP 串接时，请务必将两个 lib 档都要加入到您的专案内([下载][1])

1. Fundamental SDK  or  Framework SDK
2. Adapter SDK


# DFP 广告单元编号
---
DFP 使用者必须指定「DFP 广告单元编号」，而不是「AdMob 发佈商编号」，这样 Google AdMob 广告 SDK 才知道要使用 DoubleClick 联播网，而不是 AdMob 联播网。DFP 广告单元编号的格式像这样：<span style="color:#228B22">/networkCode/adUnitName。</span>


## 设定广告单元
在 DFP 使用者介面中([Here])：

1. 新增广告空间
2. 在广告单元中设定名称、 大小、目标视窗后储存
3. 产生广告代码 (选取行动应用装置)

![DFP 广告空间]

## 设定委刊单、委刊项及广告素材
如要透过「DFP 广告管理系统标准版」放送新的广告活动，请先建立新委刊单。建好委刊单后，您还必须建立委刊项、新增广告素材以及核准委刊单，委刊单广告才能放送。针对保留的委刊项类型 (贊助和标准)，在委刊单获得核准以前，DFP 不会保留广告空间。<br><br>

## 建立委刊单
若要在执行广告空间预测之前建立委刊单，请按照下列指示进行：

1. 在「DFP 广告管理系统标准版」帐户中，按一下 `委刊单` 标籤。

2. 按一下 `新增委刊单`。

3. 在适当栏位中输入您的委刊单资讯。
   不可与联播网中其他的委刊单名称重複。

4. 输入委刊项资讯。

5. 按一下 `检查广告空间`，确认委刊单拥有足够的曝光供应量。
![Warning]

6. 按一下 `储存`。
    建好委刊单之后，您必须先予以核准，委刊项才能放送。
<br><br>

## 委刊项资讯
如何建立委刊项：

1. 在 DFP 广告管理系统标准版帐户中，按一下 `委刊单` 标籤。

2. 建立新委刊单，或按一下表格中的现有委刊单。

3. 按一下 [新增委刊项]。

4. 输入委刊项名称，不得与联播网中其他委刊项的名称重複。

5. 输入您想要上传广告素材的广告空间大小。

6. (选用程序) 输入任何有助于委刊项投放作业的相关注释。

7. 输入委刊项类型、日期、数量和费用。

8. (选用程序) 在 `调整放送` 下方进行放送设定。

9. 选取您的目标广告空间。

您可以指定广告单元、刊登位置或同时指定两者。如要寻找要指定的广告空间，可以逐步浏览联播网的广告空间或是执行搜寻。

广告单元会沿用您的联播网名称，代表您联播网中所有的广告单元。如果您为委刊项指定这个联播网层级的广告单元，委刊项将指定联播网中的任何广告单元。<br>
<br>范例：<br>
![新增指定目标]
10. (选用程序) 输入其他指定条件，指定特定目标对象。如果您未将委刊项指定给任何广告单元或刊登位置，系统会将委刊项设成在全联播网随机放送。这表示委刊项可在您网站上的任何广告单元中放送。按一下 [储存]。<br><br>

## 上传广告素材
1. 按一下要新增广告素材的委刊项。您也可以视需求建立新委刊项。

2. 按一下 `新增广告素材`。所有与委刊项相关联的广告素材和广告单元尺寸，都会列在左栏中。您可以将广告素材上传至清单中任何大小的广告单元。

3. 您可以将多个广告素材拖曳到委刊项，或一次只加入一个广告素材<br><br>

### 只加入一个广告素材
选取广告素材类型: 选取`行动应用程式`中的`SDK 中介服务广告素材`<br>
![广告素材类型]

### 广告素材设定
依次填入名称：

1. Select Network：`Vpon`
2. Zone：`TW` 或 `CN`
3. Vpon Ad ID：向 Vpon 申请的 `License key`<br>

范例：
![DFP Partner Traditional Chinese.png]



# 横幅/插页式广告单元
---

## 横幅广告单元
文章前面篇幅皆讨论横幅的广告单元，尺寸设定值为 320x50

## 插页广告单元
您可以在 DFP 中建立广告单元，做为插页式广告单元。插页式广告单元有四种常见大小，与各装置的实际萤幕大小无关。SDK 会调整广告素材，以便正确呈现在大小稍微不同的萤幕上。

* 手机：320x480 (直向)、480x320 (纵向)
* 平板电脑：768x1024 (直向)、1024x768 (纵向)

您不需特别为纵向模式建立个别的广告单元，只要在指定插页式广告单元的订单项中加入纵向大小 (例如，智慧型手机採 480x320)，然后除了一般的直向大小外，另外加入纵向大小的广告素材。

范例：
![插页尺寸]






# 其它诀窍
---
[DFP Small Business](https://support.google.com/dfp_sb/)<br>
[Google Developers DFP Banner Ads](https://developers.google.com/mobile-ads-sdk/docs/dfp/fundamentals#ios)<br>
[Google Developers Interstitial Ads](https://developers.google.com/mobile-ads-sdk/docs/ios/doubleclick/#support)

# Sample Code 下载
---
 [前往下载][1]


[串接说明]: ../../integration-guide
[1]: {{site.baseurl}}/zh-cn/ios/download/#dfp
[Here]: https://www.google.com/dfp/
[DFP 广告空间]: {{site.imgurl}}/UnitAdSetting_Sim.png
[新增指定目标]: {{site.imgurl}}/新增指定目标.png
[广告素材类型]: {{site.imgurl}}/广告素材类型.png
[Warning]: {{site.imgurl}}/Warning.png
[DFP Partner Traditional Chinese.png]: {{site.imgurl}}/DFP_Partner_Traditional_Chinese.png
[插页尺寸]: {{site.imgurl}}/插頁尺寸.png
