---
layout:         "web"
title:          "Web - 回傳行動裝置廣告 ID"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/deviceid/
lang:           "zh-tw"
---

# 總覽
---
Vpon Web SDK 提供介面可以讓您將行動裝置廣告 ID 回傳給 Vpon Ad Server，以實現更精準的廣告投放，提高廣告收益。

本文件說明如何透過 Google Ad Manager 提供的 Macro，將行動裝置廣告 ID 回傳給 Vpon Ad Server。

# Step1. 完成 Mobile Ads SDK 串接
---
要透過 Google Ad Manager 提供的 Macro 取得並將行動裝置廣告 ID 回傳給 Vpon，必須在 App 中使用 `Google Mobile Ads SDK` 提供的介面完成廣告串接。

關於 Google Mobile Ads SDK 的串接方式，請參考：[Google Mobile Ads SDK Integration Guide]。

# Step2. 設定 GAM 廣告單元
---
請在您的 [Google Ad Manager 後台]中，依據要展示的廣告類型大小，新增一組廣告單元，並產生代碼類型為`行動應用程式`的廣告代碼，廣告代碼格式為：<span style="color:#228B22">/networkCode/adUnitName</span>，您將使用該組廣告代碼來請求廣告。

![Ad Manager 廣告單元]


# Step3. 設定訂單及委刊項
---
請在您的 [Google Ad Manager 後台]中，依據廣告走期、投放目標等設定新增一組訂單及委刊項，並將前一步驟中新增的廣告單元加入此委刊項中。


# Step4. 設定廣告素材
---
完成委刊項設定後，請新增一組類型為`第三方`的廣告素材，以橫幅廣告為例，請參考以下範例程式碼，將廣告素材填入。


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
>* 請將 License Key 置換為您在 Vpon 後台對應的版位 ID
>* 廣告素材請勿勾選`放送至 SafeFrame`
>* 針對範例中所使用的 Google Ad Manager Macro 說明，請參考：[Google Ad Manager 巨集]



## 相關介面說明
---

| 名稱          | 描述              | 必要    | 說明                      |
|:------------:|:----------------:|:-------:|:-------------------------:|
|ad\_identifier| 行動裝置廣告 ID    | N       | 行動裝置廣告 ID 字串            |
|ad\_id_type   | 行動裝置類型       | N       | iOS 為 idfa，Andorid 為 adid |
|ad\_is_lat    | 限制廣告追蹤設定    | N       | 0: 使用者尚未選擇限制廣告追蹤 <br> 1: 使用者已選擇限制廣告追蹤 |





[Google Mobile Ads SDK Integration Guide]: https://developers.google.com/ad-manager/mobile-ads-sdk/ios/quick-start
[Google Ad Manager 後台]: https://admanager.google.com
[Ad Manager 廣告單元]: {{site.imgurl}}/AppAdManager_01.png
[Google Ad Manager 巨集]: https://support.google.com/admanager/answer/2376981?hl=zh-Hant