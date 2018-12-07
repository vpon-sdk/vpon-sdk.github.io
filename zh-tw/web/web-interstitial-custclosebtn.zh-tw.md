---
layout:         "web"
title:          "Web - 插頁廣告"
lead:           "Custom Close Button"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/interstitial-custclosebtn/
lang:           "zh-tw"
---
# 總覽
---
本篇主要說明如何自定義是否啟用 Vpon Web SDK 提供的插頁廣告 Close Button，如果您的網站會在展示插頁廣告時自行加上 Close Button，請參考本篇說明，關閉 Vpon 插頁廣告的 Close Button，避免影響網站的使用者體驗。

如果您的網站不會在展示插頁廣告時自行加上 Close Button，請參考 [Web - 插頁廣告]完成插頁廣告設定即可。

# Custom Close Button
---
Vpon Web SDK 提供 `use_custom_close` 及 `use_custom_close_id` 參數，用來自定義是否顯示 Vpon 插頁廣告預設展示的 Close Button。

如果您不想在您的網站上出現 Vpon 插頁廣告的 Close Button (而是使用您自定義的 Close Button)，請參考以下範例，在 Vpon 廣告程式碼中加入 `use_custom_close` 及 `use_custom_close_id` 參數，並在參數內容中加入您加入自定義 Close Button 的方法：

```html
<head>
    ...
    <!-- Custom Close Button -->
    <link href="css/common.css" rel="stylesheet" type="text/css">
    <script src="lib/jquery.min.js"></script>
    <script>
    // Custom Close Button Function
    function vponCustCloseCallBack(){
      document.getElementById("ad_iframe_btn_close").addEventListener('click', function(){
          $("#ad_iframe_area").remove();
          $("#ad_iframe_background").remove();
      });
    }
    </script>
    ...
</head>
<body>
...
  <vpon vpon_ad_test="0"
        vpon_ad_licensy_key="License Key"
        vpon_ad_format="mi"
        debug="true"
        use_custom_close="vponCustCloseCallBack"
        use_custom_close_id="ad_iframe_btn_close"></vpon>
        <!-- use_custom_close 的參數內容請填入您自定義 Close Button 對應的 js function -->
        <!-- use_custom_close_id 的參數內容請填入您自定義 Close Button 的 ID -->
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
</body>
```

> **Note**:
>
>* `use_custom_close` 的參數內容請填入您自定義 Close Button 對應的 js function
>
>* `use_custom_close_id` 的參數內容請填入您自定義 Close Button 的 ID

# Tips
---
關於 Custom Close Button 的插頁廣告串接實例，請參考我們的 [Sample Code]。


[Web - 插頁廣告]:http://wiki.vpon.com/zh-tw/web/interstitial/
[Sample Code]:{{site.dnldurl}}/Web_IS_CloseBtn_Demo.zip