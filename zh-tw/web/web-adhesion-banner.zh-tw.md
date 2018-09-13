---
layout:         "web"
title:          "Web - 置頂/置底橫幅廣告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/adhesion-banner/
lang:           "zh-tw"
---

# 總覽
---
Vpon Mobile Web SDK 提供`置頂/置底橫幅廣告`，讓橫幅廣告可固定於行動裝置的螢幕下方，提高使用者觀看廣告的機率，以提升廣告收益。<br>

> **Note**:
>此廣告僅支援<strong>`行動裝置`</strong>，使用者透過 PC 瀏覽該網站則廣告不會顯示！
<br>

# 廣告格式
---
Vpon Mobile Web SDK 支援以下`置頂/置底廣告格式`:<br>

| 名稱               | Size(WxH)     |
| :---------------- | :------------:|
| Banner            |    320x50     |

<br>

# 嵌入廣告程式碼
---
與一般 Web Banner 相似，同樣是在行動網頁的 <body> 中填入 \<vpon\> tag，唯一不同點在於當 \<vpon\> tag 中包含了 `vpon_ad_adhesion` 的屬性且其參數為 "top" 或 "bottom" 時，可自動將該廣告固定於行動裝置的螢幕上方或下方。<br><br>
在網頁 <body> 內欲放廣告的位置加上以下程式碼：

```html
  <body>
...
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your First License Key for License Key"
            vpon_ad_format="320x50_mb"
            debug="true"></vpon>
...
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your Second License Key for License Key"
            vpon_ad_format="320x50_mb"
            vpon_ad_adhesion="bottom"
            debug="true"></vpon>
...
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
  </body>
```
> **Note**:
>
>* Vpon Web SDK 支援 `HTTP` & `HTTPS`，在將 SDK 檔案引入時請如範例所示使用 `//m.vpon.com/sdk/vpadn-sdk.js` 讓瀏覽器在載入頁面時可依照當前頁面自動判斷並引用適當資源，每個頁面只需引入一次，必須加在 </body> 前。
>
>* 同一網頁最多嵌入 `3` 個廣告版面 (如範例所示)，每個版位請使用不同的 License Key。
>
>* Adhesion Ad 倘若嵌入在 iframe 內，將會失去自動固定於行動裝置的螢幕下方的功能。
>
>* 存檔後，重新讀取網頁，您就可以在有 \<vpon\> tag 的位置看到 `測試廣告` 被拉取。
>
>* 如要將網站正式上線，請將 vpon_ad_test 的參數改為 `"0"` 以拉取正式廣告。


<br>

## Advanced Setup
---

名稱                   | 描述                               | 必要  | 範例
:--------------------:|:----------------------------------:|:----:|:------------------------:
vpon\_ad\_licensy\_key| 版位 ID                             | Y    | <font color="red">輸入 Vpon License Key</font>
vpon\_ad\_format      | 置頂/置底橫幅廣告格式<br>320x50\_mb    | Y    | "320x50\_mb"
vpon\_ad\_test        | 是否拉取測試廣告                      | N    | 1(是)/0(否)<br>預設為 "1"
vpon\_ad\_adhesion    | 將橫幅廣告設為置頂或置底               | N    | top/bottom<br>置頂："top"<br>置底："bottom"
debug                 | 是否在 console 顯示 debug 資訊        | N   | true/false<br>預設為 "false"
openTab               | 是否開啓新tab 顯示 廣告內容            | N    | true/false<br>預設為 "true"
ad\_request\_callback | 沒有廣告回傳時的 Callback Function  | N       | 請參考 [Callback]

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

[Callback]: {{site.baseurl}}/zh-tw/web/original-banner/#callback
[Vpon FAE]: mailto:fae@vpon.com
