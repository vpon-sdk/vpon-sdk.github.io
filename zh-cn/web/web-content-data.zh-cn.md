---
layout:         "web"
title:          "Web - 回传内容资讯"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/web/content-data/
lang:           "zh-cn"
---

# 总览
---
Vpon Web SDK 提供介面可以让您将自定义的内容资讯回传给 Vpon Ad Server，以实现更精准的广告投放，提高广告收益。

本文件说明如何透过 Google Ad Manager 提供的 Macro，将自定义的键值回传给 Vpon Ad Server。


# Step1. 完成 Google Publisher Tag 的设置
---
请先在 [Google Ad Manager 后台]为您的广告单元指定键值，并产生如以下 Sample 的广告代码：

```javascript
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script>
      window.googletag = window.googletag || {cmd: []};
      googletag.cmd.push(function() {
        googletag.defineSlot('/Publisher ID/Ad Unit ID', [300, 250], 'div-gpt-ad-1604460699018-0').addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.pubads().setTargeting('g', ['male']);
        googletag.enableServices();
      });
</script>
```

# Step2. 设定订单及委刊项
---
请在您的 [Google Ad Manager 后台]中，依据广告走期、投放目标等设定新增一组订单及委刊项，并将前一步骤中新增的广告单元加入此委刊项中。


# Step3. 设定广告素材
---
完成委刊项设定后，请新增一组类型为`第三方`的广告素材，以横幅广告为例，请参考以下范例程式码，将广告素材填入。


```html
<vpon vpon_ad_test='0'
      vpon_ad_licensy_key='License Key'
      vpon_ad_format='300x250_mb'
      debug='true'
      vpon_content_data ='%%PATTERN:TARGETINGMAP%%'></vpon>

<script type="text/javascript" src="https://m.vpon.com/sdk/vpadn-sdk.js"></script>
```

>**Notes:**
>* 请将 License Key 置换为您在 Vpon 后台对应的版位 ID
>* 广告素材请勿勾选`放送至 SafeFrame`
>* 针对范例中所使用的 Google Ad Manager Macro 说明，请参考： [Google Ad Manager 巨集]



## 相关介面说明
---

| 名称 | 描述 | 必要 | 说明 |
|:------------:|:----------------:|:-------:|:---- ---------------------:|
|vpon\_content\_data| 自定义回传资讯 | N | JSON 格式的资讯 |



[Google Mobile Ads SDK Integration Guide]: https://developers.google.com/ad-manager/mobile-ads-sdk/ios/quick-start
[Google Ad Manager 后台]: https://admanager.google.com
[Ad Manager 广告单元]: {{site.imgurl}}/AppAdManager_02.png
[Google Ad Manager 巨集]: https://support.google.com/admanager/answer/2376981?hl=zh-Hant