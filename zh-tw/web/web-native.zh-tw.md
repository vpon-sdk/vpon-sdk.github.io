---
layout:         "web"
title:          "Web - 原生廣告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/native/
lang:           "zh-tw"
---

# 總覽
---
Vpon Mobile Web SDK 提供`原生廣告`。有別於橫幅廣告、插頁廣告會直接提供可立即呈現的廣告內容，Vpon 提供了三種包含標題、圖像等廣告內容的原生廣告組合，您可以自訂 `CSS` 樣式，將廣告內容打造成符合您網頁內容的風格，讓您以最自然的方式呈現廣告。 <br>

> **Note**：
>此廣告形式僅支援<strong>`行動裝置`</strong>，使用者透過 PC 瀏覽該網站則廣告不會顯示！


# 嵌入廣告程式碼
---
在行動網頁的 <body> 中填入 \<vpon\> tag，當 \<vpon\> tag 中的屬性 `vpon_ad_format` 為 `na` 時，會請求原生廣告。<br>
<br>
在網頁 <body> 內欲顯示廣告的位置加上以下程式碼：

```html
<body>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="License Key"
        vpon_ad_format="na"
        vpon_na_layout="0"
        vpon_na_min="1200x627"
        debug="true"></vpon>
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
</body>
```
> **Note**:
>
>* Vpon Web SDK 支援 `HTTP` & `HTTPS`，在將 SDK 檔案引入時請如範例所示使用 `//m.vpon.com/sdk/vpadn-sdk.js` 讓瀏覽器在載入頁面時可依照當前頁面自動判斷並引用適當資源，每個頁面只需引入一次，必須加在 </body> 前。
>
>* 您可以利用 vpon_na_min 的參數指定廣告圖片尺吋，如不指定，系統會依使用者的螢幕尺吋回傳相應大小的圖片。 vpon_na_min 的參數選擇，請參考 [Advanced Setup]。
>
>* 存檔後，重新讀取網頁，您就可以在有 \<vpon\> tag 的位置看到 `測試廣告` 被拉取。
>
>* 如要將網站正式上線，請將 vpon_ad_test 的參數改為 `"0"` 以拉取正式廣告。

<br>

## 原生廣告版型 {#layout}
---
Vpon Mobile Web SDK 提供三種原生廣告版型，只要將 \<vpon\> tag 中的 `vpon_na_layout` 參數改為您選擇要使用的版型，即會回傳相對應的廣告素材，您可以透過 `CSS`控制這些廣告素材呈現的樣式。<br><br>關於廣告素材的顯示規範，請參考[Native Ad Spec]。

![Web_Native_Layout]



## Callback {#callback}
---
Vpon Mobile Web SDK 提供沒有廣告回傳時的 Callback Function，讓您能在沒有廣告回傳時，仍可以有效利用流量。

```html
<body>
...
  <vpon vpon_ad_test="0"
        vpon_ad_licensy_key="License Key"
        vpon_ad_format="na"
        vpon_na_layout="0"
        vpon_na_min="1200x627"
        debug="true"
        ad_request_callback="vponCallBackMethod"></vpon>
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
  <script>
        function vponCallBackMethod(adStatus) {
          if (adStatus != 0) {
            // 沒有廣告回傳，執行其它操作
          } else {
            // 有廣告回傳
          }
        }
  </script>
...
</body>
```
<br>

## Advanced Setup {#advanced}
---

| 名稱                  | 描述                                     | 必要    | 說明                      |
|:--------------------:|:---------------------------------------:|:-------:|:-------------------------:|
|vpon\_ad\_licensy\_key| 廣告版位 ID                                  | Y       | <font color="red">輸入 Vpon License Key</font>|
|vpon\_ad\_format      | 原生廣告格式<br>na                        | Y       | "na"
|vpon\_ad\_test        | 是否拉取測試廣告                           | N       | 1(是)/0(否)<br>預設為 "1"
|vpon\_na\_layout      | 原生廣告版型                              | N       | 請參考[原生廣告版型]<br>預設為"0"
|vpon\_na\_min         | Main Image 尺吋<br>(1) 1200x627<br>(2) 627x627 | N       | "1200x627"
|debug                 | 是否在 console 顯示 debug 資訊             | N       | true/false<br>預設為 "false"
|openTab               | 是否開啓新 tab 顯示 廣告內容                | N       | true/false<br>預設為 "true"
|ad\_request\_callback | 沒有廣告回傳時的 Callback Function         | N       | 請參考 [Callback]

<br>

## Navive Ad Spec {#nativeAdSpec}
--------
系統會根據您選擇的原生廣告版型回傳對應的原生廣告素材，下表`紅字`表示您必須顯示的原生廣告元件。

Properties   |Class Name   | Description
:-----------:|:-----------:|:-----------:|
<font color="red">Title</font> | vpon-title | 原生廣告標題文字，文字內容需清晰可見<br> 最長為30個英文字或15個中文字
:-----------:|:-----------:|:-----------:|
<font color="red">Main Image</font> | vpon-cover-image| 1200 x 627px <br> 627 x 627px<br> (可等比例縮放，或裁切為16:9、4:3)
:-----------:|:-----------:|:-----------:|
<font color="red">AD Badge</font> | vpon-attribution | 讓使用者了解此為廣告 <br> (例如：贊助商名稱、贊助、廣告等等)<br> 最長為15個英文字或8個中文字
:-----------:|:-----------:|:-----------:|
Icon  | vpon-icon-image| 128 x 128px<br> (可等比例縮放，不可變形，不可裁切)
:-----------:|:-----------:|:-----------:|
Description  | vpon-body-text| 原生廣告內容文字，文字內容需清晰可見 <br> 最長為100個英文字或50個中文字
:-----------:|:-----------:|:-----------:|
CallToAction | vpon-action| 需要完整顯示 <br> 最長為20個英文字或10個中文字
:-----------:|:-----------:|:-----------:|


<br>

# 結果
---
<img src="{{site.imgurl}}/Web_Native_Sample.png" alt="" class="width-300"/>

# 範例網頁
---

```html
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>Vpon Native Ad</title>
  <!-- Native Ad Style -->
  <style>
      .vpon-native-ad{
        border: 1px solid #dcdcdc;
        position: relative;
      }

      .vpon-native-ad .vpon-title{
        display: block;
        padding: 5px;
        font-size: 20px;

      }

      .vpon-native-ad .vpon-cover-image{
        float: left;
        width: 33%;
        margin: 10px;
      }
      .vpon-native-ad .vpon-cover-image img{
        width: 100%;
      }

      .vpon-native-ad .vpon-icon-image{
      }

      .vpon-native-ad .vpon-body-text{
        font-size: 14px;
      }

      .vpon-native-ad .vpon-action{
        display: none;   
      }

      .vpon-native-ad .vpon-attribution{
        position: absolute;
        color: #9a9a9a;
        right: 5px;
        bottom: 5px;
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="License Key"
            vpon_ad_format="na"
            vpon_na_layout="0"
            vpon_na_min="1200x627"
            debug="true"></vpon>
    </div>

    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
</html>
```

> **Note**:
>
> 1. 若將 Vpon 廣告嵌入在 iframe 內，請記得調整 iframe 到適當大小，以符合 Vpon 廣告的長寬。
> 2. 以上的 License Key 為範例，請置換為您自己申請的 License Key 以免無法取得收益分潤。

<br>

# FAQ
---

## 仍然看不到廣告？
請確認以下項目：

* 請試著用行動裝置上的瀏覽器開啟網站。
* 先清除瀏覽器快取並刪除 Cookie，然後重新連線到網站。

## 仍然無法解決？
請將 debug 模式打開，重新載入網站，並將 "Vpadn-" 開頭的訊息截取下來並且聯繫 [Vpon FAE]

[原生廣告版型]: {{site.baseurl}}/zh-tw/web/native/#layout
[Advanced Setup]: {{site.baseurl}}/zh-tw/web/native/#advanced
[Callback]: {{site.baseurl}}/zh-tw/web/native/#callback
[Web_Native_Layout]: {{site.imgurl}}/Web_Native_Layout.png
[Native Ad Spec]: {{site.baseurl}}/zh-tw/web/native/#nativeAdSpec
[Vpon FAE]: mailto:fae@vpon.com
