---
layout:         "web"
title:          "Web - 插頁廣告"
lead:           "Custom z-index Value"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/interstitial-custzindex/
lang:           "zh-tw"
---
# 總覽
---
本篇主要說明如何自定義 Vpon Web SDK 插頁廣告的 z-index 值。如果您發現您網站上的某些元件會在展示插頁廣告時擋住廣告，請參考本篇說明調整 Vpon 插頁廣告的 z-index 值，避免影響網站的使用者體驗及您的廣告收益。

# Custom z-index Value
---
Vpon Web SDK 提供 `use_custom_z_index` 參數，用來自定義 Vpon 插頁廣告的 z-index 值。請參考以下範例，在 Vpon 廣告程式碼中加入 `use_custom_z_index`：

```html
<body>
...
  <vpon vpon_ad_test="0"
        vpon_ad_licensy_key="License Key"
        vpon_ad_format="mi"
        debug="true"
        use_custom_z_index="100001"></vpon>
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
</body>
```

> **Note**:
>* `use_custom_z_index` 預設值為 100000，請依您的實際需求調整 z-index 的值。


---
[Web - 插頁廣告]:http://wiki.vpon.com/zh-tw/web/interstitial/