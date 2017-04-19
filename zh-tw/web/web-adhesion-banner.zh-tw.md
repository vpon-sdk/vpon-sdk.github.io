---
layout:         "default"
title:          "Web - 置底橫幅廣告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/adhesion-banner/
lang:           "zh-tw"
---

# 總覽
---
Vpon Mobile Web SDK 提供`置底橫幅廣告`，讓橫幅廣告可黏著於行動裝置的螢幕下方，讓我們精準投放的廣告更能讓使用者觀看，以提升廣告收益。<br>
<font color="red">**Note**：此廣告僅支援<strong>行動裝置</strong>，使用者透過 PC 瀏覽該網站則廣告不會顯示！</font>
<br>

# 需求條件
---

1. HTML 基本觀念
2. 註冊，申請，並取得 Vpon Mobile Web 版位 ID
3. 修改行動網站程式碼的權限

<br>

# 廣告格式
---
現在的 Vpon Mobile Web SDK 支援以下`置底廣告格式`:<br>

| 名稱             |    Size(WxH)  |
| :---------------- | :------------:|
| Banner            |    320x50     |

<br>

# 嵌入廣告程式碼
---
與一般 Web Banner 相似，同樣在行動網頁的 <body> 中填入 \<vpon\> tag，唯一不同點在於當 \<vpon\> tag 中包含了 `vpon_ad_isBottom` 的屬性且其為 true 時，可自動將該廣告黏著於行動裝置的螢幕下方。<br>
在網頁 <body> 內預放廣告的位置加上以下程式碼：

```html
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your Banner ID"
            vpon_ad_format="320x50_mb"
            debug="true"></vpon>
    </div>
    </br>
    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="your_first_vpon_banner_id"
            vpon_ad_format="320x50_mb"
            vpon_ad_isBottom="true"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```
> **Note**:

>* 同一網頁最多嵌入 1 個置底廣告版面 (如上例)。包含置底廣告與一般橫幅廣告，同一網頁最多嵌入 3 個廣告版面 (如上例)，每個版面請用不同版位 ID。
>
>* JavaScript 只需要放置一個，並且必須加在 </body>前。
>
>* 完成存檔後，重新讀取網頁，您就可以在有 \<vpon\> tag 的位置看到 `測試廣告` 被拉取。(如要上線請改成不拉取測試廣告 vpon_ad_test="0")
>
>* Adhesion Ad 倘若嵌入在 iframe 內，將會失去自動黏著於行動裝置的螢幕下方的功能。
>
>* 以上的 License Key 為範例，請置換為您自己申請的 License Key 以防收益分潤無法取得。
<br>
<br>

# 結果
---
<img src="{{site.imgurl}}/Adhesion-Banner-1.png" alt="" class="width-300"/>


# FAQ
---

## 仍然看不到廣告？
請確認以下項目：

* 請試著用行動裝置上的瀏覽器開啟網站。

* 先清除瀏覽器快取並刪除 Cookie，然後重新連線到網站。

## 仍然無法解決？
請將 debug 模式打開，重新連線網站，將 "Vpadn-" 開頭的訊息截取下來並且聯繫 [Vpon FAE]

[Vpon FAE]: mailto:fae@vpon.com
