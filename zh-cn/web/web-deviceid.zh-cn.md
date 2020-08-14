---
layout:         "web"
title:          "Web - 回传行动装置广告 ID"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/web/deviceid/
lang:           "zh-cn"
---

# 总览
---
Vpon Web SDK 提供介面可以让您将行动装置广告 ID 回传给 Vpon Ad Server，以实现更精准的广告投放，提高广告收益。

本文件说明如何透过 Google Ad Manager 提供的 Macro，将行动装置广告 ID 回传给 Vpon Ad Server。

# Step1. 完成 Mobile Ads SDK 串接
---
要透过 Google Ad Manager 提供的 Macro 取得并将行动装置广告 ID 回传给 Vpon，必须在 App 中使用 `Google Mobile Ads SDK` 提供的介面完成广告串接。

关于 Google Mobile Ads SDK 的串接方式，请参考：[Google Mobile Ads SDK Integration Guide]。

# Step2. 设定 GAM 广告单元
---
请在您的[Google Ad Manager 后台]中，依据要展示的广告类型大小，新增一组广告单元，并产生代码类型为`行动应用程式`的广告代码，广告代码格式为：<span style= "color:#228B22">/networkCode/adUnitName</span>，您将使用该组广告代码来请求广告。

![Ad Manager 广告单元]


# Step3. 设定订单及委刊项
---
请在您的 [Google Ad Manager 后台]中，依据广告走期、投放目标等设定新增一组订单及委刊项，并将前一步骤中新增的广告单元加入此委刊项中。


# Step4. 设定广告素材
---
完成委刊项设定后，请新增一组类型为`第三方`的广告素材，以横幅广告为例，请参考以下范例程式码，将广告素材填入。


```html
<vpon vpon_ad_test="0"
      vpon_ad_licensy_key="License Key"
      vpon_ad_format="300x250_mb"
      debug="true"
      ad_identifier="%%ADVERTISING_IDENTIFIER_PLAIN%%"
      ad_id_type="%%ADVERTISING_IDENTIFIER_TYPE%%"
      ad_is_lat="%%ADVERTISING_IDENTIFIER_IS_LAT%%"></vpon>

<script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"></script>
```

>**Notes:**
>* 请将 License Key 置换为您自己申请的 License Key
>* 广告素材请勿勾选`放送至 SafeFrame`
>* 针对范例中所使用的 Google Ad Manager Macro 说明，请参考： [Google Ad Manager 巨集]



## 相关介面说明
---

| 名称 | 描述 | 必要 | 说明 |
|:------------:|:----------------:|:-------:|:---- ---------------------:|
|ad\_identifier| 行动装置广告 ID | N | 行动装置广告 ID 字串 |
|ad\_id_type | 行动装置类型 | N | iOS 为 idfa，Andorid 为 adid |
|ad\_is_lat | 限制广告追踪设定 | N | 0: 使用者尚未选择限制广告追踪 <br> 1: 使用者已选择限制广告追踪 |



[Google Mobile Ads SDK Integration Guide]: https://developers.google.com/ad-manager/mobile-ads-sdk/ios/quick-start
[Google Ad Manager 后台]: https://admanager.google.com
[Ad Manager 广告单元]: {{site.imgurl}}/AppAdManager_02.png
[Google Ad Manager 巨集]: https://support.google.com/admanager/answer/2376981?hl=zh-Hant