---
layout:         "web"
title:          "Web - 插頁廣告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/interstitial/
lang:           "zh-tw"
---

# 總覽
---
Vpon Mobile Web SDK 提供`插頁廣告`，插頁式廣告是互動式多媒體 HTML5 或「網路應用程式」，在應用程式的正常轉換點顯示 (例如啟動、影片播放前或遊戲關卡載入時)。網路應用程式使用上就像在應用程式內瀏覽一樣，只有簡單的關閉按鈕，而沒有任何導覽列，因為導覽配置就包含在內容本身。<br>

> **Note**:
>此廣告僅支援<strong> `行動裝置 `</strong>，使用者透過 PC 瀏覽該網站則廣告不會顯示！
<br>


# 嵌入廣告程式碼
---
在行動網頁的 <body> 中填入 \<vpon\> tag，與橫幅廣告不同點在於當 \<vpon\> tag 中的屬性 `vpon_ad_format` 為 `mi`時，會去請求插頁式廣告呈現。<br>
在網頁 <body> 內預放廣告的位置加上以下程式碼：

```html
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your Interstitial ID"
            vpon_ad_format="mi"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```
> **Note**:

>* Vpon Web SDK 支援 `HTTP` & `HTTPS`，在將 SDK 檔案引入時請如上使用 `//m.vpon.com/sdk/vpadn-sdk.js` 讓瀏覽器在載入頁面時可依照當前頁面自動判斷並引用適當資源。
>
>* 同一網頁最多嵌入 1 個插頁廣告 (如上例)。
>
>* JavaScript 只需要放置一個，並且必須加在 </body>前。
>
>* 完成存檔後，重新讀取網頁，您就可以在有 \<vpon\> tag 的位置看到 `測試廣告` 被拉取。(如要上線請改成不拉取測試廣告 vpon_ad_test="0")
>
>* 以上的 License Key 為範例，請置換為您自己申請的 License Key 以防收益分潤無法取得。
>
>* 倘若嵌入在 iframe 內，必須確保該 iframe 是滿版的蓋在網頁上，包含寬高皆為 100 % 等等，以及點擊關閉時需處理將該 iframe 收起等事宜。

<br>


## Advanced Setup
---

名稱                  |        描述                      | 必要  |  範例
:--------------------:|:---------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| 版位 ID                               |  Y         |<font color="red">輸入 Vpon License Key</font>
vpon\_ad\_format      | 廣告版行：320x50\_mb, 300x250\_mb            |   Y       |     "mi"
vpon\_ad\_test        |   是否拉取測試廣告                        | N          |   1(是)/0(否)，預設為(是)
vpon\_ad\_isBottom    |   是否為置底橫幅廣告                        | N          |   true/false，預設為 false
debug                 | 是否在 console 顯示 debug 資訊          |  N         |   true/false，預設為 false
openTab               |是否開啓新tab 顯示 廣告內容                 |N           |  true/false，預設為 true


<br>

# 結果
---
<img src="{{site.imgurl}}/Web-Interstitial-1.png" alt="" class="width-300"/>


# FAQ
---

## 仍然看不到廣告？
請確認以下項目：

* 請試著用行動裝置上的瀏覽器開啟網站。

* 先清除瀏覽器快取並刪除 Cookie，然後重新連線到網站。

## 仍然無法解決？
請將 debug 模式打開，重新連線網站，將 "Vpadn-" 開頭的訊息截取下來並且聯繫 [Vpon FAE]

[Vpon FAE]: mailto:fae@vpon.com
