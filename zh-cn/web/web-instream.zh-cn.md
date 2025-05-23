---
layout:         "web"
title:          "Web - In-stream 影音广告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/web/instream/
lang:           "zh-cn"
---
# 概要
---
Vpon 提供 In-stream 影音广告，只要您的 App 中有支援 VAST / VPAID 格式的影音播放器，即可透过 Vpon In-stream 影音广告进行流量变现。

# 完成串接准备 {#prerequisites}
---
在开始串接 Vpon In-stream 影音广告前，需要进行以下准备：

1. 联系 [Vpon PDMKT Team] 完成帐号设定，并取得您的 License Key
2. 准备一个支援 VAST / VPAID 格式的影音播放器 <br> 
   (我们建议您可以使用 [Google IMA SDK] 来建立您的影音播放器)
3. 联系 [Vpon PDMKT Team]，取得广告请求 URL

# 开始串接
---
串接 Vpon In-stream 影音广告不需要再额外使用其它的 Vpon SDK。如果您选择使用 [Google IMA SDK] 来建立您的影音播放器，我们建议您使用 Google Ad Manager 来管理您的广告请求。

以下说明将会引导您完成在 Google Ad Manager 上的 In-stream 影音广告设定。在您[完成串接准备]后，需要在您的 Google Ad Manager 完成以下设定：

1. 新增影音广告单元
2. 新增影音广告委刊项
3. 新增影音广告素材

> **Note**：此外，您也可以使用 `S2S` 的方式直接向 Vpon 请求 In-stream 影音广告。关于 S2S 的串接方式，请参考 [Advanced Setting]。

## 新增影音广告单元
---
首先，您需要在您的 Google Ad Manager 后台新增影音广告单元。

请由 [广告资源]→[广告单元] 并选择新建广告单元。请先输入不重覆的广告单元代码，点击下图红框处的`视频(VAST) 大小`，展开影音广告单元的选项，依照您需要的广告单元大小选择尺吋。
<img src="{{site.imgurl}}/instream_29.png" alt="" class="width-600"/>
建立广告单元后，需要生成一组用来请求广告的广告代码。点击`生成代码`
<img src="{{site.imgurl}}/instream_30.png" alt="" class="width-600"/>
选择`适用于视频广告的 Google 发布商代码`
<img src="{{site.imgurl}}/instream_31.png" alt="" class="width-600"/>
选取代码选项。如果您的影片是直播形式的话，请勾选「启用实时限流功能」
<img src="{{site.imgurl}}/instream_32.png" alt="" class="width-600"/>
完成广告代码参数的编辑。说明网址为必填项目，请输入您放置影音播放器的页面网址
<img src="{{site.imgurl}}/instream_33.png" alt="" class="width-600"/>
选择「继续」，即会产生广告代码。请将广告代码加入您的 App Project 中，您将使用这组广告代码来请求 In-stream 影音广告
<img src="{{site.imgurl}}/instream_34.png" alt="" class="width-600"/>

## 新增影音广告订单项
---
取得广告代码后，您需要新增广告委刊项，并将影音广告单元加入委刊项中。

请由 [投放]→[订单] 建立订单，输入订单名称、广告客户
<img src="{{site.imgurl}}/instream_35.png" alt="" class="width-600"/>
接着进行订单项的设定，输入订单项名称，广告空间大小请选择`视频 VAST`，并依广告单元大小选择广告空间大小
<img src="{{site.imgurl}}/instream_36.png" alt="" class="width-600"/>
您需要针对订单项进行广告活动起始时间的设定，请依您的需求完成设定。此外，您也可以选择性的调整您需要的广告投放方式
<img src="{{site.imgurl}}/instream_37.png" alt="" class="width-600"/>
最后您需要指定广告定位，系统会依照您在前面设定过的广告空间大小筛选出节合要求的广告单元，请选择您要放送广告的广告单元
<img src="{{site.imgurl}}/instream_38.png" alt="" class="width-600"/>
完成后，请储存您的设定。建立订单及订单项后，您需要`批准`订单并在订单项中加入广告素材，广告才会开始投放
<img src="{{site.imgurl}}/instream_39.png" alt="" class="width-600"/>

## 新增影音广告素材
---
完成订单项设定后，您需要在订单项中加入广告素材。请由您的影音广告订单项点击新增广告素材集，您可以选择新增新的广告素材集，或是使用现有广告素材集
<img src="{{site.imgurl}}/instream_40.png" alt="" class="width-600"/>
选择新的广告素材集，输入广告素材名称后，选择广告素材类型为`重定向`
<img src="{{site.imgurl}}/instream_41.png" alt="" class="width-600"/>
请在 VAST 广告代码网址的栏位填入 Vpon 提供您的广告请求网址，並输入您希望取得的广告素材长度，例：30、60。当包含 Vpon 广告素材集的订单项被选中后，将会向这个网址请求符合条件的广告。
<img src="{{site.imgurl}}/instream_42.png" alt="" class="width-600"/>
完成以上设定后，储存您的设定即可。

## Fallback Setting {#fallback}
---
由于 Vpon In-stream Video Ad 是采用重定向 (redirect) 的方式投放，您可以透过 Google Ad Manager 的`视频后备广告`功能，尽可能让每一次的广告请求都有广告曝光。关于影片备用广告功能的说明，请参考：[视频后备广告总览]。

### 启用视频后备广告功能
请由 [管理]→[影片广告] 中，开启`视频后备广告`的功能。
<img src="{{site.imgurl}}/instream_fallback_02.png" alt="" class="width-600"/>

当您同时将多个委刊项指向同一个广告单元时，Google Ad Manager 会依照您设定的优先顺序进行广告投放。在您启用`视频后备广告`功能后，当您透过 Google Ad Manager 送出的广告请求没有回应或是请求失败时，Google Ad Manager 会自动向下一个顺位的委刊项请求广告。

# Advanced Setting {#s2s}
---
除了透过 Google Ad Manager 的方式来串接 In-stream 影音广告外，Vpon 也提供以 S2S 方式来串接。只要[完成串接准备]，并参考 [Vpon In-stream Video Ad Guideline] 的参数说明完成您的广告请求网址，便可以直接向 Vpon 请求 In-stream 影音广告了。



[Vpon PDMKT Team]: mailto:partner.service@vpon.com
[Google IMA SDK]: https://developers.google.com/interactive-media-ads/docs/sdks/html5/
[完成串接准备]: {{site.baseurl}}/zh-cn/web/instream/#prerequisites
[Advanced Setting]: {{site.baseurl}}/zh-cn/web/instream/#s2s
[Vpon In-stream Video Ad Guideline]: {{site.dnldurl}}/Vpon_In_stream_Video_Ad_Guideline.pdf
[视频后备广告总览]: https://support.google.com/admanager/answer/3007370?hl=zh-Hans