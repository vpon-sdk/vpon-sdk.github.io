---
layout:         "web"
title:          "Web - 回傳內容資訊"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/content-data/
lang:           "zh-tw"
---

# 總覽
---
Vpon Web SDK 提供介面可以讓您將自定義的內容資訊回傳給 Vpon Ad Server，以實現更精準的廣告投放，提高廣告收益。

本文件說明如何透過 Google Ad Manager 提供的 Macro，將自定義的鍵值回傳給 Vpon Ad Server。

# Step1. 完成 Google Publisher Tag 的設置
---
請先在 [Google Ad Manager 後台]為您的廣告單元指定鍵值，並產生如以下 Sample 的廣告代碼：

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

# Step2. 設定訂單及委刊項
---
請在您的 [Google Ad Manager 後台]中，依據廣告走期、投放目標等設定新增一組訂單及委刊項，並將前一步驟中新增的廣告單元加入此委刊項中。


# Step3. 設定廣告素材
---
完成委刊項設定後，請新增一組類型為`第三方`的廣告素材，以橫幅廣告為例，請參考以下範例程式碼，將廣告素材填入。


```html
<vpon vpon_ad_test='0'
      vpon_ad_licensy_key='License Key'
      vpon_ad_format='300x250_mb'
      debug='true'
      vpon_content_data ='%%PATTERN:TARGETINGMAP%%'></vpon>

<script type="text/javascript" src="https://m.vpon.com/sdk/vpadn-sdk.js"></script>
```

>**Notes:** 
>* 請將 License Key 置換為您在 Vpon 後台對應的版位 ID
>* 廣告素材請勿勾選`放送至 SafeFrame`
>* 針對範例中所使用的 Google Ad Manager Macro 說明，請參考：[Google Ad Manager 巨集]



## 相關介面說明
---

| 名稱          | 描述              | 必要    | 說明                      |
|:------------:|:----------------:|:-------:|:-------------------------:|
|vpon\_content\_data| 自定義回傳資訊    | N       | JSON 格式的資訊           |






[Google Mobile Ads SDK Integration Guide]: https://developers.google.com/ad-manager/mobile-ads-sdk/ios/quick-start
[Google Ad Manager 後台]: https://admanager.google.com
[Ad Manager 廣告單元]: {{site.imgurl}}/AppAdManager_01.png
[Google Ad Manager 巨集]: https://support.google.com/admanager/answer/2376981?hl=zh-Hant