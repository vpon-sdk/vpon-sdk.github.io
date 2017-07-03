---
layout:         "web"
title:          "Web - 一般橫幅廣告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/original-banner/
lang:           "zh-tw"
---

# 總覽
---
Vpon Mobile Web SDK 提供`一般橫幅廣告`，讓橫幅廣告可讓開發者嵌入於行動網站中，讓我們精準投放的廣告更能讓使用者觀看，以提升廣告收益。<br>

> **Note**:
>此廣告僅支援<strong> `行動裝置 `</strong>，使用者透過 PC 瀏覽該網站則廣告不會顯示！
<br>

# 廣告格式
---
現在的 Vpon Mobile Web SDK 支援以下`一般橫幅廣告格式` :<br><br>

| 名稱             |    Size(WxH)  |
| :---------------- | :------------:|
| Banner            |    320x50     |
| Medium Rectangle  |    300x250    |
| Large Rectangle   |    320x480    |


<br>

# 嵌入廣告程式碼
---
1. 在網頁 <body> 內預放廣告的位置加上以下程式碼：

```html
<body>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="your_first_vpon_banner_id"
        vpon_ad_format="320x50_mb"
        debug="true"></vpon>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="your_second_vpon_banner_id"
        vpon_ad_format="300x250_mb"
        debug="true"></vpon>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="your_third_vpon_banner_id"
        vpon_ad_format="320x480_mb"
        debug="true"></vpon>
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
</body>
```
> **Note**:

>* Vpon Web SDK 支援 `HTTP` & `HTTPS`，在將 SDK 檔案引入時請如上使用 `//m.vpon.com/sdk/vpadn-sdk.js` 讓瀏覽器在載入頁面時可依照當前頁面自動判斷並引用適當資源。
>
>* 同一網頁最多嵌入 3 個廣告版面 (如上例)，每個版面請用不同版位 ID。
>
>* JavaScript 只需要放置一個，並且必須加在 </body> 前。
>
>* 完成存檔後，重新讀取網頁，您就可以在有 \<vpon\> tag 的位置看到 `測試廣告` 被拉取。(如要上線請改成不拉取測試廣告 vpon_ad_test="0")

<br>


## Advanced Setup
---

名稱                  |        描述                      | 必要  |  範例
:--------------------:|:---------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| 版位 ID                               |  Y         |<font color="red">輸入 Vpon License Key</font>
vpon\_ad\_format      | 廣告版型：<br>(1)320x50\_mb, <br>(2)300x250\_mb, <br>(3)320x480\_mb            |   Y       |     "320x50\_mb"
vpon\_ad\_test        |   是否拉取測試廣告                        | N          |   1(是)/0(否)，預設為(是)
vpon\_ad\_isBottom    |   是否為置底橫幅廣告                        | N          |   true/false，預設為 false
debug                 | 是否在 console 顯示 debug 資訊          |  N         |   true/false，預設為 false
openTab               |是否開啓新tab 顯示 廣告內容                 |N           |  true/false，預設為 true

<br>


# 範例網頁
---

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
            vpon_ad_licensy_key="Your Banner ID"
            vpon_ad_format="300x250_mb"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```

> **Note**:

> 1. 若將 Vpon 廣告嵌入在 iframe 內，請記得調整 iframe 到適當大小，以符合 Vpon 廣告的長寬。
> 2. 以上的 License Key 為範例，請置換為您自己申請的 License Key 以防收益分潤無法取得。
<br>


# 使用 DFP 中介服務
---
本段專為 DFP 使用者而設，主要說明 DoubleClick 聯播網搭配 Web API 的方式。

## DFP 產生廣告代碼
---
勾選「啟用單一請求」後將 「Google發佈商廣告代碼」裡產生的「標頭」放在網頁的HEAD元素中，將「文件內文」放在您要顯示這個廣告單元的網頁內文中。

## 設定廣告空間
---
在 DFP 使用者介面中 [Here]:

1. 新增廣告空間
2. 在廣告單元中設定名稱、 大小、目標視窗後儲存
3. 產生廣告代碼 (選取Google發佈商廣告代碼)

<img src="{{site.imgurl}}/UnitAdSetting_DFP1.png" alt="" class="width-600" />
<img src="{{site.imgurl}}/UnitAdSetting_DFP2.png" alt="" class="width-600" />

## 設定委刊單、委刊項及廣告素材
---
如要透過「DFP 廣告管理系統標準版」放送新的廣告活動，請先建立新委刊單。建好委刊單後，您還必須建立委刊項、新增廣告素材以及核准委刊單，委刊單廣告才能放送。針對保留的委刊項類型 (贊助和標準)，在委刊單獲得核准以前，DFP 不會保留廣告空間。

### 建立委刊單
若要在執行廣告空間預測之前建立委刊單，請按照下列指示進行：

1. 在「DFP 廣告管理系統標準版」帳戶中，按一下 `委刊單` 標籤。
2. 按一下 `新增委刊單`。
3. 在適當欄位中輸入您的委刊單資訊。不可與聯播網中其他的委刊單名稱重複。
4. 輸入委刊項資訊。
5. 按一下 `檢查廣告空間`，確認委刊單擁有足夠的曝光供應量。
6. 按一下 `儲存`。建好委刊單之後，您必須先予以核准，委刊項才能放送。

### 委刊項資訊
如何建立委刊項：

1. 在 DFP 廣告管理系統標準版帳戶中，按一下 `委刊單` 標籤。
2. 建立新委刊單，或按一下表格中的現有委刊單。
3. 按一下 `新增委刊項`
4. 輸入委刊項名稱，不得與聯播網中其他委刊項的名稱重複。
5. 輸入您想要上傳廣告素材的廣告空間大小。
6. (選用程序) 輸入任何有助於委刊項投放作業的相關註釋。
7. 輸入委刊項類型、日期、數量和費用。
8. (選用程序) 在 `調整放送` 下方進行放送設定。
9. 選取您的目標廣告空間。

您可以指定廣告單元、刊登位置或同時指定兩者。如要尋找要指定的廣告空間，可以逐步瀏覽聯播網的廣告空間或是執行搜尋。

廣告單元會沿用您的聯播網名稱，代表您聯播網中所有的廣告單元。如果您為委刊項指定這個聯播網層級的廣告單元，委刊項將指定聯播網中的任何廣告單元。

範例：
![新增指定目標_DFP]

10. (選用程序) 輸入其他指定條件，指定特定目標對象。 如果您未將委刊項指定給任何廣告單元或刊登位置，系統會將委刊項設成在全聯播網隨機放送。這表示委刊項可在您網站上的任何廣告單元中放送
11. 按一下 `儲存`

### 上傳廣告素材

1. 按一下要新增廣告素材的委刊項。您也可以視需求建立新委刊項。
2. 按一下 [新增廣告素材]。所有與委刊項相關聯的廣告素材和廣告單元尺寸，都會列在左欄中。您可以將廣告素材上傳至清單中任何大小的廣告單元。
3. 您可以將多個廣告素材拖曳到委刊項，或一次只加入一個廣告素材

#### 只加入一個廣告素材
選取廣告素材類型: 選取`所有`中的`第三方`
<img src="{{site.imgurl}}/廣告素材類型_DFP.png" alt="" class="width-600" />

#### 基本廣告素材設定
程式碼片段請填入:

```html
<vpon vpon_ad_test="0"
       vpon_ad_licensy_key="Your license Key"
       vpon_ad_format="320x50_mb"
       debug="true"></vpon>
      <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
```
> **Note**: vpon_ad_test="1" 爲開啓測試廣告， vpon_ad_test="0"爲拉取正式廣告。

範例：
![素材設定_DFP]


#### 輪播型素材設定
程式碼片段請填入:

```html
<div id="Vpadn_tag"></div>
<script src="https://www.googletagservices.com/tag/js/gpt.js"></script>
<script type='text/javascript'>
  googletag.cmd.push(function() {
    googletag.defineSlot('your_ad_unit', [320, 50], 'Vpadn_tag').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script>
<script>
  function vponCallBackMethod(adStatus) {
    if (adStatus != 0) {
      googletag.cmd.push(function() {
        googletag.display('Vpadn_tag');
      });
    }
  }
</script>

<vpon vpon_ad_test="1" vpon_ad_licensy_key="your_license_key" vpon_ad_format="320x50_mb" debug="true" ad_request_callback="vponCallBackMethod" is_rotate="false"></vpon>

<script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js">
</script>
```
> **Note**：

>1. your_ad_unit：放入另一組廣告空間產生的廣告代碼，此廣告代碼的格式會例如這樣: /78213298/WebMediation，且此代碼被指向到欲輪播的下一家廣告的廣告訂單項，在此訂單項裡上傳欲輪播的素材，如: Adsense script。請避免再將無廣告投遞的素材包含進來，以防造成無窮迴圈。
>2. [320, 50]： 請替換成欲展示的廣告大小。
>3. your_license_key：請填入vpon申請的Banner ID。

範例：
![DFP_WEB_CALLBACK]

欲了解更多passback運行機制，請參考 [GAM tags](https://support.google.com/dfp_sb/answer/1693146?hl=en)

# 其它訣竅
---
[DFP Small Business](https://support.google.com/dfp_sb/) <br>
[Google Developers DFP Banner Ads](https://developers.google.com/mobile-ads-sdk/docs/dfp/fundamentals#android)



# FAQ
---

## 仍然看不到廣告？
請確認以下項目：

* 請試著用行動裝置上的瀏覽器開啟網站。
* 先清除瀏覽器快取並刪除 Cookie，然後重新連線到網站。

## 仍然無法解決？
請將 debug 模式打開，重新連線網站，將 "Vpadn-" 開頭的訊息截取下來並且聯繫 [Vpon FAE]

[Vpon FAE]: mailto:fae@vpon.com
[UnitAdSetting_DFP1]: {{site.imgurl}}/UnitAdSetting_DFP1.png
[UnitAdSetting_DFP2]: {{site.imgurl}}/UnitAdSetting_DFP2.png
[新增指定目標_DFP]: {{site.imgurl}}/新增指定目標.png
[廣告素材類型_DFP]: {{site.imgurl}}/廣告素材類型_DFP.png
[素材設定_DFP]: {{site.imgurl}}/素材設定_DFP.png
[DFP_WEB_CALLBACK]: {{site.imgurl}}/DFP_WEB_CALLBACK.png
[Warning]: {{site.imgurl}}/Warning.png
[Here]: https://www.google.com/dfp/
